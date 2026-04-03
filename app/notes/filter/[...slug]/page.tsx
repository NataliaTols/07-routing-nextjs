import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import NotesByFilterClient from "./Notes.client"; 
import { fetchCategories } from "@/lib/api";

type Props = {
  params: Promise<{
    slug: string[];
  }>;
};

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const tag = slug?.[0] || "all";
  const normalizedTag = tag === "all" ? undefined : tag;

  const queryClient = new QueryClient();

 
  await queryClient.prefetchQuery({
    queryKey: ['notes', normalizedTag], 
    queryFn: () => fetchCategories({ tag: normalizedTag }),
  });

  return (
   
    <HydrationBoundary state={dehydrate(queryClient)}>
      {}
      <NotesByFilterClient tag={tag} />
    </HydrationBoundary>
  );
}