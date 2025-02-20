import { EachNote } from '@/components/custom/each-note';
import { fetchEachNote } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { auth } from '@/app/(auth)/auth';

export default async function SectionTwo({ id }: { id: string }) {
  const eachNote = await fetchEachNote(id);
  const session = await auth();

  return (
  <>

  <section>
    {eachNote.map((note) => {
      if(session?.user?.id !== note.author_id) {
        notFound();
      }

      return (
        <EachNote
          key={note.note_id}
          noteTitle={note.title}
          noteContent={note.content}
        />
      );
    })}
  </section>

  </>
  );
}
