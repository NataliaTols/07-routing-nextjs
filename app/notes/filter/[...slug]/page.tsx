import NotesByFilter from "./Notes.client";

type Props = {
  params: {
    slug: string[];
  };
};

export default function Page({ params }: Props) {
  return <NotesByFilter params={params} />;
}