import css from "./FilterList.module.css";

export const FilterList = ({ onFilterChange }) => {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    onFilterChange(name, value);
  };

  return (
    <ul className={css.mainList}>
      <li className={css.mainListItem}>
        <label className={css.mainListItemLabel} htmlFor="languages">
          Languages
        </label>
        <select
          className={css.selectInp}
          id="languages"
          name="languages"
          onChange={handleFilterChange}
        >
          <option value="">Languages</option>
          <option value="french">French</option>
          <option value="english">English</option>
          <option value="german">German</option>
          <option value="ukrainian">Ukrainian</option>
          <option value="polish">Polish</option>
        </select>
      </li>
      <li className={css.mainListItem}>
        <label className={css.mainListItemLabel} htmlFor="level">
          Level of knowledge
        </label>
        <select
          className={css.selectInp}
          id="level"
          name="level"
          onChange={handleFilterChange}
        >
          <option value="">All</option>
          <option value="A1 Beginner">A1 Beginner</option>
          <option value="A2 Elementary">A2 Elementary</option>
          <option value="B1 Intermediate">B1 Intermediate</option>
          <option value="B2 Upper-Intermediate">B2 Upper-Intermediate</option>
          <option value="C1 Advanced">C1 Advanced</option>
          <option value="C2 Proficient">C2 Proficient</option>
        </select>
      </li>
      <li className={css.mainListItem}>
        <label className={css.mainListItemLabel} htmlFor="price">
          Price
        </label>
        <select
          className={css.selectInp}
          id="price"
          name="price"
          onChange={handleFilterChange}
        >
          <option value="">All</option>
          <option value="10">10 $</option>
          <option value="20">20 $</option>
          <option value="30">30 $</option>
          <option value="40">40 $</option>
        </select>
      </li>
    </ul>
  );
};
