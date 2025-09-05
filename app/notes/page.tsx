import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
} from "@tanstack/react-query";
import Notes from "./Notes.client";
import { fetchNotes } from "@/lib/api";

interface NotesPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function NotesPage({ searchParams }: NotesPageProps) {
  const params = await searchParams;

  const page = Number(
    Array.isArray(params.page) ? params.page[0] : params.page || "1"
  );
  const query = Array.isArray(params.q) ? params.q[0] : params.q || "";

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", { page, query }],
    queryFn: () => fetchNotes(page, query),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Notes initialPage={page} initialQuery={query} />
    </HydrationBoundary>
  );
}
