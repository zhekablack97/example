import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch";
import { copyTable } from "@/shared/store/slice/table/tableSlice";
import { Copy } from "lucide-react";

export const CopyTable = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch();

  return (
    <Button
      variant="outline"
      className="absolute -top-10 right-48 z-10"
      onClick={() => {
        dispatch(copyTable(id));
      }}
    >
      Copy
      <Copy />
    </Button>
  );
};
