import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import { CiCirclePlus } from "react-icons/ci";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { fetchUserById } from "@/lib/redux/features/user/userSlice";
import { ToolCardSkeleton } from "../tool-card-skeleton";
import { BeatLoader } from "react-spinners";
import { LuPencil } from "react-icons/lu";
import { HiOutlineTrash } from "react-icons/hi2";
import { deleteToolById } from "@/data/tools";
import { useDispatch } from "react-redux";
import { setSelectedSubscriptionId } from "@/lib/redux/features/subscriptions/subscriptionSlice";
import { GrStatusGoodSmall } from "react-icons/gr";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { toast } from "react-toastify";

export default function PublishedTools() {
  const [isHovered, setIsHovered] = useState(false);
  const [canPublish, setCanPublish] = useState(false);
  const [selectedSubscriptionId, setSubscriptionId] = useState("");

  const userData = useSelector((state) => state?.user?.data);
  const loading = useSelector((state) => state?.user?.status);
  const session = useSession();
  const dispatch = useDispatch();

  const formatDate = useCallback((dateString) => {
    const options = { day: "2-digit", month: "short", year: "2-digit" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  }, []);

  const handleDelete = async (toolId) => {
    if (!toolId) return;
    try {
      await deleteToolById(toolId);
      toast.success("Tool deleted successfully!");
    } catch (error) {
      console.error("Failed to delete tool:", error);
      toast.success("Failed to delete tool!, Please try again.");
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

  const handleSubscriptionChange = (value) => {
    setSubscriptionId(value);
    console.log("value==", value);
    dispatch(setSelectedSubscriptionId(value));
  };

  return (
    <div>
      <div className="customFont font-semibold p-4 text-2xl">Add New Tool</div>
      {loading === "loading" ? (
        <BeatLoader color="white" />
      ) : (
        <div className="flex gap-5 justify-center items-center">
          <Select
            onValueChange={(val) => handleSubscriptionChange(val)}
            value={selectedSubscriptionId}
          >
            <SelectTrigger className="w-1/2">
              <SelectValue placeholder="Select a Subscription" />
            </SelectTrigger>
            <SelectContent position="popper">
              {userData?.subscriptions.map((subscription) => (
                <SelectItem
                  key={subscription.id}
                  value={subscription.id}
                  disabled={subscription.tool !== null}
                  style={{ color: subscription.tool ? "gray" : "black" }}
                >
                  {subscription.planType} -{" "}
                  {subscription.tool ? "Used" : "Available"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {selectedSubscriptionId && (
            <Link href="/dashboard/update-tool-info">
              <CiCirclePlus size={55} className="ml-7" />
            </Link>
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
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
            {userData?.subscriptions?.map(
              (subscription) =>
                subscription?.tool && (
                  
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-white  dark:bg-dark-600">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-dark-600 dark:text-white">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          logo
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Tool Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Ceated At
                        </th>
                        <th scope="col" className="py-3">
                          Published Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        key={subscription?.tool?.id}
                        className="bg-white border-b hover:bg-gray-50 dark:hover:bg-dark-400 dark:bg-dark-500"
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          <Image
                            src={subscription?.tool?.logoUrl}
                            height={75}
                            width={75}
                          />
                        </th>
                        <td className="px-6 py-4">
                          {subscription?.tool?.name}
                        </td>
                        <td className="px-6 py-4">
                          ${subscription?.tool?.price}
                        </td>
                        <td className="px-6 py-4">
                          {formatDate(subscription?.tool?.createdAt)}
                        </td>
                        <td className="px-11 py-4">
                          <div className="flex items-center">
                            {subscription?.tool?.isPublished ? (
                              <GrStatusGoodSmall color="green" />
                            ) : (
                              <GrStatusGoodSmall color="grey" />
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className=" flex gap-10 items-center h-full">
                            <LuPencil
                              className="hover:text-red hover:cursor-pointer"
                              size={25}
                            />
                            <button
                              onClick={() =>
                                handleDelete(subscription?.tool?.id)
                              }
                            >
                              <HiOutlineTrash
                                className="hover:text-red hover:cursor-pointer"
                                size={25}
                              />
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                )
            )}
          </div>

          // <div
          //   key={subscription?.tool?.id}
          //   role="list-item"
          //   className="transition ease-in-out w-[100%] sm:w-[100%] md:w-[100%] lg:w-[33.3%] rounded-xl p-4"
          //   onMouseEnter={() => setIsHovered(true)}
          //   onMouseLeave={() => setIsHovered(false)}
          // >
          //   <Link
          //     href={`/tool/${subscription?.tool?.id}`}
          //     className="hover:opacity-90 transition"
          //   >
          //     <div
          //       className={cn(
          //         "relative w-full  rounded-xl h-[250px] bg-cover bg-center border-[1px] border-light-100 dark:border-dark-500 border-solid transition duration-200 overflow-hidden"
          //       )}
          //     >
          //       <div className="flex justify-center items-end h-full w-full">
          //         <Image
          //           className={cn(
          //             "ease block object-cover rounded-t-xl transition ease-in-out delay-150 duration-200 w-44 h-48 custom-shadow-2 cards",
          //             isHovered &&
          //               "-translate-y-1 scale-x-150 scale-y-125 new-shadow"
          //           )}
          //           src={subscription?.tool?.primaryScreenshot}
          //           alt={`Logo of ${subscription?.tool?.name}`}
          //           width={225}
          //           height={197}
          //         />
          //       </div>

          //       <div
          //         className={cn(
          //           "absolute top-0 p-2 m-2 rounded-lg transition-colors duration-400 ease-in-out bg-transparent",
          //           isHovered ? "bg-white" : "bg-transparent"
          //         )}
          //       >
          //         <img
          //           src={subscription?.tool?.logoUrl}
          //           width={32}
          //           height={32}
          //         />
          //       </div>
          //       <div className="absolute right-1 top-0 flex items-center justify-center">
          //         {subscription?.tool?.deals && (
          //           <div
          //             className={cn(
          //               "p-2 m-2 rounded-lg transition-colors duration-400 ease-in-out bg-transparent",
          //               isHovered ? "bg-white" : "bg-transparent"
          //             )}
          //           >
          //             <Image
          //               src="/deal.png"
          //               width={35}
          //               height={20}
          //               alt="deal icon used to identify if any deal offered by tool owner"
          //             />
          //           </div>
          //         )}
          //       </div>

          //       <div
          //         className={cn(
          //           "absolute bottom-2 right-2 transition-opacity duration-500 ease-in-out opacity-100 ",
          //           isHovered ? "md:opacity-100" : "md:opacity-0"
          //         )}
          //       >
          //         <img
          //           src="/hoverClap.png"
          //           width={48}
          //           height={48}
          //           alt=""
          //         />
          //       </div>
          //     </div>
          //   </Link>

          //   <div className="flex justify-between items-center mt-2">
          //     <div>
          //       <h2 className="transition duration-200 font-bold">
          //         {subscription?.tool?.name}
          //       </h2>
          //       <p className="text-sm h-16">
          //         {subscription?.tool?.shortDescription}
          //       </p>
          //     </div>
          //   </div>
          //   <div className="flex items-center">
          //     <button className="flex gap-4 w-1/2 bg-blueStart h-7 items-center justify-center text-white rounded-xl">
          //       Edit
          //       <LuPencil />
          //     </button>

          //     <button
          //       className="flex w-1/2 gap-4 bg-red-600 h-7 items-center justify-center text-white rounded-xl"
          //       onClick={() => handleDelete(subscription?.tool?.id)}
          //     >
          //       Delete
          //       <HiOutlineTrash />
          //     </button>
          //   </div>
          // </div>

          //   )}
          // </div>
        )}
      </div>
    </div>
  );
}
