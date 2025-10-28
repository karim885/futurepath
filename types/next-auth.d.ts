import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      points?: number;
      badges?: string[];
      quizzesTaken?: number;
    };
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    points?: number;
    badges?: string[];
    quizzesTaken?: number;
  }
}

