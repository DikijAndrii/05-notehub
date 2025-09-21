import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import css from "./NoteList.module.css";
import { fetchNotes, deleteNote } from "../../services/noteService";
import type { Note } from "../../types/note";

interface NoteListProps {
  page: number;
  perPage: number;
  search?: string;
}

export default function NoteList({ page, perPage, search }: NoteListProps) {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", { page, perPage, search }],
    queryFn: () => fetchNotes({ page, perPage, search }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  const notes = (data?.notes ?? []) as Note[];

  if (!notes.length) return null;

  return (
    <ul className={css.list}>
      {notes.map((n) => (
        <li key={n.id} className={css.listItem}>
          <h2 className={css.title}>{n.title}</h2>
          <p className={css.content}>{n.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{n.tag}</span>
            <button
              className={css.button}
              onClick={() => deleteMutation.mutate(n.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
