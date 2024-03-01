import INewsLetters from "@/components/single-tool-page-components/iNewsLetter/INewsLetters";
import Feature from "@/components/single-tool-page-components/features/Feature";
import AdsManagement from "@/components/single-tool-page-components/iNewsLetter/ads_managements/AdsManagement";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  return (
    <div className="flex lg:flex-row flex-col justify-center lg:items-start items-center  w-full h-screen p-2 gap-8 xl:gap-36 lg:gap-28 pt-6 overflow-y-auto customFont">
      <Sidebar showSidebar={true} className="h-screen" />
      <div className=" lg:w-[48%] sm:w-[85%] w-[95%]">
        <INewsLetters />
      </div>
      <div className=" lg:w-[25%] sm:w-[85%] w-[95%]">
        <div className="h-screen ">
          <Feature />
        </div>
        <div className="block lg:hidden mt-4">
          <AdsManagement />
        </div>
      </div>
    </div>
  );
}
