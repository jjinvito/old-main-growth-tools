import { useState } from "react";
import Modal from "./Modal";
import { SubscribeNewsletter } from "../actions/subscribeNewsletter";

export default function Hero() {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();

    const successMessage = document.getElementById("successMessage");
    const errorMessage = document.getElementById("errorMessage");

    const result = await SubscribeNewsletter(email);

    if (result === "success") {
      successMessage.style.display = "block";
      errorMessage.style.display = "none";

      setEmail("");

      setTimeout(() => {
        successMessage.style.display = "none";
      }, 7000);
    } else {
      successMessage.style.display = "none";
      errorMessage.style.display = "block";

      setTimeout(() => {
        errorMessage.style.display = "none";
      }, 7000);
    }

  };

  return (
    <div className="flex flex-col sm:flex-col md:flex-col lg:flex-row gap-10 justify-between items-center mt-[100px] sm:mt-[100px] xl:mt-[50px] mb-10 px-5 xl:px-8">
      <div className="px-0 sm:px-2 md:px-10 max-w-auto xl:max-w-[500px] w-full">
        <h1 className="text-[45px] font-bold leading-[1] mb-3 capitalize text-transparent bg-clip-text bg-gradient-to-r from-[#707070] to-black dark:to-dark-300 dark:from-white">
          All the best SaaS resources in one place
        </h1>

        <p className="text-[18px] font-light text-[#8a8a8a]">
          UI resources that will boost your creative workflow and save you time
          and money.
        </p>
        <div className="flex items-center mt-3">
          {/* subscribe modal opener */}
          <button
            className="py-2 text-sm bg-white border border-1 border-[#e3e3e3] text-black hover:bg-light-100 transition-all duration-300 px-5 rounded-full"
            onClick={() => setShowModal(true)}
          >
            Subscribe
          </button>

          {/* subscribe modal */}
          <Modal
            showModal={showModal}
            setShowModal={setShowModal}
            className="px-10 py-5"
          >
            <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#8f8f8f] to-black text-center mt-5 mb-2">
              Get Your Daily Dose of News with a Dash of Humor
            </h1>

            <form className="mt-4 relative">
              <input
                type="email"
                placeholder="Email"
                className="w-[100%] px-4 py-4 border border-1 rounded-full focus:outline-light-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                className="px-2 py-2 rounded-full absolute right-2 top-[50%] translate-y-[-50%]"
                onClick={(e) => handleSubscribe(e)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                  />
                </svg>
              </button>
            </form>
            <p className="text-green-700 text-center pt-4 hidden" id="successMessage">
              Thankyou for subscribing to our News Letter
            </p>
            <p className="text-red-700 text-center pt-4 hidden" id="errorMessage">
              Something Went Wrong! :(
            </p>
            <p className="py-5 text-sm text-dark-200 text-center">
              Join over 4 million people who kickstart their day with
              CopyUI&apos;s daily newsletter - delivering the latest headlines
              worldwide with a touch of humor, all for free.
            </p>
          </Modal>
        </div>
      </div>

      {/* 🔔 remove the backgroundImage if you want to display a video */}
      {/* 🔔 and remove the video element if you want to display an image */}
      <div className="w-full rounded-xl max-w-auto xl:max-w-[650px]">
        <a href="/view/Chenzoku" className="hover:opacity-90 transition">
          <div
            style={{
              backgroundImage: "url('')",
            }}
            className="relative w-full rounded-xl h-[250px] lg:h-[400px] bg-cover bg-no-repeat bg-center border-[1px] border-light-100 border-solid transition duration-20"
            alt=""
          >
            <video
              className="ease block w-full h-full object-cover rounded-xl transition duration-200"
              playsInline=""
              autoPlay={true}
              loop={true}
              muted={true}
              src="https://video.godly.website/video/upload/w_720/q_70/godly/recordings/xi9ghp5bygni2u8vikzo.webm"
            />
          </div>
        </a>

        <div className="flex justify-between items-center mt-2">
          <a href="">
            <h2 className="text-dark-300 hover:text-dark-500  dark:text-white dark:hover:text-dark-100 transition duration-200">
              ChainZoku
            </h2>
          </a>
          <div className="flex justify-end gap-2 font-normal">
            <a href="">
              <button className="flex flex-1 justify-end items-center text-dark-300 hover:text-dark-500  dark:text-white dark:hover:text-dark-100 transition duration-200 text-[16px] gap-1 cursor-pointer hover:opacity-75">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-[20px]"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.25 3.75H19.5a.75.75 0 01.75.75v11.25a.75.75 0 01-1.5 0V6.31L5.03 20.03a.75.75 0 01-1.06-1.06L17.69 5.25H8.25a.75.75 0 010-1.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
