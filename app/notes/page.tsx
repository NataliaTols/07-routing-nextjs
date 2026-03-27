import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import Notes from "./Notes.client";

interface NotesPageProps {
  params: {
    query?: string;
    page?: number;
  };
}
export default async function NotesPage({ params }: NotesPageProps) {
  const queryClient = new QueryClient();
  const perPage = 12;
  const search = params.query || "";
  const page = params.page || 1;

  await queryClient.prefetchQuery({
    queryKey: ["notes", search, page],
    queryFn: () => fetchNotes(search, page, perPage),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Notes />
    </HydrationBoundary>
  );
}