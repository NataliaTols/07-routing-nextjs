import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import NotesByFilterClient from "./Notes.client"; 
import { fetchNotes, type NoteTag } from "@/lib/api";


type Props = {
  params: Promise<{
    slug: string[];
  }>;
};

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const tag = slug?.[0] || "all";
  const normalizedTag: NoteTag | undefined =
  tag === "all" ? undefined : (tag as NoteTag);

  const queryClient = new QueryClient();

 
  await queryClient.prefetchQuery({
    queryKey: ['notes', normalizedTag],
    queryFn: () =>
      fetchNotes({
        tag: normalizedTag as NoteTag | undefined,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesByFilterClient tag={tag} />
    </HydrationBoundary>
  );
}