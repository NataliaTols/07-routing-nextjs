import axios from "axios";
import type { Note } from "../types/note";

const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
const BASE_URL = "https://notehub-public.goit.study/api/notes";


interface FetchNotesProps {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(
  searchText: string,
  page: number,
  tag: string, 
  perPage?: number
): Promise<FetchNotesProps> {
  const response = await axios.get<FetchNotesProps>(BASE_URL, {
    params: {
      search: searchText,
      page,
      tag, 
      perPage,
    },
    headers: {
      Authorization: `Bearer ${myKey}`,
      Accept: "application/json", 
    },
  });

  return response.data;
}


interface CreateNoteProps {
  title: string;
  content: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
}

export async function createNote(newPost: CreateNoteProps): Promise<Note> {
  const response = await axios.post<Note>(BASE_URL, newPost, {
    headers: {
      Authorization: `Bearer ${myKey}`,
      Accept: "application/json",
    },
  });

  return response.data;
}


export async function deleteNote(noteId: string): Promise<Note> {
  const response = await axios.delete<Note>(`${BASE_URL}/${noteId}`, {
    headers: {
      Authorization: `Bearer ${myKey}`,
      Accept: "application/json",
    },
  });

  return response.data;
}


export async function fetchNoteById(id: string): Promise<Note> {
  const response = await axios.get<Note>(`${BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${myKey}`,
      Accept: "application/json",
    },
  });

  return response.data;
}

interface FetchNotesArgs {
  tag?: string;
  search?: string; // замість any використовуємо string
  page?: number;
}

export async function fetchCategories({ tag, search, page }: FetchNotesArgs): Promise<FetchNotesProps> {
const params = new URLSearchParams();

  if (tag) params.append('tag', tag);
  if (search) params.append('search', search);
  if (page) params.append('page', page.toString());
  
  const url = `${BASE_URL}?${params.toString()}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch notes");
  }

  return response.json();
}