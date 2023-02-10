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
import { FaSave } from "react-icons/fa";
import { MdQrCode2 } from "react-icons/md";
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
    <div className="flex flex-col md:h-[70vh] h-[90vh] justify-between py-2">
      <div className="flex flex-row  justify-between">
        <Tooltip title="Nequi">
          <IconButton onClick={() => navigate("qr-code")}>
            <MdQrCode2 />
          </IconButton>
        </Tooltip>
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
      <div>
        <div className="flex flex-row justify-center items-center gap-2">
          <p className="text-center md:text-lg text-sm py-4">
            Sabemos que en ocasiones es dificil escoger un obsequio, por eso te
            hemos dejado una lista de las cosas que creemos serían un gran
            regalo.
          </p>
        </div>
        {/* <p>
        Si deseas un regalo en efectivo en la esquina inferior derecha tienes un
        QR para que te sea más fácil hacerlo.
      </p> */}
        <div className="flex flex-col">
          <div className="flex md:flex-row gap-2 flex-col ">
            <FieldBase
              type="string"
              value={JSON.stringify(gift ?? {})}
              onChange={(e) => setGift(JSON.parse(e ?? "{}"))}
              name="companion"
              fullWidth
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
              label={`${
                (gift?.unit ?? "Otro") === "Otro" ? "Cantidad" : gift?.unit
              } que faltan`}
              type="text"
              fullWidth
              disabled
            />
            <NumberFieldBase
              name="quantity"
              label={`${
                (gift?.unit ?? "Otro") === "Otro" ? "Cantidad" : gift?.unit
              } a obsequiar`}
              onChange={(e) => setQuantity(e)}
              value={quantity}
              fullWidth
              min={-1}
              max={gift?.quantity}
            />
            <div className="flex flex-col items-center justify-center py-2">
              <Tooltip title="Guardar regalo">
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
                    <FaSave />
                  </IconButton>
                </span>
              </Tooltip>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center pt-2">
          <p className="self-center md:text-lg text-sm text-center">
            ¿No encuentras el regalo que te gustaría dar? Añadelo a la lista con
            el siguiente botón.
          </p>
          <div className="flex flex-row justify-center pt-2">
            <Button variant="outlined" onClick={() => navigate("create-gift")}>
              Añadir regalo a la lista
            </Button>
          </div>
          <p className="text-center pt-4 text-sm">
            (En la esquina superior izquierda hay un botón por si prefieres
            obsequiar dinero)
          </p>
        </div>
      </div>
      <div className="flex flex-row justify-center gap-4 pt-10">
        {/* <Button
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
        </Button> */}
        <Button
          variant="contained"
          onClick={() => {
            if (!isEmpty(ListState)) {
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
                            quantity:
                              (o?.quantity ?? 0) - (o?.quantityGift ?? 0),
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
              });
            } else {
              navigate("/thanks");
            }
          }}
        >
          Continuar
        </Button>
      </div>
      <Outlet />
    </div>
  );
};
export default GiftsPage;
