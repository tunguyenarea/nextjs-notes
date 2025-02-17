'use server';

import { neon } from "@neondatabase/serverless";
import { genSaltSync, hashSync } from 'bcrypt-ts';
import { User, Note } from '@/app/lib/definitions';

const sql = neon(process.env.DATABASE_URL!);

export async function getUser(email: string) {
  try {
    const data = await sql`
      SELECT * FROM "User"
      WHERE "email" = ${`${email}`};
    `;

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch user data.');
  }
}

export async function createUser(email: string, password: string) {
  const salt = genSaltSync(10);
  const hash = hashSync(password, salt);
  const name = email;

  try {
    await sql`
      INSERT INTO "User" (name, email, password)
      VALUES(${name}, ${email}, ${hash});
    `;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to create user.');
  }
}

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
