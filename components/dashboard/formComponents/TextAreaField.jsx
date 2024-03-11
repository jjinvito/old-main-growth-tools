// TextAreaField.js
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const TextAreaField = ({
  name,
  id,
  error,
  register,
  placeholder,
  className,
  action,
  toolsData,
}) => (
  <div>
    <label
      className={`block text-sm font-semibold mb-1 dark:text-white ${
        error && "text-red-500"
      }`}
      htmlFor={id}
    >
      {error ? error.message : placeholder}
    </label>
    <Textarea
      {...register(name)}
      id={id}
      placeholder={placeholder}
      className={cn(
        "drop-shadow-xl rounded-xl h-[150px] resize-none",
        action == "edit" && !toolsData ? "cursor-wait" : "",
        className
      )}
    />
  </div>
);

export default TextAreaField;
