"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import React, { useEffect, useState } from "react";
import { RefreshCcw } from "lucide-react";
import { HeaderField } from "./HeaderField";
import { AddHeaderField } from "./AddHeaderField";
import { Separator } from "@/components/ui/separator";
import { nanoid } from "@reduxjs/toolkit";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch";
import { addTable } from "@/shared/store/slice/table/tableSlice";

const formSchema = z.object({
  headers: z.array(z.string()),
  addField: z.string().optional(),
});

export const AddTable = () => {
  const [open, setOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const dispatch = useAppDispatch();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "headers" as never,
  });

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (data) => {
    dispatch(
      addTable({
        id: `table-${nanoid()}`,
        nameColumns: data.headers,
        rows: Array.from({ length: 5 }, () => ({
          id: `row-${nanoid()}`,
          cells: data.headers.map(() => ({
            id: `cell-${nanoid()}`,
            value: "",
          })),
        })),
      })
    );
    setOpen(false);
    form.reset({
      headers: [],
      addField: "",
    });
  };

  const handleAddFieldChange = (value: string) => {
    if (value.trim() !== "") {
      append(value.trim());
      form.setValue("addField", "");
    }
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="px-3">
      {isClient && (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button>Create Table</Button>
          </PopoverTrigger>
          <PopoverContent
            className="p-4 w-full max-w-2xl"
            sideOffset={20}
            align="start"
          >
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4 relative "
              >
                <div className="relative mb-4">
                  <span className="text-lg font-bold">Create Table</span>
                  {fields.length > 0 && (
                    <Button
                      variant="ghost"
                      type="button"
                      onClick={() => {
                        form.setValue("headers", []);
                      }}
                      className=" cursor-pointer absolute top-0 right-0"
                    >
                      Clear Fields <RefreshCcw />
                    </Button>
                  )}
                </div>
                <span className="text-sm text-muted-foreground">Headers:</span>
                <div className="flex flex-col gap-4 ">
                  {fields.map((field, index) => (
                    <HeaderField
                      key={field.id}
                      control={form.control}
                      name={`headers.${index}`}
                      fieldId={field.id}
                      onRemove={() => remove(index)}
                      placeholder="Enter header"
                    />
                  ))}
                </div>
                {fields.length > 0 && <Separator className="my-4" />}
                <AddHeaderField
                  control={form.control}
                  handleAddFieldChange={handleAddFieldChange}
                  name="addField"
                  setIsDisabled={setIsDisabled}
                  placeholder="Enter header to add"
                  label="Enter header for new column"
                />

                {fields.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <Button
                      type="submit"
                      disabled={fields.length === 0 || isDisabled}
                    >
                      Create Table
                    </Button>
                  </div>
                )}
              </form>
            </Form>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};
