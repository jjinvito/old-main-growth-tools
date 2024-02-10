"use client"

import { useSession } from "next-auth/react";

export const useCurrentUser = () => {
    const session = useSession();
    JSON.stringify(session) 
    return session?.data?.user;
}