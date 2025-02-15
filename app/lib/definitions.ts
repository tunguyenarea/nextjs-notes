'use server';

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Note = {
  note_id: string;
  title: string;
  content: string;
  author_id: string;
};
