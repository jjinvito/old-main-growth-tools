import INewsLetters from "@/components/single-tool-page-components/iNewsLetter/INewsLetters";
import Feature from "@/components/single-tool-page-components/features/Feature";

export default function Home() {
  return (
    <div className="flex lg:flex-row flex-col justify-center lg:items-start items-center  w-full h-screen p-2 gap-8 xl:gap-36 lg:gap-28 pt-6 overflow-y-auto customFont">
      <div className=" lg:w-[48%] sm:w-[85%] w-[95%]">
        <INewsLetters />
      </div>
      <div className=" lg:w-[25%] sm:w-[85%] w-[95%]">
        <Feature />
      </div>
    </div>
  );
}
