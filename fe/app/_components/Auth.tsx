"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SignInCard } from "./SignInCard";
import { SignUpCard } from "./SignUpCard";

export const Auth = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Tabs defaultValue="sign-in" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="sign-in">Sign In</TabsTrigger>
          <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
        </TabsList>

        <TabsContent value="sign-in">
          <SignInCard />
        </TabsContent>

        <TabsContent value="sign-up">
          <SignUpCard />
        </TabsContent>
      </Tabs>
    </div>
  );
};
