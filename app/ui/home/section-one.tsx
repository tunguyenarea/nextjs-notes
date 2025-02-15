import { Note } from '@/components/custom/note';
import { fetchNote } from '@/app/lib/data';

export default async function SectionOne() {
  const listNote = await fetchNote("dd39e1da-d0d5-4797-ae22-f2f2d6010b6d");

  return (
  <>

  <section>
    {listNote.map((note) => {
      return(
        <Note key={note.note_id}
          noteLink={`/home/${note.note_id}`}
          noteTitle={note.title}
          noteContent={note.content}
        />
      );
    })}
  </section>

  </>
  );
}
