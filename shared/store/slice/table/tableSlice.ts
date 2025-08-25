import { createSlice, nanoid } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/shared/store";

interface Table {
  id: string;
  rows: {
    id: string;
    cells: {
      id: string;
      value: string;
    }[];
  }[];
  nameColumns: string[];
}

interface TableState {
  tables: Table[];
}

const initialState: TableState = {
  tables: [],
};

export const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    addTable: (state, action: PayloadAction<Table>) => {
      state.tables.push(action.payload);
    },
    copyTable: (state, action: PayloadAction<string>) => {
      const table = state.tables.find((table) => table.id === action.payload);
      if (table) {
        const currentIndex = state.tables.findIndex(
          (table) => table.id === action.payload
        );
        const copiedTable = { ...table, id: nanoid() };

        state.tables.splice(currentIndex + 1, 0, copiedTable);
      }
    },
    addRow: (state, action: PayloadAction<{ tableId: string }>) => {
      const { tableId } = action.payload;
      const table = state.tables.find((table) => table.id === tableId);

      if (table) {
        const countCells = table.nameColumns.length;

        table.rows.push({
          id: nanoid(),
          cells: Array.from({ length: countCells }, () => ({
            id: nanoid(),
            value: "",
          })),
        });
      }
    },
    addColl: (
      state,
      action: PayloadAction<{ tableId: string; header: string }>
    ) => {
      const { tableId, header } = action.payload;
      const table = state.tables.find((table) => table.id === tableId);

      if (table) {
        table.nameColumns.push(header);

        table.rows.forEach((row) => {
          row.cells.push({
            id: nanoid(),
            value: "",
          });
        });
      }
    },

    editCell: (
      state,
      action: PayloadAction<{
        tableId: string;
        rowId: string;
        cellId: string;
        value: string;
      }>
    ) => {
      const { tableId, rowId, cellId, value } = action.payload;
      const table = state.tables.find((table) => table.id === tableId);
      if (table) {
        const row = table.rows.find((row) => row.id === rowId);
        if (row) {
          const cell = row.cells.find((cell) => cell.id === cellId);
          if (cell) {
            cell.value = value;
          }
        }
      }
    },
    editHeader: (
      state,
      action: PayloadAction<{
        tableId: string;
        headerIndex: number;
        newHeader: string;
      }>
    ) => {
      const { tableId, headerIndex, newHeader } = action.payload;
      const table = state.tables.find((table) => table.id === tableId);
      if (table) {
        table.nameColumns[headerIndex] = newHeader;
      }
    },
    deleteTable: (state, action: PayloadAction<string>) => {
      state.tables = state.tables.filter(
        (table) => table.id !== action.payload
      );
    },
  },
});

export const {
  addTable,
  copyTable,
  addRow,
  addColl,
  editCell,
  editHeader,
  deleteTable,
} = tableSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectTables = (state: RootState) => state.table;

export default tableSlice.reducer;
