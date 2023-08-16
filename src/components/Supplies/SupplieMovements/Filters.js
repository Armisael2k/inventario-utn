import { LoadingButton } from "@mui/lab";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import FormDatePicker from "@/components/FormDatePicker";
import FormAutocomplete from "@/components/FormAutocomplete";
import FlexBox from "@/components/FlexBox";
import sleep from "@/utils/sleep";
import getPurchasesBetween from "@/hooks/supplie/getPurchasesBetween";
import getBetweenBySupplie from "@/hooks/supplie/getBetweenBySupplie";
import getSupplies from "@/hooks/supplie/getAll";
import { useState } from "react";

const formSchema = yup.object().shape({
  start_date: 
    yup.string().trim()
    .required("Obligatorio"),
  end_date: 
    yup.string().trim()
    .required("Obligatorio"),
  supplie: 
    yup.string().trim()
    .required("Obligatorio"),
});

function Filters({ onUpdate }) {
  const [supplies, setSupplies] = useState([]);

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm({
    resolver: yupResolver(formSchema)
  });

  const formAccept = async (data) => {
    await sleep(500);
    const supplieId = supplies.find(supplie => supplie.description === data.supplie).id;
    const resultPurchases = await getPurchasesBetween(data.start_date, data.end_date, supplieId);
    const resultMovements = await getBetweenBySupplie(data.start_date, data.end_date, supplieId);
    if ( resultPurchases, resultMovements ) {
      onUpdate?.(resultPurchases, resultMovements, data.supplie);
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
      <FormAutocomplete
        control={control}
        fieldName="supplie"
        label="Item"
        api={getSupplies}
        isOptionEqualToValue={(option, value) => option?.description === value?.description}
        getOptionLabel={(option) => option?.description}
        onOptionsChange={setSupplies}
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