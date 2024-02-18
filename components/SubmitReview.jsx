import Image from "next/image";
import { ImQuotesRight } from "react-icons/im";
// import img12 from "../public/blakey-de8191d8.jpeg"
export default function SubmitReview() {
  const reviewsData = [
    {
      id: 1,
      icon:<ImQuotesRight  size={25}/>,
      text: "Since day one, 1000.tools has been bringing traffic to TagParrot with a 4% conversion rate.",
      profile: '../public/blakey-de8191d8.jpeg',
      name: "John",
      desc: "john UK"
    },
    {
      id: 2,
      icon:<ImQuotesRight  size={25}/>,
      text: "My two AI apps made $75 shortly after submitting them to 1000.tools.",
      profile: '../public/daniel-78b0ba21.jpeg',
      name: "Daniel Nguyen",
      desc: "Founder BoltAI, PDFpals"
    },
    {
      id: 3,
      icon:<ImQuotesRight  size={25}/>,
      text: "1000.tools is the top source of quality traffic for LocalPortal.",
      profile: '../public/boatbuilder-54defd3b.jpeg',
      name: "BoatBuilder",
      desc: "Founder LocalPortal"
    },
    {
      id: 4,
      icon:<ImQuotesRight  size={25}/>,
      text: "1000.tools is the #3 traffic source after direct and Google for Papermark.",
      profile: '../public/luliia-52b96f3c.jpeg',
      name: "Iuliia Shnai",
      desc: "Founder Papermark"
    },
    {
      id: 5,
      icon:<ImQuotesRight  size={25}/>,
      text: "1000.tools is the top traffic source for yesRamen. I'll gladly keep paying as long as traffic keeps coming.",
      profile: '../public/gael-a935b6cb.jpeg',
      name: "Gaël",
      desc: "Founder yesRamen"
    },
    {
      id: 6,
      icon:<ImQuotesRight  size={25}/>,
      text: "Stunning product, lovely UX and clean UI.",
      profile: '../public/blakey-de8191d8.jpeg',
      name: "Michael Andreuzza",
      desc: "Founder Lexington Themes"
    }
    
  ];

  return (
    <>
      <div className="flex justify-center items-center ">
        <div className="w-full  bg-light-100 dark:bg-dark-500 rounded-xl">
          <div className="flex justify-center items-center h-full">
            <div className="flex flex-col justify-center items-center">
             
              <div className="text-light-500 font-medium text-[12px] mx-[30px] sm:mx-[80px] md:mx-[50] lg:mx-[100px]">
                {reviewsData.map((review) => (
                  <div key={review.id} className="p-4 border-light-200 dark:border-dark-600 mt-4">
                    <p className="text-gray-300 mb-2">{review.icon}</p>
                    <p className="text-[19px] text-gray-800">{review.text}</p>
                    <div className="flex items-center">
                      <Image
                      src="/blakey-de8191d8.jpeg"
                       width={50}
                       height={40}
                       className="rounded-full mr-3"/> 
                      <div>
                        <p className="text-black text-lg">{review.name}</p>
                        <p className="text-[14px]">{review.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
