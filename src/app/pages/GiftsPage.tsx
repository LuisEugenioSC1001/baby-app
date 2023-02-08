import { useMutation, useQuery } from "@apollo/client";
import {
  Badge,
  Button,
  IconButton,
  MenuItem,
  TextField,
  Tooltip,
} from "@mui/material";
import { giftsListState, giftType } from "app/atoms/GiftAtoms";
import { FieldBase } from "components/Formik/fields/Field";
import { NumberFieldBase } from "components/Formik/fields/NumberField";
import Loader from "components/Loader";
import { updateGift, updateGuest } from "gql/Mutations";
import { giftsList } from "gql/Queries";
import { isEmpty, omit, sumBy } from "lodash";
import { useState } from "react";
import { BiHelpCircle } from "react-icons/bi";
import { MdAdd } from "react-icons/md";
import { TbGift } from "react-icons/tb";
import { Outlet, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import useNav from "utils/useNav";

const GiftsPage = () => {
  const { id } = useParams();
  const [ListState, setGiftsState] = useRecoilState(giftsListState);
  const [open, setOpen] = useState(false);
  const { data, loading, refetch } = useQuery(giftsList);
  const [gift, setGift] = useState<giftType>({});
  const [quantity, setQuantity] = useState<number>(0);
  const [updateGuestMutation] = useMutation(updateGuest);
  const [updateGiftMutation] = useMutation(updateGift);
  const navigate = useNav();

  if (loading) return <Loader />;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row justify-center items-center gap-2">
        <p className="text-center text-lg py-4">
          Sabemos que en ocasiones es dificil escoger un obsequio, por eso te
          hemos dejado una lista de las cosas que creemos serían un gran regalo.
        </p>
        <div>
          <Tooltip
            open={open}
            title={`
            Como añádir regalos a tu lista y guardarlos:
            1) Selecciona un regalo.
            2) Ingresa la cantidad a regalar.
            3) Presiona el simbolo de más para añadirlo a la lista.
            4) Finalmente presiona el botón de guardar regalos para confirmar tu lista de regalos.

            En el icono del regalo te mostrá el número de regalos, si lo presionas te mostrará más de talles de tus regalos seleccionados.
            `}
          >
            <IconButton onClick={() => setOpen(!open)}>
              <BiHelpCircle />
            </IconButton>
          </Tooltip>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="grid md:grid-cols-3 grid-cols-1 gap-2">
          <FieldBase
            type="string"
            value={JSON.stringify(gift ?? {})}
            onChange={(e) => setGift(JSON.parse(e ?? "{}"))}
            name="companion"
            label="Regalo"
            select
          >
            <MenuItem hidden disabled>
              Seleccione una opción
            </MenuItem>
            {data?.gifts
              ?.filter((o: any) => o?.quantity !== 0)
              ?.map((o: any) => (
                <MenuItem value={JSON.stringify(o)} key={o?.id}>
                  {o?.name}
                </MenuItem>
              ))}
          </FieldBase>
          <TextField
            value={gift?.quantity ?? ""}
            label="Cantidad que faltan"
            type="text"
            disabled
          />
          <NumberFieldBase
            name="quantity"
            label="Cantidad a regalar"
            onChange={(e) => setQuantity(e)}
            value={quantity}
            min={-1}
            max={gift?.quantity}
          />
        </div>
        <div className="flex flex-row gap-5 justify-center">
          <div className="flex flex-col items-center justify-center py-2">
            <Tooltip title="Añadir a la lista">
              <span>
                <IconButton
                  color="primary"
                  disabled={quantity === 0 || isEmpty(gift)}
                  onClick={() => {
                    if (!!ListState?.some((o) => o?.id === gift?.id)) {
                      toast.error("Este regalo ya está en la lista");
                    } else {
                      if (quantity !== 0 && !isEmpty(gift)) {
                        toast.success("Se ha añadido el regalo a la lista");
                        setGiftsState([
                          ...ListState,
                          { ...gift, quantityGift: quantity },
                        ]);
                        setGift({});
                        setQuantity(0);
                      }
                    }
                  }}
                >
                  <MdAdd />
                </IconButton>
              </span>
            </Tooltip>
          </div>
          <div className="flex flex-col items-center justify-center py-2">
            <Tooltip title="Lista de regalos">
              <IconButton onClick={() => navigate("list")}>
                <Badge
                  badgeContent={sumBy(ListState, "quantityGift") ?? 0}
                  color="primary"
                >
                  <TbGift />
                </Badge>
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-center gap-4 pt-10">
        <Button
          variant="contained"
          disabled={isEmpty(ListState)}
          onClick={() =>
            updateGuestMutation({
              variables: {
                id,
                data: {
                  gifts: JSON.stringify(
                    ListState?.map((o) => ({
                      ...omit(o, "quantityGift"),
                      quantity: o?.quantityGift,
                    }))
                  ),
                },
              },
              onCompleted: () => {
                Promise.all(
                  ListState?.map((o) =>
                    updateGiftMutation({
                      variables: {
                        id: o?.id,
                        data: {
                          quantity: (o?.quantity ?? 0) - (o?.quantityGift ?? 0),
                        },
                      },
                      onCompleted: () => {
                        refetch();
                        setGiftsState([]);
                        toast.success("Se ha guardado el listado de regalos");
                      },
                    })
                  )
                ).then(() => navigate("/thanks"));
              },
              onError: () =>
                toast.error(
                  "Ups... Algo ha salido mal al tratar de guardar los regalos"
                ),
            })
          }
        >
          Guardar regalos
        </Button>
        <Button variant="contained" onClick={() => navigate("/thanks")}>
          Continuar
        </Button>
      </div>
      <Outlet />
    </div>
  );
};
export default GiftsPage;
