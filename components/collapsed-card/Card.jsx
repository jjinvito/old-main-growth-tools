import React from "react";
import Image from "next/image";
import Link from "next/link";
export default function Card({ data }) {
  return (
    <Link href={"/tool/" + data.id} className="hover:opacity-90 transition">
      <div className=" inline-flex gap-[15px] border border-[#EAEAEA]  rounded-2xl w-fit p-2 shadow-lg customFont">
        <div className=" w-[48px] h-[48px] p-2 border border-[#F1F1F1] rounded-lg shadow-sm">
          <Image
            src={data?.logoUrl}
            width={32}
            height={32}
            alt="growth tools logo"
          />
        </div>

        <div className="flex flex-col gap-1">
          <h1 className="font-extrabold">{data?.name}</h1>
          <p className=" text-blance sm:w-[280px] w-[210px] text-[14px] text-greyColorMuted">
            {data?.description}
          </p>
          {data?.deals?.length > 0 && (
            <div className="inline-flex gap-3 items-center py-2">
              <div className=" w-[38px] h-[34px] flex justify-center items-center  border border-[#F1F1F1] rounded-lg">
                <Image src="/trendingIcon.png" width={17} height={13} />
              </div>
              <Image src="/deal.png" width={35} height={20} />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
