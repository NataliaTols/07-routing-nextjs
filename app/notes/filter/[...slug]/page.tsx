import { fetchCategories } from "@/lib/api";
import type { Note } from "@/types/note";

type Props = {
  params: {
    slug: string[];
  };
};

export default async function NotesByFilter({ params }: Props) {
  const tag = params.slug?.[0];

  const normalizedTag = tag === "all" ? undefined : tag;

  const notes = await fetchCategories({
    tag: normalizedTag,
  });

  return (
    <div>
      <h2>{tag === "all" ? "All notes" : `Tag: ${tag}`}</h2>

      <ul>
        {notes.map((note: Note) => (
          <li key={note.id}>{note.title}</li>
        ))}
      </ul>
    </div>
  );
}