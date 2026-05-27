"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuth } from "./_components/providers/AuthProvider";

export type User = {
  id: number;
  username: string;
  email: string;
};

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <h1 className="text-4xl font-bold">Hello, {user?.username}!</h1>

      <Link href="/profile" className="ml-4">
        <Button>Go to Profile</Button>
      </Link>
    </div>
  );
}
