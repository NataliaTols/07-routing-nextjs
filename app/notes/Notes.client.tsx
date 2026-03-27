"use client";

import css from "./notes.module.css";
import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import { fetchNotes } from "../../lib/api";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import Loader from "@/components/Loader/Loader";
export default function Notes() {
  const [query, setQuery] = useState("");
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(12);
  const [isClicked, setIsClicked] = useState(false);
  const { data, isError, isLoading } = useQuery({
    queryKey: ["notes", query, currentPage],
    queryFn: () => fetchNotes(query, currentPage, perPage),
    placeholderData: keepPreviousData,
  });
  const updateSearch = useDebouncedCallback((value: string) => {
    setQuery(value);
    setSearchText(value);
    setCurrentPage(1);
  }, 1000);

  const totalPages = data?.totalPages ?? 0;

  function handleChangePage(newPage: number) {
    setCurrentPage(newPage);
  }

  function handleCloseModal() {
    setIsClicked(false);
  }

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox searchText={searchText} updateSearch={updateSearch} />
        {totalPages > 1 && (
          <Pagination
            pageCount={data?.totalPages ?? 0}
            currentPage={currentPage}
            onPageChange={handleChangePage}
          />
        )}
        <button className={css.button} onClick={() => setIsClicked(true)}>
          Create note +
        </button>
      </header>

      {isLoading && <Loader />}
      {data && data.notes.length > 0 && !isError && (
        <NoteList notes={data?.notes ?? []} />
      )}
      {isClicked && (
        <Modal onClose={handleCloseModal}>
          <NoteForm onClose={handleCloseModal} />
        </Modal>
      )}
    </div>
  );
}