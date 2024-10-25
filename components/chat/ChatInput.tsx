import React from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Send } from "lucide-react";

interface ChatInputProps {
  isDisabled?: boolean;
}

const ChatInput = ({ isDisabled }: ChatInputProps) => {
  return (
    <div className="absolute bottom-0 w-full left-0">
      <form className="mx-2 flex flex-row md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
        <div className="w-full flex md:flex-col h-full flex-1 items-stretch">
          <div className="relative w-full flex flex-col flex-grow p-4">
            <div className="relative">
              <Textarea
                disabled={isDisabled}
                rows={1}
                maxRows={4}
                autoFocus
                className="resize-none pr-12 text-base py-3 scrollbar-thumb-green scrollbar-thumb-rounded scrollbar-track-green-lighter scrollbar-w-2 scrolling-touch"
                placeholder="Ask Anything..."
            
              />
              <Button size={"sm"} aria-label="send message" className="absolute right-1.5 bottom-1.5">
                <Send className="w-4 h-4 " />
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
