import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import css from "./App.module.css";
import { fetchNotes } from "../../services/noteService";
import type { Note } from "../../types/note";
import SearchBox from "../SearchBox/SearchBox";
import PaginationComp from "../Pagination/Pagination";
import NoteList from "../NoteList/NoteList";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import { useDebouncedValue } from "../../hooks/useDebouncedValue";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const PER_PAGE = 12;

export default function App() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search, 500);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", { page, perPage: PER_PAGE, search: debouncedSearch }],
    queryFn: () =>
      fetchNotes({ page, perPage: PER_PAGE, search: debouncedSearch }),
    placeholderData: (prev) => prev,
  });

  if (isLoading) return <Loader />;
  if (isError) return <ErrorMessage />;

  const notes: Note[] = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox
          value={search}
          onChange={(v) => {
            setSearch(v);
            setPage(1);
          }}
        />
        {totalPages > 1 && (
          <PaginationComp
            currentPage={page}
            onPageChange={(p) => setPage(p)}
            totalPages={totalPages}
          />
        )}
        <button className={css.btn} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      <main>
        {notes.length > 0 ? (
          <NoteList page={page} perPage={PER_PAGE} search={debouncedSearch} />
        ) : (
          <p>No notes yet</p>
        )}
      </main>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm
            onSuccess={() => setIsModalOpen(false)}
            onCancel={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
}
