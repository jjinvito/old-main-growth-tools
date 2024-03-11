// UseCasesFieldArray.js
import { Input } from "@/components/ui/input";
import { GoTrash } from "react-icons/go";
import { cn } from "@/lib/utils";
import { toast } from "react-toastify";

const UseCasesFieldArray = ({
  fields,
  register,
  remove,
  append,
  errors,
  watch,
}) => {
  const useCasesValues = watch("useCases");
  const handleAppend = () => {
    const lastItemValue = useCasesValues[useCasesValues.length - 1];

    if (lastItemValue !== "") {
      append("");
    } else {
      toast.info("Please fill in the last Use Case before adding a new one!");
    }
  };
  return (
    <div>
      <label
        className={cn(
          "block text-sm font-semibold mb-1 dark:text-white ",
          errors.useCases && "text-red-500"
        )}
        htmlFor="useCases"
      >
        {errors?.useCases?.message ? errors.useCases.message : "Use Cases"}
      </label>
      <div className="space-y-3">
        {fields.map((field, index) => (
          <div key={field.id} className="space-y-3">
            {index >= 1 ? (
              <>
                <div className="flex w-full relative">
                  <Input
                    {...register(`useCases[${index}]`)}
                    defaultValue={field.value}
                    placeholder="e.g. Sed ut perspiciatis unde omnis iste natus"
                  />

                  <button
                    className="absolute right-8 top-5 font-bold text-sm border-s-indigo-500 text-black cursor-pointer"
                    type="button"
                    onClick={() => remove(index)}
                  >
                    <GoTrash />
                  </button>
                </div>
                {errors.useCases?.[index] && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.useCases[index].message}
                  </p>
                )}
              </>
            ) : (
              <>
                <Input
                  {...register(`useCases[${index}]`)}
                  defaultValue={field.value}
                  placeholder="e.g. Sed ut perspiciatis unde omnis iste natus"
                />
                {errors.useCases?.[index] && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.useCases[index].message}
                  </p>
                )}
              </>
            )}
          </div>
        ))}

        {fields.length < 3 && (
          <button
            className="text-sm font-medium text-DBlue"
            type="button"
            onClick={handleAppend}
          >
            Add Use Cases +
          </button>
        )}
        <p className="text-xs text-mutedField">maximum 25 words per each</p>
      </div>
    </div>
  );
};

export default UseCasesFieldArray;
