"use client";
import { useState } from "react";
import css from "@/app/notes/NotesPage.module.css";
import "modern-normalize/modern-normalize.css";
import SearchBox from "@/components/SearchBox/SearchBox";
import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Pagination from "@/components/Pagination/Pagination";
import NoteForm from "@/components/NoteForm/NoteForm";
import Modal from "@/components/Modal/Modal";
import { useDebouncedCallback } from "use-debounce";
import StatusWrapper from "@/components/StatusWrapper/StatusWrapper";

interface NotesProps {
  initialPage: number;
  initialQuery: string;
}

export default function Notes({ initialPage, initialQuery }: NotesProps) {
  const [searchText, setSearchText] = useState(initialQuery);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["notes", currentPage, searchText],
    queryFn: () => fetchNotes(currentPage, searchText),
    placeholderData: keepPreviousData,
  });

  const updateSearchQuery = useDebouncedCallback((value: string) => {
    setSearchText(value);
    setCurrentPage(1);
  }, 300);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    updateSearchQuery(value);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={inputValue} onChange={handleSearchChange} />
        {data && !isLoading && (
          <Pagination
            pageCount={data.totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>

      <StatusWrapper
        isLoading={isLoading}
        isError={!!error}
        isEmpty={!isLoading && data?.notes.length === 0}
        error={error}
      >
        <NoteList notes={data?.notes ?? []} />
      </StatusWrapper>

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onCancel={closeModal} />
        </Modal>
      )}
    </div>
  );
}
