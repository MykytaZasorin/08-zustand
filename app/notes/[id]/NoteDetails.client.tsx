"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import css from "../../@modal/(.)notes/[id]/NoteDetails.module.css"; // Перевикористовуємо твої стилі

interface NoteDetailsProps {
  noteId: string;
}

export default function NoteDetailsClient({ noteId }: NoteDetailsProps) {
  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: false,
  });

  if (isLoading)
    return (
      <p style={{ textAlign: "center", marginTop: "40px" }}>
        Loading, please wait...
      </p>
    );
  if (error || !note)
    return (
      <p style={{ textAlign: "center", marginTop: "40px" }}>
        Something went wrong.
      </p>
    );

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.tag}>{note.tag}</p>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{new Date(note.createdAt).toLocaleString()}</p>
      </div>
    </div>
  );
}
