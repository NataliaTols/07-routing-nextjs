type Props = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
};
import css from "./LayoutNotes.module.css";

export default function LayoutNotes({ children, sidebar }: Props) {
  return (
    <section className="css.container">
      <aside className="css.sidebar">{sidebar}</aside>
      <div className="css.notesWrapper">{children}</div>
    </section>
  );
}