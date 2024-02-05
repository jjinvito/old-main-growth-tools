"use client";
import { useSession } from "next-auth/react";

// import { auth, signOut } from "@/auth";


const Settings = () => {
  const session = useSession();

  return (
    <div>
      {JSON.stringify(session)}
      {/* <form
        action={async () => {
          "use server";
          await signOut();
        }}
      > */}
      <button type="submit">Sign Out</button>
      {/* </form> */}
    </div>
  );
};

export default Settings;
