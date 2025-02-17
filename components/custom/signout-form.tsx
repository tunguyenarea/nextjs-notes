import Form from 'next/form';
import { signOut, auth } from '@/app/(auth)/auth';

export default async function SignoutForm() {
  const session = await auth();

  async function handleSignOut() {
    'use server';
    await signOut({
      redirectTo: '/signin',
    });
  }

  return (
  <>

  <section className="flex justify-center md:justify-between">
    <h1 className="hidden md:block ml-16 mt-12 text-xl md:text-2xl font-bold bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent w-fit">Notes</h1>
    <Form action={handleSignOut}>
      {/*<label className="mr-3">{session?.user?.id}</label> */}
      <label className="mr-3">{session?.user?.email}</label>
      <button className="md:mr-16 mt-10 bg-black dark:bg-white rounded-lg text-white dark:text-black p-2 w-36 h-10 hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 hover:text-white" type="submit">Sign Out</button>
    </Form>
  </section>

  </>
  );
}
