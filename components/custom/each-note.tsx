import Link from 'next/link';
import styles from '@/app/modules/note.module.css';

export function EachNote({
  noteTitle,
  noteContent,
  className,
}: {
  noteTitle?: string;
  noteContent?: string;
  className?: string;
}) {
  return (
  <>

  <section className={`${styles.noteSection} break-words`}>
    <div className={`${styles.noteLayout}`}>
      <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent w-fit">{noteTitle}</h1>
      <p className="whitespace-pre-line md:whitespace-pre-wrap">{noteContent}</p>
    </div>
  </section>

  </>
  );
}
