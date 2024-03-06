import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import { CiCirclePlus } from "react-icons/ci";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { fetchUserById } from "@/lib/redux/features/user/userSlice";
import { ToolCardSkeleton } from "../tool-card-skeleton";
import { BeatLoader } from "react-spinners";
import { LuPencil } from "react-icons/lu";
import { HiOutlineTrash } from "react-icons/hi2";
import { deleteToolById } from "@/data/tools";

export default function PublishedTools() {
  const [isHovered, setIsHovered] = useState(false);
  const [canPublish, setCanPublish] = useState(false);

  const userData = useSelector((state) => state?.user?.data);
  const loading = useSelector((state) => state?.user?.status);
  const session = useSession();
  const dispatch = useDispatch();

  const handleDelete = async (toolId) => {
    if (!toolId) return; 
    try {
      await deleteToolById(toolId);
      console.log("Tool deleted successfully!");
    } catch (error) {
      console.error("Failed to delete tool:", error);
      console.log("Tool deleted ERROR!");
    }
  };

  useEffect(() => {
    if (userData) {
      const canPublishNewTool = userData?.subscriptions?.some(
        (subscription) => subscription.tool === null
      );
      setCanPublish(canPublishNewTool);
      console.log(canPublish);
    }
    if (!userData) {
      dispatch(fetchUserById(session.data?.user?.id));
    }
  }, [dispatch, userData]);

  console.log("userData", userData);
  console.log("loading", loading);
  return (
    <div>
      <div className="customFont font-semibold p-4 text-2xl">Add New Tool</div>
      {loading === "loading" ? (
        <div>
          <BeatLoader color="white" />
        </div>
      ) : (
        <div>
          {canPublish ? (
            <Link href="/dashboard/update-tool-info">
              <CiCirclePlus size={55} className="ml-7" />
            </Link>
          ) : (
            <div className=" font-semibold ml-2 text-greyColorMuted">
              You need to buy the subscription in order to publish more tools!
            </div>
          )}
        </div>
      )}

      <div className="customFont font-semibold p-4 text-2xl">
        Your Published Tools
      </div>
      <div>
        {loading === "loading" ? (
          <div className="p-5">
            <ToolCardSkeleton />
          </div>
        ) : (
          <div>
            {userData?.subscriptions?.map(
              (subscription) =>
                subscription?.tool && (
                  <div
                    key={subscription?.tool?.id}
                    role="list-item"
                    className="transition ease-in-out w-[100%] sm:w-[100%] md:w-[100%] lg:w-[33.3%] rounded-xl p-4"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    <Link
                      href={`/tool/${subscription?.tool?.id}`}
                      className="hover:opacity-90 transition"
                    >
                      <div
                        className={cn(
                          "relative w-full  rounded-xl h-[250px] bg-cover bg-center border-[1px] border-light-100 dark:border-dark-500 border-solid transition duration-200 overflow-hidden"
                        )}
                      >
                        <div className="flex justify-center items-end h-full w-full">
                          <Image
                            className={cn(
                              "ease block object-cover rounded-t-xl transition ease-in-out delay-150 duration-200 w-44 h-48 custom-shadow-2 cards",
                              isHovered &&
                                "-translate-y-1 scale-x-150 scale-y-125 new-shadow"
                            )}
                            src={subscription?.tool?.primaryScreenshot}
                            alt={`Logo of ${subscription?.tool?.name}`}
                            width={225}
                            height={197}
                          />
                        </div>

                        <div
                          className={cn(
                            "absolute top-0 p-2 m-2 rounded-lg transition-colors duration-400 ease-in-out bg-transparent",
                            isHovered ? "bg-white" : "bg-transparent"
                          )}
                        >
                          <img
                            src={subscription?.tool?.logoUrl}
                            width={32}
                            height={32}
                          />
                        </div>
                        <div className="absolute right-1 top-0 flex items-center justify-center">
                          {subscription?.tool?.deals && (
                            <div
                              className={cn(
                                "p-2 m-2 rounded-lg transition-colors duration-400 ease-in-out bg-transparent",
                                isHovered ? "bg-white" : "bg-transparent"
                              )}
                            >
                              <Image
                                src="/deal.png"
                                width={35}
                                height={20}
                                alt="deal icon used to identify if any deal offered by tool owner"
                              />
                            </div>
                          )}
                        </div>

                        <div
                          className={cn(
                            "absolute bottom-2 right-2 transition-opacity duration-500 ease-in-out opacity-100 ",
                            isHovered ? "md:opacity-100" : "md:opacity-0"
                          )}
                        >
                          <img
                            src="/hoverClap.png"
                            width={48}
                            height={48}
                            alt=""
                          />
                        </div>
                      </div>
                    </Link>

                    <div className="flex justify-between items-center mt-2">
                      <div>
                        <h2 className="transition duration-200 font-bold">
                          {subscription?.tool?.name}
                        </h2>
                        <p className="text-sm h-16">
                          {subscription?.tool?.shortDescription}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <button className="flex gap-4 w-1/2 bg-blueStart h-7 items-center justify-center text-white rounded-xl">
                        Edit
                        <LuPencil />
                      </button>

                      <button
                        className="flex w-1/2 gap-4 bg-red-600 h-7 items-center justify-center text-white rounded-xl"
                        onClick={() => handleDelete(subscription?.tool?.id)}
                      >
                        Delete
                        <HiOutlineTrash />
                      </button>
                    </div>
                  </div>
                )
            )}
          </div>
        )}
      </div>
    </div>
  );
}
