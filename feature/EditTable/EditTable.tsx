import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { addRow, copyTable } from "@/shared/store/slice/table/tableSlice";
import { Copy, Plus } from "lucide-react";
import { AddColl } from "../AddColl";
import { EditCell } from "../EditCell";

export const EditTable = ({ id }: { id: string }) => {
  const table = useAppSelector((state) =>
    state.table.tables.find((table) => table.id === id)
  );
  const dispatch = useAppDispatch();

  return (
    <div className="w-full relative pr-12 wrapperTable">
      <Button
        variant="outline"
        className="absolute -top-10 right-12 z-10"
        onClick={() => {
          dispatch(copyTable(id));
        }}
      >
        Копировать
        <Copy />
      </Button>
      <Table className="w-full mb-2">
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            {table?.nameColumns.map((column) => (
              <TableHead key={column}>{column}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {table?.rows.map((row) => (
            <TableRow key={row.id}>
              {row.cells.map((cell) => (
                <TableCell key={cell.id}>
                  <EditCell
                    value={cell.value}
                    idTable={id}
                    idRow={row.id}
                    idCell={cell.id}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <AddColl id={id} />
      <Button
        variant="outline"
        className=" plusRow w-full  z-10 cursor-pointer flex items-center justify-center"
        onClick={() => {
          dispatch(addRow({ tableId: id }));
        }}
      >
        <Plus />
      </Button>
    </div>
  );
};
