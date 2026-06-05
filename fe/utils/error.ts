import axios from "axios";
import { toast } from "sonner";

export const handleError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    toast.error(error.response?.data?.message || "An error occurred");
  } else if (error instanceof Error) {
    toast.error(error.message);
  } else {
    toast.error("An unknown error occurred");
  }
};
