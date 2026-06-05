"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChangeEvent, useState } from "react";
import { User } from "../page";
import { useAuth } from "./providers/AuthProvider";
import { api } from "@/axios";
import { handleError } from "@/utils/error";

type SignInResponse = {
  user: User;
  accessToken: string;
};

export const SignInCard = () => {
  const { setUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSignIn = async () => {
    try {
      const { data } = await api.post<SignInResponse>("/signin", {
        email,
        password,
      });

      setUser(data.user);
      localStorage.setItem("accessToken", data.accessToken);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <Card className="w-80 p-6 bg-white">
      <div className="text-2xl font-bold mb-4">Sign In</div>

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

      <Button onClick={handleSignIn}>Sign In</Button>
    </Card>
  );
};
