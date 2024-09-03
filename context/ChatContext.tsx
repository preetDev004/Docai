import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import React, { createContext, useState } from "react";

type ChatContextType = {
  message: string;
  addMessage: () => void;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isLoading: boolean;
};

export const ChatContext = createContext<ChatContextType>({
  message: "",
  addMessage: () => {},
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => {},
  isLoading: false,
});

interface ChatContextProps {
  children: React.ReactNode;
  fileId: string;
}
export const ChatContextProvider = ({ children, fileId }: ChatContextProps) => {
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  
  const { mutate: sendMessage } = useMutation({
    mutationFn: async ({ message }: { message: string }) => {
      setIsLoading(true);
      const res = await fetch(`/api/message`, {
        method: "POST",
        body: JSON.stringify({
          fileId: fileId,
          message: message,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to send message");
      }

      setIsLoading(false);
      return res.body;
    },
    onError: (err) => {
      setIsLoading(false);
      toast({
        title: "Failed to send message",
        description: err.message,
        variant: "destructive",
      });
    }
  });
  const addMessage = () => {
    sendMessage({ message });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };
  return (
    <ChatContext.Provider
      value={{
        message,
        addMessage,
        handleInputChange,
        isLoading,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
