import { FolderOpen } from "lucide-react";
import UploadButton from "./UploadButton";

const Dashboard = () => {
  return (
    <main className="mx-auto max-w-7xl p-2.5 md:p-10 ">
      <div className="mt-8 flex items-center justify-between gap-4 border-b border-gray-200 pb-5">
        <div className="flex items-center gap-1 md:gap-2">
          <FolderOpen
            stroke="#ffffff"
            fill="#43A047"
            className="w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 xl:w-20 xl:h-20"
          />
          <h1 className="font-semibold text-2xl sm:text-3xl lg:text-4xl xl:text-5xl">
            My Files{" "}
          </h1>
        </div>
        <UploadButton/>
      </div>

      {/* display all user files  */}
    </main>
  );
};

export default Dashboard;
