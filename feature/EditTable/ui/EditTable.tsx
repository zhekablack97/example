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
import { AddColl } from "../../AddColl";
import { EditHeaderField } from "./EditHeaderField";
import { EditCell } from "./EditCell";
import { AddRow } from "@/feature/AddRow";
import { CopyTable } from "@/feature/CopyTable";
import { DeleteTable } from "@/feature/DeleteTable";

export const EditTable = ({ id }: { id: string }) => {
  const table = useAppSelector((state) =>
    state.table.tables.find((table) => table.id === id)
  );

  return (
    <div className="w-full relative pr-12 wrapperTable">
      <CopyTable id={id} />
      <DeleteTable id={id} />
      <Table className="w-full mb-2">
        <TableHeader>
          <TableRow>
            {table?.nameColumns.map((column, index) => (
              <>
                <TableHead key={column} className="p-0">
                  <EditHeaderField idTable={id} index={index} value={column} />
                </TableHead>
              </>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {table?.rows.map((row) => (
            <TableRow key={row.id}>
              {row.cells.map((cell) => (
                <TableCell key={cell.id} className="p-0">
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
      <AddRow id={id} />
    </div>
  );
};
