"use server";

import { auth } from "@/auth";

const CheckAuthStatus = async () => {
    const session = await auth();

    return session;
};

export default CheckAuthStatus;
