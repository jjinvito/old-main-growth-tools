// UseCasesFieldArray.js
import { Input } from "@/components/ui/input";
import { GoTrash } from "react-icons/go";
import { cn } from "@/lib/utils";

const UseCasesFieldArray = ({ fields, register, remove, append, errors }) => (
  <div>
    <label
      className={cn(
        "block text-sm font-semibold mb-1 ",
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
          onClick={() => append("")} // Ensure you are appending an object with a unique id and value.
        >
          Add Use Cases +
        </button>
      )}
      <p className="text-xs text-mutedField">maximum 25 words per each</p>
    </div>
  </div>
);

export default UseCasesFieldArray;
