import { Loader2 } from "lucide-react";
import React from "react";

interface LoaderProps {
  title: string;
  description?: string;
}

const Loader = ({ title, description }: LoaderProps) => {
  return (
    <div className="w-full mt-24">
      <div className="flex items-center justify-center gap-3 flex-col">
        <Loader2 className="w-8 h-8 animate-spin text-zinc-800" />
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-center">{title}</h3>
          <p className="text-sm text-gray-600 text-center">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Loader;
