'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

const FormSchema = z.object({
  note_id: z.string(),
  title: z.string(),
  author_id: z.string(),
  content: z.string(),
  date: z.string(),
});

export type State = {
  errors?: {
    title?: string[];
    author_id?: string[];
    content?: string[];
  };

  message?: string | null;
};

const CreateNote = FormSchema.omit({ note_id: true, date: true });
const EditNote = FormSchema.omit({ note_id: true, date: true });

export async function createNote(prevState: State, formData: FormData) {
  const validatedFields = CreateNote.safeParse({
    title: formData.get('title'),
    author_id: formData.get('author_id'),
    content: formData.get('content'),
  });

  if(!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Failed to create note.',
    };
  }

  const { title, author_id, content } = validatedFields.data;
  const date = new Date().toISOString().split('T')[0];

  try {
    //console.log('Creating note data...');
    //await new Promise((resolve) => setTimeout(resolve, 3000));
    
    await sql`
      INSERT INTO "Note" (title, content, author_id, date)
      VALUES(${title}, ${content}, ${author_id}, ${date});
    `;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to create note data.');
  }

  revalidatePath('/', 'layout');
  redirect('/home');
}

export async function editNote(note_id: string, prevState: State, formData: FormData) {
  const validatedFields = EditNote.safeParse({
    title: formData.get('title'),
    author_id: formData.get('author_id'),
    content: formData.get('content'),
  });

  if(!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Failed to edit note.',
    };
  }

  const { title, content, author_id } = validatedFields.data;

  try {
    await sql`
      UPDATE "Note" SET
      title = ${title},
      content = ${`${content}`}
      WHERE "note_id" = ${`${note_id}`};
    `;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to edit note data.');
  }

  revalidatePath('/', 'layout');
  //redirect(`/home/${note_id}`);
  redirect('/home');
}

export async function deleteNote(note_id: string) {
  try {
    await sql`
      DELETE FROM "Note" WHERE "note_id" = ${`${note_id}`};
    `;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to delete note data.');
  }

  revalidatePath('/', 'layout');
  redirect('/home');
}
