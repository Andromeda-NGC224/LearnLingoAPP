import { FaApple } from "react-icons/fa";
import css from "./HomePage.module.css";

export default function HomePage() {
  return (
    <div className={css.mainContainer}>
      <section className={css.Hero}>
        <div className={css.HeroText}>
          <h1 className={css.HeroTitle}>
            Unlock your potential with the best{" "}
            <span className={css.HeroDecor}>language</span> tutors
          </h1>
          <p className={css.HeroDescription}>
            Embark on an Exciting Language Journey with Expert Language Tutors:
            Elevate your language proficiency to new heights by connecting with
            highly qualified and experienced tutors.
          </p>
          <button className={css.HeroBtn}>Get Started</button>
        </div>
        <div className={css.HeroPicContainer}>
          <div className={css.HeroPicBoy}></div>
          <div className={css.HeroPicIMac}></div>
          <div className={css.HeroPicApple}>
            <FaApple size={46} color="#FBE9BA" />
          </div>
        </div>
      </section>
      <div className={css.HeroAchievements}>
        <ul className={css.AchievementsList}>
          <li className={css.AchievementsItem}>
            <h3 className={css.AchievementsItemNum}>32,000 +</h3>
            <p className={css.AchievementsItemText}>Experienced tutors</p>
          </li>
          <li className={css.AchievementsItem}>
            <h3 className={css.AchievementsItemNum}>300,000 +</h3>
            <p className={css.AchievementsItemText}>5-star tutor reviews</p>
          </li>
          <li className={css.AchievementsItem}>
            <h3 className={css.AchievementsItemNum}>120 +</h3>
            <p className={css.AchievementsItemText}>Subjects taught</p>
          </li>
          <li className={css.AchievementsItem}>
            <h3 className={css.AchievementsItemNum}>200 +</h3>
            <p className={css.AchievementsItemText}>Tutor nationalities</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
