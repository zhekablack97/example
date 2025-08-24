import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch";
import { editCell } from "@/shared/store/slice/table/tableSlice";
import { useState, useRef, useEffect } from "react";

export const EditCell = ({
  value,
  idTable,
  idRow,
  idCell,
}: {
  value: string;
  idTable: string;
  idRow: string;
  idCell: string;
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [valueCell, setValueCell] = useState(value);
  const cellRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueCell(e.target.value);
  };

  const handleBlur = () => {
    setIsEdit(false);
    dispatch(
      editCell({
        tableId: idTable,
        rowId: idRow,
        cellId: idCell,
        value: valueCell,
      })
    );
  };

  // Обработчик клика вне элемента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cellRef.current && !cellRef.current.contains(event.target as Node)) {
        if (isEdit) {
          setIsEdit(false);
          dispatch(
            editCell({
              tableId: idTable,
              rowId: idRow,
              cellId: idCell,
              value: valueCell,
            })
          );
        }
      }
    };

    if (isEdit) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEdit, idTable, idRow, idCell, valueCell, dispatch]);

  return true ? (
    <Input
      value={valueCell}
      onChange={handleChange}
      onBlur={handleBlur}
      ref={cellRef as React.RefObject<HTMLInputElement>}
      className={cn(
        " h-full border-transparent rounded-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 px-2 border-2 focus-visible:border-gray-300 focus-visible:border-solid"
      )}
    />
  ) : (
    <div
      onClick={() => setIsEdit(true)}
      className="w-full h-full flex min-h-[20px] cursor-pointer hover:bg-gray-50"
    >
      {valueCell}
    </div>
  );
};
