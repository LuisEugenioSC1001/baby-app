import { useApolloClient, useMutation } from "@apollo/client";
import GiftForm from "app/forms/GiftForm";
import DialogPage from "components/DialogPage";
import SubmitButton from "components/Formik/SubmitButton";
import { Form, Formik } from "formik";
import { createGift } from "gql/Mutations";
import { giftsList } from "gql/Queries";
import { toast } from "react-toastify";
import useGoBack from "utils/useGoBack";

const AddGiftDialog = () => {
  const client = useApolloClient();
  const back = useGoBack();
  const [createGiftMutation] = useMutation(createGift);
  return (
    <DialogPage title="Añadir regalo a la lista">
      <div className="p-4">
        <Formik
          initialValues={{}}
          onSubmit={(values: any) =>
            createGiftMutation({
              variables: {
                data: { ...values, unit: values?.unit ?? "" },
              },
              onCompleted: () => {
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
