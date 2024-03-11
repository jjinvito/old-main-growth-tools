// InputField.js
import { Input } from "@/components/ui/input";

const InputField = ({ id, error, register, name, placeholder, action, toolsData }) => (
  <div>
    <label
      className={`block text-sm font-semibold mb-1 dark:text-white ${
        error && "text-red-500"
      }`}
      htmlFor={id}
    >
      {error ? error.message : placeholder}
    </label>
    <Input id={id} {...register(name)} placeholder={placeholder} className={action =="edit" && !toolsData ? "cursor-wait" : ""} />
  </div>
);

export default InputField;
