import css from "./SearchBox.module.css";

interface SearchBoxProps {
  searchText: string;
  updateSearch: (value: string) => void;
}

export default function SearchBox({
  searchText,
  updateSearch,
}: SearchBoxProps) {
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      defaultValue={searchText}
      onChange={(e) => updateSearch(e.target.value)}
    />
  );
}