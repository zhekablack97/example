import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch";
import { addColl } from "@/shared/store/slice/table/tableSlice";
import { Plus } from "lucide-react";
import { useState } from "react";

export const AddColl = ({ id }: { id: string }) => {
  const [open, setOpen] = useState(false);
  const [header, setHeader] = useState("");
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeader(e.target.value);
  };

  const addColumn = () => {
    if (header.trim()) {
      dispatch(addColl({ tableId: id, header }));
      setOpen(false);
      setHeader("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addColumn();
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="absolute bottom-10 right-0 h-[calc(100%-80px)] plusColl  z-10 cursor-pointer flex items-center justify-center"
        >
          <Plus />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="p-4 w-full max-w-2xl"
        sideOffset={20}
        align="end"
      >
        <div className="flex gap-2 flex-col">
          <Input
            placeholder="Enter header"
            value={header}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />

          <Button onClick={addColumn}>Add Column</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
