import axios from "axios";
import type { Note } from "../types/note";
const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN
const BASE_URL = "https://notehub-public.goit.study/api/notes";

    interface FetchNotesProps {
        notes: Note[];
      
        totalPages: number;
    }

export async function fetchNotes(searchText: string, page: number , perPage?: number): Promise<FetchNotesProps>{
    const response = await axios.get<FetchNotesProps>(BASE_URL, {
        params: {
            search: searchText,
            page,
            perPage,
        },
        headers: {
            Authorization: `Bearer ${myKey}`,
             accept: "application/json",
            
        }
    });
    return response.data;
}


interface CreateNoteProps {
  title: string ,
  content: string ,
  tag: 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping'
}

export async  function createNote(newPost: CreateNoteProps): Promise<Note> {
    const createNewNote = await axios.post<Note> (BASE_URL, newPost,    {
      headers: {
        Authorization: `Bearer ${myKey}`,
        accept: "application/json",
      },
    })
    return createNewNote.data;
}

export async function deleteNote(noteId : string, ) : Promise<Note> {
    const deleteNote = await axios.delete<Note>(`${BASE_URL}/${noteId}`, {
        headers: {
            Authorization: `Bearer ${myKey}`,
            accept: "application/json",
        }
    });
    return deleteNote.data
}

export async function fetchNoteById(id : string) : Promise<Note> {
     const { data } = await axios.get<Note>(`${BASE_URL}/${id}`,  {headers: {
        Authorization: `Bearer ${myKey}`},
      },);
  return data;
}

export async function fetchCategories({
  tag,
}: {
  tag?: string;
}): Promise<Note[]> {
  const params: Record<string, string> = {};

  if (tag) {
    params.tag = tag;
  }

  const response = await axios.get(
    "http://localhost:3000/notes",
    { params }
  );

  console.log("DATA:", response.data);

 
  if (Array.isArray(response.data)) {
    return response.data;
  }

  if (Array.isArray(response.data.notes)) {
    return response.data.notes;
  }

  if (Array.isArray(response.data.data)) {
    return response.data.data;
  }

  return [];
}