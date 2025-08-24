"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import React, { useEffect, useState } from "react";
import { Plus, RefreshCcw, Trash2 } from "lucide-react";
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const dispatch = useAppDispatch();

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "headers" as never,
  });

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (data) => {
    console.log({
      id: `table-${nanoid()}`,
      nameColumns: data.headers,
      rows: Array.from({ length: 5 }, () => ({
        id: `row-${nanoid()}`,
        cells: data.headers.map(() => ({
          id: `cell-${nanoid()}`,
          value: "",
        })),
      })),
    });
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

  // Функции для дополнительного инпута
  const handleAddFieldChange = (value: string) => {
    // Если поле не пустое, добавляем новое поле и очищаем инпут
    if (value.trim() !== "") {
      append(value.trim());
      // Очищаем значение в дополнительном инпуте
      form.setValue("addField", "");
    }
  };

  const handleAddFieldBlur = (value: string) => {
    handleAddFieldChange(value);
  };

  const handleAddFieldKeyDown = (value: string, e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddFieldChange(value);
      setIsDisabled(false);
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
                  <span className="text-lg font-bold">Создание таблицы</span>
                  {fields.length > 0 && (
                    <Button
                      variant="ghost"
                      type="button"
                      onClick={() => {
                        form.setValue("headers", []);
                      }}
                      className=" cursor-pointer absolute top-0 right-0"
                    >
                      Очистить поля <RefreshCcw />
                    </Button>
                  )}
                </div>
                <span className="text-sm text-muted-foreground">
                  Заголовки:
                </span>
                <div className="flex flex-col gap-4 ">
                  {fields.map((field, index) => (
                    <div key={field.id} className="flex gap-2 items-center">
                      <FormField
                        control={form.control}
                        name={`headers.${index}`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input
                                placeholder="Введите заголовок"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        variant="ghost"
                        type="button"
                        onClick={() => remove(index)}
                        className="w-8 h-8 cursor-pointer"
                      >
                        <Trash2 />
                      </Button>
                    </div>
                  ))}
                </div>
                {fields.length > 0 && <Separator className="my-4" />}
                <FormField
                  control={form.control}
                  name="addField"
                  render={({ field }) => (
                    <FormItem className="flex   gap-2">
                      <FormLabel>Введите заголовок для новой колонки</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Введите заголовок для добавления"
                          {...field}
                          onFocus={(e) => {
                            setIsDisabled(false);
                          }}
                          onChange={(e) => {
                            field.onChange(e);
                            setIsDisabled(true);
                          }}
                          onBlur={(e) => {
                            field.onBlur();
                            handleAddFieldBlur(
                              (e.target as HTMLInputElement).value
                            );
                            setIsDisabled(false);
                          }}
                          onKeyDown={(e) =>
                            handleAddFieldKeyDown(
                              (e.target as HTMLInputElement).value,
                              e
                            )
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

                {fields.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <Button
                      type="submit"
                      disabled={fields.length === 0 || isDisabled}
                    >
                      Создать таблицу
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
