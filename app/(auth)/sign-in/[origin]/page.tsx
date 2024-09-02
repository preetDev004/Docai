import { SignIn } from "@clerk/nextjs";

export default function Page({origin}: {origin : string}) {
  console.log(origin)
  return <SignIn />;
}
