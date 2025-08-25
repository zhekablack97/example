import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";

interface EditableFieldProps {
  value: string;
  onSave: (value: string) => void;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
}

export const EditableField = ({
  value,
  onSave,
  className,
  placeholder,
  disabled = false,
}: EditableFieldProps) => {
  const [fieldValue, setFieldValue] = useState(value);
  const fieldRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(e.target.value);
  };

  const handleSave = useCallback(() => {
    if (fieldValue !== value && fieldValue.trim() !== "") {
      onSave(fieldValue);
    }
  }, [fieldValue, value, onSave]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSave();
      fieldRef.current?.blur();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        fieldRef.current &&
        !fieldRef.current.contains(event.target as Node)
      ) {
        handleSave();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleSave]);

  return (
    <Input
      value={fieldValue}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      ref={fieldRef}
      placeholder={placeholder}
      disabled={disabled}
      className={cn(
        "h-full border-transparent rounded-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 px-2 border-2 focus-visible:border-gray-300 focus-visible:border-solid",
        className
      )}
    />
  );
};
