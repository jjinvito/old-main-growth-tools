import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import { CiCirclePlus } from "react-icons/ci";
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
  const [canPublish, setCanPublish] = useState(false);
  const [selectedSubscriptionId, setSubscriptionId] = useState("");
  const [loadingToolDelete, setloadingToolDelete] = useState(null);

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
    setloadingToolDelete(toolId);
    if (!toolId) return;
    try {
      await deleteToolById(toolId);
      dispatch(fetchUserById(session.data?.user?.id));
      console.log("Tool deleted successfully!");
      toast.success("Tool deleted successfully!");
    } catch (error) {
      console.error("Failed to delete tool:", error);
      console.log("Tool deleted ERROR!");
      toast.error("Failed to delete tool!, Please try again");
    } finally {
      setloadingToolDelete(null);
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
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
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
                <ToolCardSkeleton />
              </tbody>
            </table>
          </div>
        ) : (
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
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
                {userData?.subscriptions?.map(
                  (subscription) =>
                    subscription?.tool && (
                      <>
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
                                disabled={
                                  loadingToolDelete === subscription?.tool?.id
                                }
                              >
                                {loadingToolDelete ===
                                subscription?.tool?.id ? (
                                  <div className="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900 dark:border-white"></div>
                                ) : (
                                  <HiOutlineTrash
                                    className="hover:text-red hover:cursor-pointer"
                                    size={25}
                                  />
                                )}
                              </button>
                            </div>
                          </td>
                        </tr>
                      </>
                    )
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
