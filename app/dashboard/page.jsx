"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { fetchUserById } from "@/lib/redux/features/user/userSlice";

const DashboardPage = () => {
  const session = useSession();

  const dispatch = useDispatch();

  useEffect(() => {
    if (session.data?.user) {
      dispatch(fetchUserById(session.data?.user?.id));
    }
  }, [dispatch]);
  return (
    <div className="flex flex-col gap-7 justify-center items-center w-full dark:bg-black">
      <Image
        src="/logov2.png"
        width="357"
        height="110"
        alt="Growth Tools Logo"
      />
      <h1 className="customFont font-semibold text-2xl dark:text-white">
        Welcome to Growth Tools Dashboard!!
      </h1>
    </div>
  );
};

export default DashboardPage;
