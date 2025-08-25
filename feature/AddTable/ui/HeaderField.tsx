import React from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";

interface HeaderFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  fieldId: string;
  onRemove: () => void;
  placeholder?: string;
}

export const HeaderField = <T extends FieldValues>({
  control,
  name,
  fieldId,
  onRemove,
  placeholder = "Enter header",
}: HeaderFieldProps<T>) => {
  return (
    <div key={fieldId} className="flex gap-2 items-center">
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormControl>
              <Input placeholder={placeholder} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Button
        variant="ghost"
        type="button"
        onClick={onRemove}
        className="w-8 h-8 cursor-pointer"
      >
        <Trash2 />
      </Button>
    </div>
  );
};
