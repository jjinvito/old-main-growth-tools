import { useState, React } from "react";

import Image from "next/image";
import { cn } from "@/lib/utils";

import { LuPencil } from "react-icons/lu";
import { HiOutlineTrash } from "react-icons/hi2";
import { FaRegCircleCheck } from "react-icons/fa6";

const Deals = ({ fields, register, remove, errors, append, setValue }) => {
  const [editableStates, setEditableStates] = useState({});

  const toggleEditable = (index) => {
    setEditableStates((prevEditableStates) => ({
      ...prevEditableStates,
      [index]: !prevEditableStates[index],
    }));
  };

  const handleAddDeal = () => {
    append({
      title: "LifeTime 50% off",
      price: "$4.99",
      originalPrice: "$10",
      validity: "monthly",
      savings: "You save $5.01",
      link: "https://enterLinkHere/forAboveButton",
    });
  };

  const handleDealChange = (index, propName, value) => {
    setValue(`deals.${index}.${propName}`, value);
  };

  return (
    <div>
      <label
        className="block text-sm font-semibold mb-1 dark:text-white"
        htmlFor="deals"
      >
        Deals
      </label>

      <div className="flex sm:gap-10 gap-2 dark:bg-black sm:flex-row flex-col">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className={cn(
              "flex flex-col justify-start gap-1  h-[156px] w-[285px] p-5 border rounded-lg drop-shadow-xl bg-white relative dark:border-neutral-800 dark:bg-black",
              editableStates[index] ? "h-[180px]" : ""
            )}
          >
            <input
              className="font-bold outline-1 w-44 disabled:bg-transparent dark:text-white dark:border-neutral-700 dark:bg-transparent"
              defaultValue={field.title}
              disabled={!editableStates[index]}
              {...register(`deals.${index}.title`)}
              onChange={(event) =>
                handleDealChange(index, "title", event.target.value)
              }
            />

            <div className="flex">
              <input
                className="text-muted text-sm w-11 outline-1 disabled:bg-transparent dark:bg-transparent"
                defaultValue={field.price}
                disabled={!editableStates[index]}
                onChange={(event) =>
                  handleDealChange(index, "price", event.target.value)
                }
                {...register(`deals.${index}.price`)}
              />
              <input
                className="line-through text-dull w-8 outline-1 disabled:bg-transparent dark:bg-transparent"
                defaultValue={field.originalPrice}
                disabled={!editableStates[index]}
                onChange={(event) =>
                  handleDealChange(index, "originalPrice", event.target.value)
                }
                {...register(`deals.${index}.originalPrice`)}
              />
              <input
                className="text-muted text-sm w-16 outline-1 disabled:bg-transparent dark:bg-transparent"
                defaultValue={field.validity}
                disabled={!editableStates[index]}
                onChange={(event) =>
                  handleDealChange(index, "validity", event.target.value)
                }
                {...register(`deals.${index}.validity`)}
              />
            </div>

            <input
              className="font-medium text-acentGreen p-2 border rounded-lg w-[132px] disabled:bg-transparent dark:bg-transparent"
              defaultValue={field.savings}
              disabled={!editableStates[index]}
              onChange={(event) =>
                handleDealChange(index, "savings", event.target.value)
              }
              {...register(`deals.${index}.savings`)}
            />

            <a className="text-DBlue font-medium text-sm" href="#">
              Click to learn more
            </a>
            {editableStates[index] && (
              <input
                className="text-xs disabled:bg-transparent dark:bg-transparent dark:text-white"
                defaultValue={field.link}
                disabled={!editableStates[index]}
                {...register(`deals.${index}.link`)}
                onChange={(event) =>
                  handleDealChange(index, "link", event.target.value)
                }
              />
            )}

            <div className="flex absolute top-5 gap-2 right-3">
              <button type="button" onClick={() => toggleEditable(index)}>
                {editableStates[index] ? (
                  <FaRegCircleCheck className="text-DBlue" />
                ) : (
                  <LuPencil className="text-DBlue" />
                )}{" "}
              </button>
              <button
                type="button"
                className="h-[20px] w-[20px] text-red-500"
                onClick={() => remove(index)}
              >
                <HiOutlineTrash />
              </button>
            </div>
          </div>
        ))}

        {fields.length < 2 && (
          <div className="flex flex-col justify-center items-center h-[156px] w-[285px] p-5 border rounded-lg drop-shadow-xl bg-white gap-5 dark:border-neutral-800 dark:bg-black">
            <button type="button" onClick={handleAddDeal}>
              <Image
                src="/plusicon.png"
                width="48"
                height="48"
                className="cursor-pointer"
              />
            </button>
            <p className="text-DBlue font-medium">Create new</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Deals;
