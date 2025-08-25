import { useAppDispatch } from "@/shared/hooks/useAppDispatch";
import { editCell } from "@/shared/store/slice/table/tableSlice";
import { EditableField } from "@/shared/ui";

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
  const dispatch = useAppDispatch();

  const handleSave = (newValue: string) => {
    dispatch(
      editCell({
        tableId: idTable,
        rowId: idRow,
        cellId: idCell,
        value: newValue,
      })
    );
  };

  return <EditableField value={value} onSave={handleSave} />;
};
