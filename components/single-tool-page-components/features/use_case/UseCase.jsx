import React from "react";
import { FaStar } from "react-icons/fa6";
export default function () {
  const cases = [
    {
      id: 1,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Constur impedit prium ipsum. Delectus quia ea facere assumen .",
    },
    {
      id: 2,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Constur impedit pntium ipsum. Delectus quia ea facere assumenda corporis saepe quos doloremque eos nemo .",
    },
    {
      id: 3,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Conetur impedit ntium ipsum. Delectus quia ea facere assumenda corporis nemo adipisicing elit. Conetur impedit.",
    },
  ];
  console.log(cases);
  return (
    <div className="flex flex-col gap-4">
      <h1 className=" font-bold text-xl">Use Case</h1>
      {cases.map((data, index) => {
        return (
          <div className=" inline-flex gap-4" key={index}>
            <div>
              <FaStar size={30} className=" text-specialOrange2" />
            </div>
            <p>{data.description}</p>
          </div>
        );
      })}
    </div>
  );
}
