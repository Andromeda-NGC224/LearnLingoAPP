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
        <div className={css.HeroPic}>Пикча</div>
      </section>
    </div>
  );
}
