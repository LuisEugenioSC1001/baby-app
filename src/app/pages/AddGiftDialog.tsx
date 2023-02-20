import { useApolloClient, useMutation } from "@apollo/client";
import { giftsListState } from "app/atoms/GiftAtoms";
import GiftForm from "app/forms/GiftForm";
import DialogPage from "components/DialogPage";
import SubmitButton from "components/Formik/SubmitButton";
import { Form, Formik } from "formik";
import { createGift } from "gql/Mutations";
import { giftsList } from "gql/Queries";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import useGoBack from "utils/useGoBack";

const AddGiftDialog = () => {
  const client = useApolloClient();
  const back = useGoBack();
  const [ListState, setGiftsState] = useRecoilState(giftsListState);
  const [createGiftMutation] = useMutation(createGift);
  return (
    <DialogPage title="Añadir regalo a la lista">
      <div className="p-4">
        <Formik
          initialValues={{}}
          onSubmit={(values: any) =>
            createGiftMutation({
              variables: {
                data: { ...values, unit: values?.unit ?? "", quantity: 0 },
              },
              onCompleted: (res) => {
                setGiftsState([
                  ...ListState,
                  {
                    ...(res?.createGift ?? {}),
                    quantityGift: values?.quantity,
                  },
                ]);

                toast.success("Se ha añadido el regalo a la lista");
                back();
                client?.refetchQueries({ include: [giftsList] });
              },
              onError: () =>
                toast.error("Ups... Algo ha salido mal al añadir el regalo"),
            })
          }
        >
          <Form className="flex flex-col gap-2">
            <GiftForm />
            <SubmitButton />
          </Form>
        </Formik>
      </div>
    </DialogPage>
  );
};

export default AddGiftDialog;
