import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const Dashboard = async () => {
  const user = await currentUser();
  console.log(user?.emailAddresses[0].emailAddress);

  if(!user || !user.id){
    redirect('/auth-callback?origin=dashboard')
  }
  return <div>Dashboard</div>;
};

export default Dashboard;
