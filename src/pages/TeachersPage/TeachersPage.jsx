import { TeachersList } from "../../components/TeachersList/TeachersList.jsx";
import css from "./TeachersPage.module.css";

export default function TeachersPage() {
  return (
    <section className={css.mainSection}>
      <TeachersList isFavoritesPage={false} />
    </section>
  );
}
