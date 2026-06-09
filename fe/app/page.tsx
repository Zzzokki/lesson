"use client";

import { useEffect, useState } from "react";
import { CreateIdeaDialog } from "./_components";
import { handleError } from "@/utils/error";
import { api } from "@/axios";
import { ArrowDown, ArrowUp, Loader, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAuth } from "./_components/providers/AuthProvider";

export type User = {
  id: number;
  username: string;
  email: string;
};

export type Idea = {
  id: number;
  text: string;
  userId: number;
};

export default function Home() {
  const { user } = useAuth();

  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey((prev) => 1 - prev);
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/ideas/${id}`);
      toast.success("Successfully deleted");
      handleRefresh();
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    const getIdeas = async () => {
      setLoading(true);
      try {
        const { data } = await api.get<{ ideas: Idea[] }>("/ideas");

        setIdeas(data.ideas);
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    };
    getIdeas();
  }, [refreshKey]);

  return (
    <div className="w-200 mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-4">Welcome to the Idea App</h1>

        <CreateIdeaDialog handleRefresh={handleRefresh} />
      </div>

      <div className="flex flex-col gap-4">
        {loading && (
          <div className="w-full flex justify-center items-center py-4">
            <Loader className="animate-spin" />
          </div>
        )}

        {!loading &&
          ideas.map((idea, index) => {
            const { id, text, userId } = idea;

            const isMine = user?.id === userId;

            const deleteIdea = () => handleDelete(id);

            return (
              <div
                key={idea.id}
                className="p-4 rounded-lg bg-white shadow flex justify-between "
              >
                <p>
                  {index + 1}.{text}
                </p>

                <div className="flex gap-2">
                  {isMine && (
                    <Button
                      size="icon-sm"
                      variant="destructive"
                      onClick={deleteIdea}
                    >
                      <Trash />
                    </Button>
                  )}

                  <p>0</p>

                  <Button size="icon-sm" variant="destructive">
                    <ArrowDown />
                  </Button>

                  <Button size="icon-sm" variant="default">
                    <ArrowUp />
                  </Button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
