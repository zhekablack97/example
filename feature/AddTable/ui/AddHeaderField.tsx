import React from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

interface AddHeaderFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  placeholder?: string;
  label?: string;
  setIsDisabled: (value: boolean) => void;
  handleAddFieldChange: (value: string) => void;
}

export const AddHeaderField = <T extends FieldValues>({
  control,
  name,
  setIsDisabled,
  placeholder = "Enter header to add",
  label = "Enter header for new column",
  handleAddFieldChange,
}: AddHeaderFieldProps<T>) => {
  const handleAddFieldBlur = (value: string) => {
    handleAddFieldChange(value);
    setIsDisabled(false);
  };

  const handleAddFieldKeyDown = (value: string, e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddFieldChange(value);
      setIsDisabled(false);
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex gap-2">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              onFocus={() => {
                setIsDisabled(false);
              }}
              onChange={(e) => {
                field.onChange(e);
                setIsDisabled(true);
              }}
              onBlur={(e) => {
                field.onBlur();
                handleAddFieldBlur((e.target as HTMLInputElement).value);
              }}
              onKeyDown={(e) =>
                handleAddFieldKeyDown((e.target as HTMLInputElement).value, e)
              }
            />
          </FormControl>
          <FormMessage />
          <Button
            variant="ghost"
            type="button"
            onClick={() => {
              setIsDisabled(false);
            }}
          >
            <Plus />
          </Button>
        </FormItem>
      )}
    />
  );
};
