export interface NoteTag {
  id?: string;
  name: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
}

export interface Note {
  id: string;
  title: string;
  content?: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
  createdAt?: string;
  updatedAt?: string;
}
