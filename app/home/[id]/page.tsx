import SectionTwo from '@/app/ui/home/section-two';
import Link from 'next/link';
import { EditNote, DeleteNote } from '@/app/ui/home/buttons';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  return (
  <>

  <main>
    <SectionTwo id={id}/>

    <div className="grid gap-6 md:flex md:justify-between m-6 md:m-8">
      <Link href="/home">
        <button className="bg-black dark:bg-white rounded-lg text-white dark:text-black p-2 w-full md:w-36 h-10 hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 hover:text-white">Back</button>
      </Link>
      <DeleteNote id={id} />
      <EditNote id={id} />
    </div>
  </main>

  </>
  );
}
