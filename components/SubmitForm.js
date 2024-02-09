"use client";
import { useState } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { IoArrowBackOutline } from "react-icons/io5";
import { IoCheckmark } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import getStripe from "@/utils/get-stripejs";
import { cn } from "@/lib/util";
import { CreateStripeCheckoutSession } from "@/actions/stripe/checkout-session";

export default function SubmitForm() {
  const session = useSession();
  const router = useRouter();
  const [selectedCard, setSelectedCard] = useState(null);
  const [toolUrl, setToolUrl] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [priceId, setpriceId] = useState(null);
  const [planType, setplanType] = useState(null);
  const [errorMessage, seterrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [cardSelected, setcardSelected] = useState(false);
  const userId = session.data?.user?.id;

  const HandleCreateCheckout = async (e, priceId) => {
    e.preventDefault();

    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!urlRegex.test(toolUrl)) {
      seterrorMessage("Please enter a valid tool URL.");
      return;
    }

    seterrorMessage("");
    setLoading(true);

    try {
      const response = await CreateStripeCheckoutSession({
        userId,
        priceId,
        toolUrl,
        planType,
        emailAddress,
      });
      const stripe = await getStripe();
      const { error } = await stripe.redirectToCheckout({
        sessionId: response.session.id,
      });
    } catch (error) {
      seterrorMessage("Something Went Wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (cardIndex) => {
    setSelectedCard(cardIndex);
    if (cardIndex === 0) {
      // setpriceId("price_1OfJRjGZiJ9FqoFUZORhBvGi");
      setpriceId(process.env.NEXT_PUBLIC_MONTHLY_PRODUCT_ID);
      setplanType("Monthly");
    } else if (cardIndex === 1) {
      // setpriceId("price_1OfJSeGZiJ9FqoFUCjJyZ0qY");
      setpriceId(process.env.NEXT_PUBLIC_YEARLY_PRODUCT_ID);
      setplanType("Annual");
    }
    setcardSelected(true);
  };

  const handleBackClick = () => {
    router.push("/");
  };

  return (
    <>
      <div className="w-full  dark:bg-dark-500 rounded-xl">
        <div className="mx-4  rounded-full p-3">
          <div
            className="flex text-sm text-gray-500 w-max bg-gray-100 px-3 py-2 cursor-pointer rounded-full"
            onClick={handleBackClick}
          >
            <IoArrowBackOutline size={25} className="mr-2" />
            <p>Back</p>
          </div>
        </div>

        <div className="flex justify-center items-center h-full">
          <div className="w-[100vh] mx-4">
            <h3 className="text-xl font-bold text-center">Submit</h3>
            <div className="py-4 max-w-[350px] mx-auto ">
              <form className="">
                <div className=" my-2">
                  <input
                    type="text"
                    placeholder="Tool Url..."
                    className="px-4 w-full bg-light-100 py-2 rounded-lg focus:outline-light-300"
                    value={toolUrl}
                    onChange={(e) => setToolUrl(e.target.value)}
                  />
                </div>
                {!userId && (
                  <div className=" my-2">
                    <input
                      type="text"
                      placeholder="Your email address..."
                      className="px-4 w-full bg-light-100 py-2 rounded-lg focus:outline-light-300"
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                    />
                  </div>
                )}
                <div className="p-3 rounded-xl border border-1">
                  <h1>Price</h1>

                  <div
                    className={`px-4 pb-2 border border-1 rounded-xl mt-4 bg-gray-100 ${
                      selectedCard === 0 ? "border-[#a855f7]" : ""
                    }`}
                    onClick={() => handleCardClick(0)}
                  >
                    <p className="text-xs rounded-full bg-[#a855f7] relative bottom-4 w-fit p-1 text-white">
                      Early Bird Deal
                    </p>
                    <div className="flex justify-between items-center cursor-pointer">
                      <div>
                        <p>
                          <span>$1</span>
                          <span className="text-zinc-400 text line-through">
                            {" "}
                            $5.99
                          </span>{" "}
                          /month
                        </p>
                        <p className="text-sm text-zinc-400">
                          * $1 first month, then $5.99/month.
                        </p>
                      </div>
                      <div>
                        {selectedCard === 0 && (
                          <div className="h-[20px] w-[20px] bg-[#a855f7] rounded-full">
                            <IoCheckmark
                              size={20}
                              className="mr-2 p-[1px] text-white rounded-full"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div
                    className={`p-4 border border-1 rounded-xl mt-2 bg-gray-100 flex justify-between cursor-pointer items-center ${
                      selectedCard === 1 ? "border-[#a855f7]" : ""
                    }`}
                    onClick={() => handleCardClick(1)}
                  >
                    <div>
                      <p>
                        <span>$59</span>
                        <span className="text-zinc-400 text line-through">
                          {" "}
                          $69.99
                        </span>{" "}
                        /year
                      </p>
                      <p className="text-sm text-zinc-400">* You save $10.</p>
                    </div>
                    <div>
                      {selectedCard === 1 && (
                        <div className="h-[20px] w-[20px] bg-[#a855f7] rounded-full">
                          <IoCheckmark
                            size={20}
                            className="mr-2 p-[2px] text-white rounded-full"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-4">
                    <h2>Checklist</h2>

                    <div>
                      <div className="flex items-center mt-1">
                        <IoCheckmark
                          size={20}
                          className="bg-black mr-2 p-[1px]  text-white rounded-full"
                        />
                        <p>Your tool is functional</p>
                      </div>
                      <div className="flex items-center mt-1">
                        <IoCheckmark
                          size={20}
                          className="bg-black mr-2 p-[1px] text-white rounded-full"
                        />
                        <p>It delivers what it promises</p>
                      </div>
                      <div className="flex items-center mt-1">
                        <IoCheckmark
                          size={20}
                          className="bg-black text-sm  p-[1px] mr-2 text-white rounded-full"
                        />
                        <p>Is not an infoproduct</p>
                      </div>
                    </div>
                  </div>
                  <p
                    className="text-red-700 pb-2 flex items-center text-center justify-center gap-2 text-sm"
                    id="errorMessage"
                  >
                    {errorMessage && (
                      <>
                        <FaExclamationTriangle className="h-4 w-4" />
                        {errorMessage}
                      </>
                    )}
                  </p>

                  <button
                    className={cn(
                      "w-full p-2 bg-black text-white rounded-full mt-2 disabled:opacity-50"
                    )}
                    onClick={(e) => HandleCreateCheckout(e, priceId)}
                    disabled={!cardSelected || toolUrl === "" || loading}
                  >
                    {loading ? "Processing..." : "Next"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
