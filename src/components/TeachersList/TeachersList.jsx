import { useEffect, useState } from "react";
import { getFavourites, getTeachers } from "../../FireBase/database.js";
import { FaStar } from "react-icons/fa";
import { FiBookOpen } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { updateFavouritesInDB, filterTeachers } from "../../utils/filter";
import css from "./TeachersList.module.css";
import { useAuth } from "../../utils/AuthContext.jsx";
import toast from "react-hot-toast";
import { FilterList } from "../FilterList/FilterList.jsx";
import { ModalBooking } from "../ModalBooking/ModalBooking.jsx";
import Loader from "../Loader/Loader.jsx";

export const TeachersList = ({
  favouritesFromProps = null,
  onFavouritesChange,
  isFavoritesPage = false,
}) => {
  const [teachers, setTeachers] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [filters, setFilters] = useState({});
  const [bookingTeacher, setBookingTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [readMore, setReadMore] = useState(null);
  const [page, setPage] = useState(0);
  const [localFavourites, setLocalFavourites] = useState([]);
  const { token, userId } = useAuth();

  const count = 4;

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        setLoading(true);
        const data = await getTeachers(count, page * count);
        if (data) {
          setTeachers((prevTeachers) => [...prevTeachers, ...data]);
        }
      } catch (error) {
        console.error("Error fetching teachers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, [page]);

  useEffect(() => {
    const fetchFavourites = async () => {
      if (favouritesFromProps === null) {
        try {
          const favs = await getFavourites(userId);
          setLocalFavourites(favs || []);
        } catch (error) {
          console.error("Error fetching favourites:", error);
        }
      }
    };
    fetchFavourites();
  }, [favouritesFromProps, userId]);

  useEffect(() => {
    const favouritesToUse =
      favouritesFromProps !== null ? favouritesFromProps : localFavourites;
    const teachersToDisplay =
      favouritesFromProps !== null
        ? teachers.filter((teacher) => {
            const favouriteKey = `${teacher.name} ${teacher.surname}`;
            return favouritesToUse.includes(favouriteKey);
          })
        : teachers;

    setFilteredTeachers(filterTeachers(teachersToDisplay, filters));
  }, [teachers, filters, favouritesFromProps, localFavourites]);

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleFavourite = async (teacher) => {
    if (!token) {
      toast.error("Need to login at first!");
    } else {
      const favouriteKey = `${teacher.name} ${teacher.surname}`;

      if (isFavoritesPage) {
        const updatedFavourites = (
          favouritesFromProps || localFavourites
        ).filter((fav) => fav !== favouriteKey);
        await updateFavouritesInDB(userId, updatedFavourites);
        if (onFavouritesChange) {
          onFavouritesChange(favouriteKey);
        }
      } else {
        setLocalFavourites((prevFavourites) => {
          let updatedFavourites;
          if (prevFavourites.includes(favouriteKey)) {
            updatedFavourites = prevFavourites.filter(
              (fav) => fav !== favouriteKey
            );
          } else {
            updatedFavourites = [...prevFavourites, favouriteKey];
          }
          updateFavouritesInDB(userId, updatedFavourites);
          return updatedFavourites;
        });
      }
    }
  };

  const toggleReadMore = (index) => {
    setReadMore(readMore === index ? null : index);
  };

  const openBookingModal = (teacher) => {
    setBookingTeacher(teacher);
  };

  const closeBookingModal = () => {
    setBookingTeacher(null);
  };

  const handleFilterChange = (name, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <ul className={css.mainList}>
      <FilterList onFilterChange={handleFilterChange} />
      {filteredTeachers.map((teacher, index) => {
        const favouriteKey = `${teacher.name} ${teacher.surname}`;
        const isFavourite = (favouritesFromProps || localFavourites).includes(
          favouriteKey
        );
        return (
          <li className={css.mainListItem} key={index}>
            {bookingTeacher && (
              <ModalBooking
                onClose={closeBookingModal}
                teacher={bookingTeacher}
              />
            )}
            <div className={css.imgContainer}>
              <img
                className={css.photo}
                src={teacher.avatar_url}
                alt={teacher.name}
              />
            </div>
            <div style={{ width: "60%" }}>
              <div className={css.topContainer}>
                <p className={css.topFirstItem}>Languages</p>
                <ul className={css.topList}>
                  <li className={css.topItems}>
                    <FiBookOpen /> Lessons online
                  </li>
                  <li className={css.topItems}>
                    Lessons done: {teacher.lessons_done}
                  </li>
                  <li className={css.topItems}>
                    <FaStar color="FFC531" /> Rating: {teacher.rating}
                  </li>
                  <li className={css.topItems}>
                    Price / 1 hour:{" "}
                    <span className={css.moneySpan}>
                      {teacher.price_per_hour}$
                    </span>
                  </li>
                </ul>
              </div>
              <h2 className={css.name}>
                {teacher.name} {teacher.surname}
              </h2>
              <ul className={css.listInfo}>
                <li className={css.listInfoItem}>
                  <span className={css.listInfoItemSpan}>Speaks:</span>{" "}
                  <span className={css.listInfoItemLang}>
                    {teacher.languages.join(", ")}
                  </span>
                </li>
                <li className={css.listInfoItem}>
                  <span className={css.listInfoItemSpan}>Lesson Info:</span>{" "}
                  {teacher.lesson_info}
                </li>
                <li className={css.listInfoItem}>
                  <span className={css.listInfoItemSpan}>Conditions:</span>{" "}
                  {teacher.conditions}
                </li>
              </ul>
              {readMore !== index ? (
                <p
                  onClick={() => toggleReadMore(index)}
                  className={css.readmore}
                >
                  Read more
                </p>
              ) : (
                <>
                  <p className={css.readMoreExp}>{teacher.experience}</p>
                  <ul className={css.reviewList}>
                    {teacher.reviews.map((review, index) => (
                      <li className={css.reviewItem} key={index}>
                        <div className={css.mainReviewerContainer}>
                          <div className={css.reviewerImgAndRating}>
                            <FaUserCircle size={44} color="F4C550" />
                            <div>
                              <p className={css.reviewerName}>
                                {review.reviewer_name}
                              </p>
                              <p>
                                <FaStar
                                  color="FFC531"
                                  style={{ paddingRight: "0.5vw" }}
                                />
                                {review.reviewer_rating}.0
                              </p>
                            </div>
                          </div>
                          <p className={css.reviewerComment}>
                            {review.comment}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              <ul className={css.levelsList}>
                {teacher.levels.map((level, levelIndex) => (
                  <li className={css.levelsListItem} key={levelIndex}>
                    #{level}
                  </li>
                ))}
              </ul>
              {readMore === index && (
                <button
                  onClick={() => openBookingModal(teacher)}
                  className={css.bookingBtn}
                >
                  Book trial lesson
                </button>
              )}
            </div>
            <button
              className={css.favBtn}
              onClick={() => handleFavourite(teacher)}
            >
              <FaRegHeart
                size={26}
                color={isFavourite && token ? "red" : "black"}
              />
            </button>
          </li>
        );
      })}
      {teachers.length < 30 ? (
        <button className={css.loadMoreBtn} onClick={handleNextPage}>
          Load more
        </button>
      ) : (
        <p>No more teachers left.</p>
      )}
      {loading && <Loader />}
    </ul>
  );
};
