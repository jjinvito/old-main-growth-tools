"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import INewsLetters from "@/components/single-tool-page-components/iNewsLetter/INewsLetters";
import Feature from "@/components/single-tool-page-components/features/Feature";
import AdsManagement from "@/components/single-tool-page-components/iNewsLetter/ads_managements/AdsManagement";
import Sidebar from "@/components/Sidebar";
import SingleToolPageSkeleton from "@/components/singleToolPageSkele";
import { fetchToolById } from "@/lib/redux/features/tools/singleToolSlice";
import Footer from "@/components/footer";

export default function ToolView({ params }) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchToolById(params.toolId))
      .then(() => setLoading(false)) // Update loading state after data fetching
      .catch((error) => {
        console.error("Error fetching tool data:", error);
        setLoading(false); // Update loading state even if there's an error
      });
  }, [dispatch, params.toolId]);

  return (
    <div className="flex lg:flex-row flex-col lg:items-start items-center w-full lg:h-screen gap-14 min-h-screen pt-6 overflow-y-auto clash-display lg:justify-center mt-12 lg:mt-16 xl:mt-0 max-[1300px]:gap-0 ">
      <div className="lg:sticky lg:top-16 xl:top-0 lg:left-0 lg:right-0 lg:bottom-0  ">
        <Sidebar showSidebar={false} className="min-h-screen" />
      </div>

      {loading ? (
        <SingleToolPageSkeleton />
      ) : (
        <div className="flex flex-col gap-28 overflow-x-hidden lg:w-screen">
          <div className="flex justify-center  w-[calc(100vw-215px)] gap-24 max-[1300px]:ml-10">
            {/* <div className="lg:w-[48%] sm:w-[85%] w-[95%]"> */}
            <div className="w-[680px]">
              <INewsLetters />
            </div>
            <div className="lg:sticky lg:top-16 xl:top-0 lg:left-0 lg:right-0 lg:bottom-0 w-[365px]">
              <div className="w-full min-h-full">
                <Feature />
              </div>
              <div className="block lg:hidden mt-4">
                <AdsManagement />
              </div>
            </div>
          </div>
          <Footer className=" w-[calc(100vw-267px)] ml-[-17px]" />
        </div>
      )}
    </div>
  );
}
