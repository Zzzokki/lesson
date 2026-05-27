"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { User } from "../page";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { useAuth } from "./providers/AuthProvider";
import { api } from "@/axios";

type SignUpResponse = {
  user: User;
};

export const SignUpCard = () => {
  const { setUser } = useAuth();

  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSignUp = async () => {
    setLoading(true);

    try {
      const { data } = await api.post<SignUpResponse>("/signup", {
        username,
        email,
        password,
      });

      setUser(data.user);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "An error occurred");
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-80 p-6 bg-white">
      <div className="text-2xl font-bold mb-4">Sign Up</div>

      <Label htmlFor="username">Username</Label>
      <Input
        id="username"
        type="text"
        value={username}
        onChange={handleUsernameChange}
      />

      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        type="email"
        value={email}
        onChange={handleEmailChange}
      />

      <Label htmlFor="password">Password</Label>
      <Input
        id="password"
        type="password"
        value={password}
        onChange={handlePasswordChange}
      />

      <Button disabled={loading} onClick={handleSignUp}>
        {loading ? <Loader className="animate-spin" /> : "Sign Up"}
      </Button>
    </Card>
  );
};
