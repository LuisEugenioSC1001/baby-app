import {
  Checkbox,
  CheckboxProps,
  SxProps,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Theme,
  useTheme,
} from "@mui/material";
import _, {
  find,
  get,
  isEmpty,
  isFunction,
  isNumber,
  isUndefined,
  map,
  merge,
  reduce,
} from "lodash";
import React, { useEffect, useMemo } from "react";
import { useExpanded, useRowSelect, useTable } from "react-table";

interface PropsTable {
  columns: any;
  data: any;
  stickyHeader?: boolean;
  sxHeader?: SxProps<Theme>;
  sxContainer?: any;
  footer?: boolean;
  foo?: boolean;
  hideColumn?: any;
  selector?: boolean;
  disableSelector?: boolean;
  selectableRow?: boolean;
  multiFoo?: boolean;
  print?: boolean;
  selectedAction?: React.Dispatch<React.SetStateAction<any>>;
  multiSelected?: React.Dispatch<React.SetStateAction<any>>;
  unSelected?: React.Dispatch<React.SetStateAction<any>>;
  renderRowSubComponent?: any;
  selectedDefatul?: { data: any; compareColumnId: string };
}

const IndeterminateCheckbox = React.forwardRef<
  HTMLButtonElement,
  CheckboxProps
>(({ indeterminate, ...rest }, ref) => {
  const defaultRef: any = React.useRef(null);
  const resolvedRef = ref || defaultRef;
  return (
    <>
      <Checkbox ref={resolvedRef} {...rest} />
    </>
  );
});
export default function TableCommon({
  columns,
  data,
  stickyHeader,
  sxContainer,
  sxHeader,
  footer,
  foo,
  hideColumn,
  selector = false,
  disableSelector = false,
  selectableRow,
  selectedAction,
  multiSelected,
  unSelected,
  selectedDefatul,
  renderRowSubComponent,
  print = false,
  multiFoo = false,
}: PropsTable) {
  // Use the state and functions returned from useTable to build your UI
  const defaultCheckList = useMemo(
    () =>
      reduce(
        data,
        (pre, curr, key) => {
          const inp = map(selectedDefatul?.data, (o) => {
            if (o[`${selectedDefatul?.compareColumnId}`] == curr.id) {
              return { [key]: true };
            }
          }).find((o) => !isEmpty(o));
          if (!isEmpty(inp)) return Object.assign(inp, pre);
          return pre;
        },
        {}
      ),
    [selectedDefatul?.data]
  );

  const {
    getTableProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    footerGroups,
    visibleColumns,
  }: any = useTable(
    {
      columns,
      data,
      initialState: {
        ...(selectedDefatul != null && { selectedRowIds: defaultCheckList }),
        ...(hideColumn != null && { hiddenColumns: hideColumn }),
      },
    },
    useExpanded,
    useRowSelect,
    (hooks: any) => {
      selector &&
        hooks.visibleColumns.push((columns: any) => [
          // Let's make a column for selection
          {
            id: "selection",
            // The header can use the table's getToggleAllRowsSelectedProps method
            // to render a checkbox
            Header: ({ getToggleAllRowsSelectedProps }: any) => (
              <div>
                <IndeterminateCheckbox
                  {...getToggleAllRowsSelectedProps()}
                  disabled={disableSelector}
                />
              </div>
            ),
            // The cell can use the individual row's getToggleRowSelectedProps method
            // to the render a checkbox
            Cell: ({ row }: any) => (
              <div>
                <IndeterminateCheckbox
                  {...row.getToggleRowSelectedProps()}
                  disabled={disableSelector}
                />
              </div>
            ),
          },
          ...columns,
        ]);
    }
  );
  useEffect(() => {
    if (isFunction(multiSelected)) {
      multiSelected(selectedFlatRows);
      if (!isFunction(unSelected)) return;
      const n = reduce(
        selectedDefatul?.data,
        (pre: any, curr: any) => {
          const inp = find(selectedFlatRows, (o: any) => {
            if (o.original.id == curr[`${selectedDefatul?.compareColumnId}`])
              return o;
          });

          if (isEmpty(inp)) return [...pre, curr];
          return [...pre];
        },
        []
      );
      unSelected(n);
    }
  }, [selectedFlatRows]);
  let total: any[] = [];
  let theme = useTheme().palette;
  if (!isEmpty(data) && footer) {
    let totalKeys = Object.keys(data[0]);
    totalKeys.map((t: any) => {
      let totals = _.sumBy(data, (d: any) => {
        let nValue = isNumber(d[t]);
        return nValue && !isNaN(d[t]) ? d[t] : "";
      });
      total.push({ key: t, value: totals });
    });
  }

  // Render the UI for your table
  return (
    <TableContainer sx={sxContainer || { minWidth: 200, maxHeight: 350 }}>
      <Table {...merge(getTableProps(), { stickyHeader })}>
        <TableHead>
          {headerGroups.map((headerGroup: any) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => (
                <TableCell
                  {...(sxHeader ? { sx: sxHeader } : {})}
                  {...column.getHeaderProps({
                    align: get(column, "align"),
                  } as any)}
                >
                  {column.render("Header")}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody className="center">
          {rows.map((row: any) => {
            prepareRow(row);
            return (
              <React.Fragment key={row.getRowProps().key}>
                <TableRow
                  {...row.getRowProps()}
                  sx={
                    selectableRow
                      ? {
                          backgroundPosition: "center",
                          transition: "background 0.8s",
                          ":hover": {
                            cursor: "pointer",
                            background:
                              "lightgray radial-gradient(circle, transparent 1%, lightgray 1%) center/15000%",
                          },
                          ":active": {
                            transition: "background 0s",
                            bgcolor: "white",
                            backgroundSize: "100%",
                          },
                        }
                      : {}
                  }
                  onClick={() => {
                    !isUndefined(selectedAction) &&
                      selectedAction(row.original);
                  }}
                >
                  {row.cells.map((cell: any) => {
                    return (
                      <TableCell
                        {...cell.getCellProps({
                          align: get(cell, "column.align"),
                        } as any)}
                        {...cell.getCellProps({
                          sx: get(cell, "column.sx"),
                        } as any)}
                      >
                        {cell.isAggregated
                          ? cell.render("Aggregated")
                          : cell.isPlaceholder
                          ? null
                          : cell.render("Cell")}
                      </TableCell>
                    );
                  })}
                </TableRow>

                {row.isExpanded ? (
                  <TableRow>
                    <TableCell colSpan={visibleColumns.length}>
                      {renderRowSubComponent({ row })}
                    </TableCell>
                  </TableRow>
                ) : null}
              </React.Fragment>
            );
          })}
          {multiFoo &&
            footerGroups.map((o: any, ind: any) => (
              <TableRow
                sx={{ backgroundColor: theme.primary.main }}
                {...o.getFooterGroupProps()}
              >
                {o.headers.map((column: any, index: any) => (
                  <TableCell
                    size="small"
                    className={"".concat(
                      index !== 0 &&
                        index !== o.headers.length - 1 &&
                        footerGroups.length - 1 === ind
                        ? "border-white border-x"
                        : ""
                    )}
                    sx={{ color: "white" }}
                    {...column.getFooterProps({
                      align: get(column, "align"),
                    } as any)}
                  >
                    {column.Footer ? column.render("Footer") : null}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          {foo && print && (
            <TableRow
              sx={{ backgroundColor: theme.primary.main }}
              {...footerGroups[0].getFooterGroupProps()}
            >
              {footerGroups[0].headers.map((column: any) => (
                <TableCell
                  size="small"
                  sx={{ color: "white" }}
                  {...column.getFooterProps({
                    align: get(column, "align"),
                  } as any)}
                >
                  {column.Footer ? column.render("Footer") : null}
                </TableCell>
              ))}
            </TableRow>
          )}
        </TableBody>
        {footer && !isEmpty(data) && (
          <TableFooter>
            <TableRow
              sx={{ backgroundColor: theme.primary.main }}
              {...rows[0].getRowProps()}
            >
              {rows[0].cells.map((cell: any, i: any) => {
                let similarColumn = total.find((t) => cell.column.id == t.key);
                if (similarColumn) {
                  return (
                    <TableCell
                      key={i}
                      sx={{ color: "white" }}
                      {...cell.getCellProps({
                        align: get(cell, "column.align"),
                      } as any)}
                    >
                      {similarColumn.value.toLocaleString()}
                    </TableCell>
                  );
                } else {
                  return (
                    <TableCell
                      key={i}
                      {...cell.getCellProps({
                        align: get(cell, "column.align"),
                      } as any)}
                    ></TableCell>
                  );
                }
              })}
            </TableRow>
          </TableFooter>
        )}
        {foo && !isEmpty(data) && !print && (
          <TableFooter>
            <TableRow
              sx={{ backgroundColor: theme.primary.main }}
              {...footerGroups[0].getFooterGroupProps()}
            >
              {footerGroups[0].headers.map((column: any) => (
                <TableCell
                  sx={{ color: "white" }}
                  {...column.getFooterProps({
                    align: get(column, "align"),
                  } as any)}
                >
                  {column.Footer ? column.render("Footer") : null}
                </TableCell>
              ))}
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </TableContainer>
  );
}
