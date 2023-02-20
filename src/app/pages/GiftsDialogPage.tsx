import { IconButton, Tooltip } from "@mui/material";
import { giftsListState } from "app/atoms/GiftAtoms";
import DialogPage from "components/DialogPage";
import TableCommon from "components/Table";
import { isEmpty } from "lodash";
import { useMemo } from "react";
import { MdDelete } from "react-icons/md";
import { Column } from "react-table";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import useIsMobile from "utils/isMobile";
import useGoBack from "utils/useGoBack";

const GiftsDialogPage = () => {
  const back = useGoBack();
  const isMobile = useIsMobile();
  const [GiftsState, setGifts] = useRecoilState(giftsListState);
  const columns = useMemo<Column[]>(
    () => [
      {
        Header: "Regalo",
        accessor: "name",
        align: "center",
      },
      {
        Header: "Unidad",
        accessor: "unit",
        align: "center",
      },
      {
        Header: "Cantidad",
        accessor: "quantityGift",
        align: "center",
      },
      {
        id: "actions",
        Cell: ({ row: { original } }: any) => (
          <div className="flex flex-row justify-center items-center">
            <Tooltip title="Eliminar regalo">
              <IconButton
                color="error"
                onClick={() => {
                  setGifts(GiftsState?.filter((e) => e?.id !== original["id"]));
                  toast.success("Se ha eliminado el regalo satisfactoriamente");
                }}
              >
                <MdDelete />
              </IconButton>
            </Tooltip>
          </div>
        ),
      },
    ],
    []
  );
  return (
    <DialogPage title="Lista de regalos" fullScreen={isMobile}>
      <div className="px-5">
        {isEmpty(GiftsState) ? (
          <div className="h-[50vh] flex flex-row justify-center items-center">
            <p>No has añadido ningún regalo a la lista.</p>
          </div>
        ) : (
          <TableCommon
            data={GiftsState ?? []}
            columns={columns}
            sxHeader={{
              bgcolor: "#fc466b",
              color: "white",
              fontWeight: "bold",
            }}
            stickyHeader
            sxContainer={{ height: "80vh" }}
          />
        )}
      </div>
    </DialogPage>
  );
};

export default GiftsDialogPage;
