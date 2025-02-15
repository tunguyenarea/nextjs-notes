import EditForm from '@/components/custom/edit-form';
import { fetchEachNote } from '@/app/lib/data';

export default async function SectionThree({ id }: { id: string }) {
  const eachNote = await fetchEachNote(id);

  return (
  <>

  <section>
    {eachNote.map((note) => {
      return (
        <EditForm
          key={note.note_id}
          note_id={note.note_id}
          author_id={note.author_id}
          title={note.title}
          content={note.content}
        />
      );
    })}
  </section>

  </>
  );
}
