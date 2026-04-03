'use client';

import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from "@/lib/api";

import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import NoteList from "@/components/NoteList/NoteList";

type Props = {
  tag: string;
};

export default function NotesByFilterClient({ tag }: Props) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);


 const [debouncedSearch] = useDebounce(search, 500);

  const normalizedTag = tag === "all" ? undefined : tag;

  const { data, isLoading } = useQuery({
    queryKey: ['notes', normalizedTag, debouncedSearch, page],
    queryFn: () => fetchCategories({ 
      tag: normalizedTag, 
      search: debouncedSearch, 
      page 
    }),
  });

 
  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2>{tag === "all" ? "All notes" : `Tag: ${tag}`}</h2>
        
        {}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Note
        </button>
      </div>

      
      <SearchBox 
  searchText={search} 
  updateSearch={handleSearchChange}
/>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <NoteList notes={data?.notes || []} />
      )}

   
      <Pagination 
        currentPage={page} 
        pageCount={data?.totalPages || 1} 
        onPageChange={setPage} 
      />

     
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}

