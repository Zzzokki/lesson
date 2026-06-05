"use client";

import { api } from "@/axios";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { handleError } from "@/utils/error";
import { Loader } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";

type CreateIdeaDialogProps = {
  handleRefresh: () => void;
};

export const CreateIdeaDialog = ({ handleRefresh }: CreateIdeaDialogProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");

  const createIdea = async () => {
    if (!text) {
      toast.error("Text is required");
      return;
    }

    setLoading(true);

    try {
      await api.post("/ideas", { text });

      toast.success("Idea created successfully");

      setOpen(false);

      handleRefresh();
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value.trim());
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Create Idea</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Create Idea</DialogTitle>
          <DialogDescription>
            Fill out the form below to create a new idea. Click save when
            you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <FieldGroup>
          <Field>
            <Label htmlFor="text">Text</Label>
            <Textarea
              value={text}
              onChange={handleTextChange}
              id="text"
              name="text"
              placeholder="Enter your idea here"
            />
          </Field>
        </FieldGroup>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>

          <Button disabled={loading} onClick={createIdea}>
            {loading ? <Loader className="animate-spin" /> : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
