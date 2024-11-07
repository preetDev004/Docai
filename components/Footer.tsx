import { auth } from "@clerk/nextjs/server";

const Footer = async () => {
  const { userId } = await auth();
  return (
    <>
      {!userId && (
        <footer className="relative mt-16">
          <div className="w-full absolute bottom-0 h-50 p-5 text-center text-sm sm:text-base">
            Copyright &copy; 2024 <span className="text-green-600">Docai.</span>{" "}
            All rights reserved | Created with 💚 by Preet
          </div>
        </footer>
      )}
    </>
  );
};

export default Footer;
