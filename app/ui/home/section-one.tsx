import { Note } from '@/components/custom/note';
import { fetchNote } from '@/app/lib/data';
import { auth } from '@/app/(auth)/auth';

export default async function SectionOne() {
  const session = await auth();
  const user_id = session?.user?.id || "dd39e1da-d0d5-4797-ae22-f2f2d6010b6d";
  const listNote = await fetchNote(user_id);

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
