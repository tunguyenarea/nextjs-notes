import SectionThree from '@/app/ui/home/section-three';
import { fetchEachNote } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { auth } from '@/app/(auth)/auth';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const eachNote = await fetchEachNote(id);
  const session = await auth();

  {eachNote.map((note) => {
    if(session?.user?.id !== note.author_id) {
      notFound();
    }
  })}

  return (
  <>

  <section>
    <SectionThree id={id} />
  </section>

  </>
  );
}
