import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch";
import { editCell } from "@/shared/store/slice/table/tableSlice";
import { useState } from "react";

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

  return isEdit ? (
    <Input value={valueCell} onChange={handleChange} onBlur={handleBlur} />
  ) : (
    <div onClick={() => setIsEdit(true)}>{valueCell}</div>
  );
};
