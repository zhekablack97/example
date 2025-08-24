"use client";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { EditTable } from "../EditTable";

export const Tables = () => {
  const tables = useAppSelector((state) => state.table.tables);

  return (
    <div className="flex flex-wrap">
      {tables.map((table) => {
        return (
          <div className="max-w-full flex-1 min-w-1/3 p-4" key={table.id}>
            <EditTable id={table.id} />
          </div>
        );
      })}
    </div>
  );
};
