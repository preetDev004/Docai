import Dashboard from "@/components/Dashboard";
import { db } from "@/drizzle/db";
import { userTable } from "@/drizzle/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

const Page = async () => {
  // const test = async () => {
  //   const query = await db.query.userTable.findFirst();
  //   console.log(query);
  // };
  // test();

  const { userId } = auth();
  if (!userId) {
    redirect("/auth-callback?origin=dashboard");
  }
  const dbUser = await db
    .select()
    .from(userTable)
    .where(eq(userTable.id, userId))
    .limit(1);

  if (!dbUser[0]) {
    redirect("/auth-callback?origin=dashboard");
  }

  return <Dashboard />;
};

export default Page;
