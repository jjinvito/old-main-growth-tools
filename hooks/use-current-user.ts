"use client"

import { useSession } from "next-auth/react";

export const useCurrentUser = () => {
    const session = useSession();
    JSON.stringify(session) 
    console.log(session);
    return session?.data?.user;
}