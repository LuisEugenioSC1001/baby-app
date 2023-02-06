import { useMutation } from "@apollo/client";
import SubmitButton from "components/Formik/SubmitButton";
import { Form, Formik } from "formik";
import { createGuest } from "gql/Mutations";
import { lowerCase, omit, startCase } from "lodash";
import { toast } from "react-toastify";
import useNav from "utils/useNav";
import AttendanceForm from "../forms/AttendanceForm";

const AttendancePage = () => {
  const navigate = useNav();
  const [createGuestMutation] = useMutation(createGuest);
  return (
    <div className=" h-full">
      <p className="font-title text-5xl font-bold text-center">
        Formulario de asistencia
      </p>
      <Formik
        initialValues={{ companion: 0 }}
        onSubmit={(values: any) =>
          createGuestMutation({
            variables: {
              data: {
                ...omit(values, ["surname", "name"]),
                phone: `${values?.phone}`,
                name:
                  startCase(lowerCase(values?.name ?? "").trim()) +
                  " " +
                  startCase(lowerCase(values?.surname ?? "").trim()),
                attend: true,
              },
            },
            onCompleted: (res) => {
              toast.success("Se han guardado los datos correctamente");
              navigate(`/gifts/${res?.createGuest?.id}`);
            },
            onError: () => toast.error("Ups... Algo ha salido mal al guardar"),
          })
        }
      >
        <Form className="flex flex-col gap-2 md:px-48">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <AttendanceForm />
          </div>
          <SubmitButton>Guardar</SubmitButton>
        </Form>
      </Formik>
    </div>
  );
};

export default AttendancePage;
