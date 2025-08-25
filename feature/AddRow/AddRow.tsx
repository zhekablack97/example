import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch";
import { addRow } from "@/shared/store/slice/table/tableSlice";
import { Plus } from "lucide-react";

export const AddRow = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch();
  return (
    <Button
      variant="outline"
      className=" plusRow w-full  z-10 cursor-pointer flex items-center justify-center"
      onClick={() => {
        dispatch(addRow({ tableId: id }));
      }}
    >
      <Plus />
    </Button>
  );
};
