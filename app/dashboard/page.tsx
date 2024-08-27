import Dashboard from "@/components/Dashboard";
import { db } from "@/drizzle/db";
import { userTable } from "@/drizzle/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

const Page = async () => {
  const { userId } = auth();
  if (!userId) {
    redirect("/auth-callback?origin=dashboard");
  }
  const dbUser = await db.query.userTable.findFirst({
    where: eq(userTable.id, userId),
  });

  if (!dbUser) {
    redirect("/auth-callback?origin=dashboard");
  }

  return <Dashboard />;
};

export default Page;
