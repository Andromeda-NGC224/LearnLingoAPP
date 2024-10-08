import { useEffect, useState } from "react";
import { getTeachers } from "../../FireBase/database.js";
import { FaStar } from "react-icons/fa";
import { FiBookOpen } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";

import css from "./TeachersList.module.css";

export const TeachersList = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [readMore, setReadMore] = useState(false);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const data = await getTeachers();
        console.log(data);
        if (data) {
          setTeachers(data);
        }
      } catch (error) {
        console.error("Error fetching teachers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  const toggleReadMore = () => {
    setReadMore(!readMore);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ul className={css.mainList}>
      {teachers.map((teacher, index) => {
        return (
          <li className={css.mainListItem} key={index}>
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
              {!readMore ? (
                <p onClick={toggleReadMore} className={css.readmore}>
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
                          <p>{review.comment}</p>
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
              {readMore && (
                <button className={css.bookingBtn}>Book trial lesson</button>
              )}
            </div>
            <button className={css.favBtn}>
              <FaRegHeart size={26} />
            </button>
          </li>
        );
      })}
    </ul>
  );
};
