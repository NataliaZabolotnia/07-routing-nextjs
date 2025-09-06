import axios from "axios";
import type { Note, NewNote, NoteTag } from "@/types/note";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}
const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export const fetchNotes = async (
  page: number,
  searchText: string,
  tag?: string
): Promise<FetchNotesResponse> => {
  const params: Record<string, string | number> = {
    page: page < 1 ? 1 : page,
    perPage: 12,
  };

  if (searchText.trim()) {
    params.search = searchText.trim();
  }

  if (tag && tag !== "All") {
    params.tag = tag;
  }

  const res = await axios.get<FetchNotesResponse>(
    `https://notehub-public.goit.study/api/notes`,
    {
      params,
      headers: {
        Authorization: `Bearer ${myKey}`,
      },
    }
  );
  console.log(res.data);
  return res.data;
};

export const postNote = async (newNote: NewNote): Promise<Note> => {
  const res = await axios.post<Note>(
    `https://notehub-public.goit.study/api/notes`,
    newNote,
    {
      headers: {
        Authorization: `Bearer ${myKey}`,
      },
    }
  );
  return res.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const res = await axios.delete<Note>(
    `https://notehub-public.goit.study/api/notes/${noteId}`,
    {
      headers: {
        Authorization: `Bearer ${myKey}`,
      },
    }
  );
  return res.data;
};

export const fetchNoteById = async (noteId: Note["id"]) => {
  const res = await axios.get<Note>(
    `https://notehub-public.goit.study/api/notes/${noteId}`,
    {
      headers: {
        Authorization: `Bearer ${myKey}`,
      },
    }
  );
  return res.data;
};

export const getTags = async (): Promise<string[]> => {
  const notesRes: FetchNotesResponse = await fetchNotes(1, "");
  const uniqueTags = Array.from(
    new Set(
      notesRes.notes
        .map((note) => note.tag)
        .filter((tag): tag is NoteTag => typeof tag === "string")
    )
  );
  return [...uniqueTags];
};
