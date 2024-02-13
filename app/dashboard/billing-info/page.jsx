"use client";

import "@/styles/globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { useSession } from "next-auth/react";
import { FaCreditCard } from "react-icons/fa";
import { CreateBillingSession } from "@/actions/stripe/billing-session";
import { CancelSubscription } from "@/actions/stripe/subscription-cancel";
import { useRouter } from "next/navigation";
import { useState, useMemo, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadSubscriptions,
  deleteSubscriptionSuccess,
  fetchSubscriptions,
} from "@/lib/redux/features/subscriptions/subscriptionSlice";
import { BeatLoader } from "react-spinners";

export default function BillingPage() {
  const router = useRouter();
  const [loadingSubscriptionId, setLoadingSubscriptionId] = useState(null);
  const [managePortalBtnLoading, setManagePortalBtnLoading] = useState(false);
  const [subscriptionsLoading, setSubscriptionsLoading] = useState(false);
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const dispatch = useDispatch();

  async function fetchSubscriptionsFromDb() {
    if (userId) {
      setSubscriptionsLoading(true);
      try {
        await dispatch(fetchSubscriptions(userId));
      } catch (error) {
        console.error("Error fetching subscriptions:", error);
      } finally {
        setSubscriptionsLoading(false); 
      }
    }
  }

  const formatDate = useCallback((dateString) => {
    const options = { day: "2-digit", month: "short", year: "2-digit" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  }, []);

  const handleCancelSubscription = async (stripeSubscriptionId) => {
    setLoadingSubscriptionId(stripeSubscriptionId);
    try {
      const response = await CancelSubscription(
        session.user.id,
        stripeSubscriptionId
      );
      if (response.success) {
        // Dispatch an action to remove the subscription from the Redux state
        dispatch(deleteSubscriptionSuccess(stripeSubscriptionId));
      } else {
        // Handle unsuccessful deletion
        console.error("Failed to delete subscription:", response.message);
        // Optionally, show an error message to the user
      }
    } catch (error) {
      console.error("Error canceling subscription:", error);
      // Optionally, handle error (show an alert or notification)
    } finally {
      setLoadingSubscriptionId(null); // Reset loading state for this specific button
    }
  };

  const openCustomerPortal = async () => {
    setManagePortalBtnLoading(true);
    try {
      const stripeSession = await CreateBillingSession(
        session.user.id,
        session.user.stripeCustomerId
      );
      if (stripeSession?.url) {
        window.location.href = stripeSession.url;
      } else {
        console.error("Failed to create a Stripe billing session.");
      }
    } catch (error) {
      console.error("Error opening customer portal:", error);
    } finally {
      setManagePortalBtnLoading(false);
    }
  };

  const subscriptions = useSelector((state) => state.subscriptions.items);
  const subscriptionsAvailable = useMemo(
    () => subscriptions.length > 0,
    [session]
  );
  // const subscriptionsAvailable = subscriptions.length > 0;
  // const subscriptionsAvailable = useMemo(
  //   () => subscriptions.length > 0,
  //   [subscriptions]
  // );

  useEffect(() => {
    if (userId && subscriptions.length === 0) {
      fetchSubscriptionsFromDb();
    }
  }, [userId, subscriptions, dispatch]);

  return (
    <div className="flex items-start">
      <div className="p-5 w-[85vw]">
        <p className="text-3xl font-bold leading-[1] mb-3 capitalize text-transparent bg-clip-text bg-gradient-to-r from-[#707070] to-black dark:to-dark-300 dark:from-white h-10">
          Hello, {session?.user.name}
        </p>
        {subscriptionsLoading ? (
          ""
        ) : (
          <div className="flex items-center gap-2 mb-3">
            <FaCreditCard className="text-gray-800" />
            <p>
              {session?.user.isActive && subscriptionsAvailable
                ? "Pro"
                : "Free"}
            </p>
          </div>
        )}
        <div className="pb-5">
          {subscriptionsAvailable && !subscriptionsLoading && (
            <button
              className="py-1.5 text-sm bg-black text-white dark:bg-white dark:text-black px-3 rounded-full disabled:opacity-50 w-52"
              onClick={openCustomerPortal}
              disabled={managePortalBtnLoading}
            >
              {managePortalBtnLoading
                ? "Processing..."
                : "  Manage All Subscriptions"}
            </button>
          )}
        </div>
        <div className="w-[55rem]">
          <hr />
        </div>
        {subscriptionsLoading ? (
          // <div className="flex items-center justify-center h-72">
          //   {/* Loading spinner or message */}
          //   <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
          //     {/* SVG path for spinner */}
          //   </svg>
          // </div>
          <div className=" flex justify-center items-center h-96">
            {/* <div className="animate-spin rounded-full h-14 w-14 border-b-2 border-gray-900"></div> */}
            <BeatLoader />
          </div>
        ) : subscriptionsAvailable ? (
          <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Tool Url
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Plan Type
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Active?
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Ending on
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <span className="sr-only">Cancel Subscription</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {subscriptions.map((subscription, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {subscription.toolUrl}
                      </th>
                      <td className="px-6 py-4">{subscription.planType}</td>
                      <td className="px-6 py-4">
                        {subscription.isActive ? "Yes" : "No"}
                      </td>
                      <td className="px-6 py-4">
                        {formatDate(subscription.endDate)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline disabled:opacity-50"
                          disabled={
                            loadingSubscriptionId ===
                            subscription.stripeSubscriptionId
                          }
                          onClick={() =>
                            handleCancelSubscription(
                              subscription.stripeSubscriptionId
                            )
                          }
                        >
                          {loadingSubscriptionId ===
                          subscription.stripeSubscriptionId ? (
                            <div className="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
                          ) : (
                            "Cancel Subscription"
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-72">
            <p className="text-lg text-gray-500 dark:text-gray-400">
              You don't have any active subscriptions.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
