import axios, { type AxiosResponse } from "axios";
import type { Note } from "../types/note";

const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN as string | undefined;

if (!TOKEN) {
  console.warn(
    "VITE_NOTEHUB_TOKEN is not defined. Set it in .env or Vercel env variables."
  );
}

export const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: TOKEN ? `Bearer ${TOKEN}` : "",
  },
});
export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
  page?: number;
  perPage?: number;
}

/* fetchNotes */
export const fetchNotes = async (params: FetchNotesParams) => {
  const { page = 1, perPage = 12, search } = params;
  const res: AxiosResponse<FetchNotesResponse> = await api.get("/notes", {
    params: { page, perPage, search },
    headers: { "Cache-Control": "no-cache" },
  });
  return res.data;
};

export interface CreateNoteDto {
  title: string;
  content?: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
}
export const createNote = async (payload: CreateNoteDto) => {
  const res: AxiosResponse<Note> = await api.post("/notes", payload);
  return res.data;
};

export const deleteNote = async (id: string) => {
  const res: AxiosResponse<{ removedId?: string } | Note> = await api.delete(
    `/notes/${id}`
  );
  return res.data;
};
