import { useSelector } from "react-redux";

import INewsLetters from "@/components/single-tool-page-components/iNewsLetter/INewsLetters";
import Feature from "@/components/single-tool-page-components/features/Feature";
import AdsManagement from "@/components/single-tool-page-components/iNewsLetter/ads_managements/AdsManagement";
import Sidebar from "@/components/Sidebar";

import SingleToolPageSkeleton from "@/components/component/singleToolPageSkele";

import { useEffect } from "react";

export default function ToolView() {
  const toolsDataStatus = useSelector((state) => state?.tool?.status);

  useEffect(() => {
    console.log("toolsDataStatus=", toolsDataStatus);
  });

  return (
    <div className="  flex lg:flex-row flex-col justify-center lg:items-start items-center w-full lg:h-screen min-h-screen p-2 gap-8 xl:gap-36 lg:gap-28 pt-6 overflow-y-auto customFont lg:justify-start">
      <div className=" lg:sticky lg:top-16 xl:top-0 lg:left-0 lg:right-0 lg:bottom-0  ">
        <Sidebar showSidebar={true} className="min-h-screen" />
      </div>
      {/* <Suspense fallback={<SingleToolPageSkeleton />}> */}

      <div className=" lg:w-[48%] sm:w-[85%] w-[95%] ">
        <INewsLetters />
      </div>
      <div className=" lg:sticky lg:top-16 xl:top-0 lg:left-0 lg:right-0 lg:bottom-0 lg:w-[25%] sm:w-[85%] w-[95%] ">
        <div className="min-h-screen ">
          <Feature />
        </div>
        <div className="block lg:hidden mt-4">
          <AdsManagement />
        </div>
      </div>
    </div>
  );
}
