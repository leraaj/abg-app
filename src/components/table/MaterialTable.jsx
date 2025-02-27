import "./styles.css";
import {
  useMaterialReactTable,
  MaterialReactTable,
} from "material-react-table";
import { ThemeProvider, createTheme } from "@mui/material";

const CustomTable = ({
  columns,
  data,
  enableLoading,
  renderRowActions,
  renderTopToolbarCustomActions,
  enableColumnActions,
  enableHiding,
  enableDensityToggle,
  enableFullScreenToggle,
  pageSize,
}) => {
  const theme = createTheme({
    components: {
      MuiTable: {
        styleOverrides: {
          head: {
            boxShadow: "none !important",
            zIndex: "1000 !important",
          },
          root: {
            boxShadow: "none !important",
            zIndex: "1000 !important",
          },
        },
      },
      MuiTableHead: {
        styleOverrides: {
          head: {
            boxShadow: "none !important",
            zIndex: "1000 !important",
          },
          root: {
            boxShadow: "none !important",
            zIndex: "1000 !important",
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          head: {
            boxShadow: "none !important",
            zIndex: "1000 !important",
          },
          root: {
            boxShadow: "none !important",
            zIndex: "1000 !important",
          },
        },
      },
    },
  });

  const table = useMaterialReactTable({
    columns,
    data: data,
    initialState: {
      showColumnFilters: true,
      // showGlobalFilter: true,
      pagination: { pageSize: pageSize || 10 },
      enableColumnPinning: true,
      columnPinning: {
        right: ["mrt-row-actions"],
      },
    },
    state: {
      isLoading: enableLoading,
      showProgressBars: enableLoading,
    },
    muiLinearProgressProps: { color: "inherit" },
    muiSkeletonProps: { animation: "wave" },
    positionActionsColumn: "last",
    renderRowActions: renderRowActions,
    enableRowActions: true,
    enableFullScreenToggle: enableFullScreenToggle,
    enableDensityToggle: enableDensityToggle,
    enableHiding: enableHiding,
    enableColumnActions: enableColumnActions,
    renderTopToolbarCustomActions: renderTopToolbarCustomActions,
    enablePagination: true,
    enableStickyFooter: true,
    enableStickyHeader: true,
    muiTablePaperProps: ({ table }) => ({
      style: {
        zIndex: table.getState().isFullScreen ? 1001 : 1000,
      },
    }),
    muiTableContainerProps: ({ table }) => ({
      sx: {
        minHeight: table.getState().isFullScreen ? "350px" : "auto",
        height: table.getState().isFullScreen ? "auto" : " 100%",
      },
    }),
  });

  return (
    <ThemeProvider theme={theme}>
      <MaterialReactTable table={table} sx />
    </ThemeProvider>
  );
};

export default CustomTable;
