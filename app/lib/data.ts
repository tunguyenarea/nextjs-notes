'use server';

import { neon } from "@neondatabase/serverless";
import { Note } from '@/app/lib/definitions';

const sql = neon(process.env.DATABASE_URL!);

export async function fetchNote(id: string) {
  try {
    const data = await sql`
      SELECT * FROM "Note"
      WHERE "author_id" = ${`${id}`}
      ORDER BY "date" DESC;
    `;

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch note data.');
  }
}

export async function fetchEachNote(note_id: string) {
  try {
    const data = await sql`
      SELECT * FROM "Note"
      WHERE "note_id" = ${`${note_id}`};
    `;

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch each note data.');
  }
}
