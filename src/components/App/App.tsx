import { useState, type JSX } from "react";
import css from "./App.module.css";
import SearchBox from "../SearchBox/SearchBox";
import PaginationComp from "../Pagination/Pagination";
import NoteList from "../NoteList/NoteList";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import { useDebouncedValue } from "../../hooks/useDebouncedValue";

const PER_PAGE = 12;

export default function App(): JSX.Element {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebouncedValue(search, 500);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [totalPages, setTotalPages] = useState(1);

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
        <PaginationComp
          page={page}
          onChangePage={(p) => setPage(p)}
          perPage={PER_PAGE}
          search={debouncedSearch}
          totalPages={totalPages}
        />
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      <main className={css.main}>
        <NoteList
          page={page}
          perPage={PER_PAGE}
          search={debouncedSearch}
          onTotalPagesChange={setTotalPages}
        />
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
