import NotesModal from "@/components/NotesModal/NotesModal";

import { fetchNoteById } from "@/lib/api";

type Props = {
  params: {
    id: string;
  };
};

export default async function NotePreview({ params }: Props) {
  const note = await fetchNoteById(params.id);

  return (
    <NotesModal>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
    </NotesModal>
  );
}