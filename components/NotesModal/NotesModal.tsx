"use client";
import css from "./NotesModal.module.css";
import { useRouter } from "next/router";
interface NotesModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export default function NotesModal({ children }: NotesModalProps) {
  const router = useRouter();
  function closeModal() {
    router.back();
  }

  return (
    <div className={css.backdrop}>
      <div className={css.modal}>
        <button type="button" onClick={closeModal}></button>
        {children}
      </div>
    </div>
  );
}