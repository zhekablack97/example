import { useAppDispatch } from "@/shared/hooks/useAppDispatch";
import { editHeader } from "@/shared/store/slice/table/tableSlice";
import { EditableField } from "@/shared/ui";

export const EditHeaderField = ({
  idTable,
  index,
  value,
}: {
  idTable: string;
  index: number;
  value: string;
}) => {
  const dispatch = useAppDispatch();

  const handleSave = (newValue: string) => {
    dispatch(
      editHeader({
        tableId: idTable,
        headerIndex: index,
        newHeader: newValue,
      })
    );
  };

  return (
    <EditableField value={value} onSave={handleSave} className="w-inherit" />
  );
};
