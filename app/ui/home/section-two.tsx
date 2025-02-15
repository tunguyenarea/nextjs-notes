import { EachNote } from '@/components/custom/each-note';
import { fetchEachNote } from '@/app/lib/data';

export default async function SectionTwo({ id }: { id: string }) {
  const eachNote = await fetchEachNote(id);

  return (
  <>

  <section>
    {eachNote.map((note) => {
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
