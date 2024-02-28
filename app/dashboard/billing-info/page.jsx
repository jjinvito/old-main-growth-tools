"use client";

import "@/styles/globals.css";
import { useSession } from "next-auth/react";
import { FaCreditCard } from "react-icons/fa";
import { CreateBillingSession } from "@/actions/stripe/billing-session";
import { CancelSubscription } from "@/actions/stripe/subscription-cancel";
import { useRouter } from "next/navigation";
import { useState, useMemo, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSubscriptionSuccess,
  fetchSubscriptions,
} from "@/lib/redux/features/subscriptions/subscriptionSlice";
import { BeatLoader } from "react-spinners";

export default function BillingPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const subscriptions = useSelector((state) => state.subscriptions.items);
  const subscriptionsStatus = useSelector(
    (state) => state.subscriptions.status
  );
  const [loadingSubscriptionId, setLoadingSubscriptionId] = useState(null);
  const [managePortalBtnLoading, setManagePortalBtnLoading] = useState(false);

  const subscriptionsLoading = subscriptionsStatus === "loading";

  async function fetchSubscriptionsFromDb() {
    if (userId) {
      try {
        await dispatch(fetchSubscriptions(userId));
      } catch (error) {
        console.error("Error fetching subscriptions:", error);
      } finally {
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
        dispatch(deleteSubscriptionSuccess(stripeSubscriptionId));
      } else {
        console.error("Failed to delete subscription:", response.message);
      }
    } catch (error) {
      console.error("Error canceling subscription:", error);
    } finally {
      setLoadingSubscriptionId(null);
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

  const subscriptionsAvailable = useMemo(
    () => subscriptions.length > 0,
    [session, subscriptions]
  );

  useEffect(() => {
    if (userId && subscriptions.length === 0 && !subscriptionsLoading) {
      dispatch(fetchSubscriptionsFromDb);
    }
  }, [userId, subscriptions.length, dispatch, subscriptionsLoading]);

  return (
    <div className="flex items-start">
      <div className="p-5 h-screen w-screen lg:w-[85vw] dark:bg-black">
        <p className="text-3xl font-bold leading-[1] mb-3 capitalize text-transparent bg-clip-text bg-gradient-to-r from-[#707070] to-black dark:to-dark-300 dark:from-white h-10">
          Hello, {session?.user.name}
        </p>
        {subscriptionsLoading ? (
          ""
        ) : (
          <div className="flex items-center gap-2 mb-3 dark:text-white">
            <FaCreditCard className="text-gray-800 dark:text-muted" />
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
              className="py-1.5 text-sm bg-black text-white dark:text-white px-3 rounded-full disabled:opacity-50 w-52 dark:bg-dark-600"
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
          <div className=" flex justify-center items-center h-96">
            <BeatLoader color="white"/>
          </div>
        ) : subscriptionsAvailable ? (
          <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-white  dark:bg-dark-600">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-dark-600 dark:text-white">
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
                      className="bg-white border-b hover:bg-gray-50 dark:hover:bg-dark-400 dark:bg-dark-500"
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
                            <div className="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900 dark:border-white"></div>
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
