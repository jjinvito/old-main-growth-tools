// InputField.js
import { Input } from "@/components/ui/input";

const InputField = ({ id, error, register, name, placeholder }) => (
  <div>
    <label className={`block text-sm font-semibold mb-1 ${error && "text-red-500"}`} htmlFor={id}>
      {error ? error.message : placeholder}
    </label>
    <Input id={id} {...register(name)} placeholder={placeholder} />
  </div>
);

export default InputField;
