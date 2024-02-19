// KeyFeaturesFieldArray.js
import { Input } from "@/components/ui/input";
import { GoTrash } from "react-icons/go";
import { useFieldArray } from "react-hook-form";

const KeyFeaturesFieldArray = ({
  fields,
  register,
  remove,
  errors,
  append,
}) => {
  return (
    <div>
      <label
        className={`block text-sm font-semibold mb-1 ${
          errors.keyFeatures ? "text-red-500" : ""
        }`}
        htmlFor="keyFeatures"
      >
        {errors.keyFeatures?.message || "Key Features"}
      </label>
      <div className="space-y-3">
        {fields.map((field, index) => (
          <div key={field.id} className="space-y-3">
            {index >= 3 ? (
              <>
                <div className="flex w-full relative">
                  <Input
                    {...register(`keyFeatures[${index}]`)}
                    defaultValue={field.value}
                    placeholder="e.g. Sed ut perspiciatis unde omnis iste natus"
                  />
                  <button
                    className="absolute right-8 top-5  font-bold text-sm border-s-indigo-500 text-black cursor-pointer"
                    type="button"
                    onClick={() => remove(index)}
                  >
                    <GoTrash />
                  </button>
                </div>
                {errors.keyFeatures?.[index] && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.keyFeatures[index].message}
                  </p>
                )}
              </>
            ) : (
              <div>
                <Input
                  key={field.id}
                  {...register(`keyFeatures[${index}]`)}
                  defaultValue={field.value}
                  placeholder="e.g. Sed ut perspiciatis unde omnis iste natus"
                />
                {errors.keyFeatures?.[index] && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.keyFeatures[index].message}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}

        {fields.length < 6 && (
          <button
            className="text-sm font-medium text-DBlue"
            type="button"
            onClick={() => append("")}
          >
            Add Key Features +
          </button>
        )}
        <p className="text-xs text-mutedField">maximum 15 words per each</p>
      </div>
    </div>
  );
};

export default KeyFeaturesFieldArray;
