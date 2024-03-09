// formComponents/SelectField.js
import { Controller } from "react-hook-form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const SelectField = ({
  control,
  name,
  options,
  placeholder,
  setSelectedType,
}) => (
  <>
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select
          className="rounded-full border-2 p-4 drop-shadow-xl"
          value={field.value}
          onValueChange={(val) => {
            field.onChange(val);
            if (setSelectedType) setSelectedType(val);
          }}
          selected={field.value}
        >
          <SelectTrigger id={`${name}-trigger`}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent position="popper">
            {options.map((option) => (
              <SelectItem key={option.id} value={option.id}>
                {option.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    />
  </>
);

export default SelectField;
