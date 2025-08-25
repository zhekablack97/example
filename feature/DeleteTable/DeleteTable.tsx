import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch";
import { deleteTable } from "@/shared/store/slice/table/tableSlice";
import { Trash, X } from "lucide-react";
import { useEffect, useState } from "react";

export const DeleteTable = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, [id]);

  return (
    isClient && (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="absolute -top-10 right-12 z-10">
            Delete Table
            <Trash />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This action will delete one of your
              tables.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-2">
            <Button
              variant="default"
              onClick={() => {
                dispatch(deleteTable(id));
                setOpen(false);
              }}
              className="flex items-center gap-2 flex-1"
            >
              Delete Table
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setOpen(false);
              }}
              className="flex items-center gap-2 flex-1"
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  );
};
