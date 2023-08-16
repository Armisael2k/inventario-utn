import { LoadingButton } from "@mui/lab";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import FormDatePicker from "@/components/FormDatePicker";
import FlexBox from "@/components/FlexBox";
import getBetween from "@/hooks/article/getBetween";
import sleep from "@/utils/sleep";

const formSchema = yup.object().shape({
  start_date: 
    yup.string().trim()
    .required("Obligatorio"),
  end_date: 
    yup.string().trim()
    .required("Obligatorio")
});

function Filters({ onUpdate }) {

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm({
    resolver: yupResolver(formSchema)
  });

  const formAccept = async (data) => {
    await sleep(500);
    const result = await getBetween(data.start_date, data.end_date);
    if ( result ) {
      onUpdate?.(result);
    }
  }

  return (
    <FlexBox
      gap={2}
      wrap="wrap"
      component="form"
      action=""
      onSubmit={handleSubmit(formAccept)}
    >
      <FormDatePicker
        control={control}
        fieldName="start_date"
        label="Fecha inicio"
        disabled={isSubmitting}
      />
      <FormDatePicker
        control={control}
        fieldName="end_date"
        label="Fecha fin"
        disabled={isSubmitting}
      />
      <LoadingButton
        sx={{
          alignSelf: "start",
          marginTop: "10px"
        }}
        variant="contained"
        loading={isSubmitting}
        type="submit"
      >
        Aplicar filtros
      </LoadingButton>
    </FlexBox>
  );
}

export default Filters;