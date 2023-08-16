import { LoadingButton } from "@mui/lab";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import FormDatePicker from "@/components/FormDatePicker";
import FormAutocomplete from "@/components/FormAutocomplete";
import FlexBox from "@/components/FlexBox";
import sleep from "@/utils/sleep";
import getBetweenByArea from "@/hooks/supplie/getBetweenByArea";
import getAreas from "@/hooks/area/getAll";
import { useState } from "react";

const formSchema = yup.object().shape({
  start_date: 
    yup.string().trim()
    .required("Obligatorio"),
  end_date: 
    yup.string().trim()
    .required("Obligatorio"),
  area: 
    yup.string().trim()
    .required("Obligatorio"),
});

function Filters({ onUpdate }) {
  const [areas, setAreas] = useState([]);

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm({
    resolver: yupResolver(formSchema)
  });

  const formAccept = async (data) => {
    await sleep(500);
    const areaId = areas.find((area) => area.name === data.area).id;
    const result = await getBetweenByArea(data.start_date, data.end_date, areaId);
    if ( result ) {
      onUpdate?.(result, data.area);
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
        fieldName="area"
        label="Área"
        api={getAreas}
        isOptionEqualToValue={(option, value) => option?.name === value?.name}
        getOptionLabel={(option) => option?.name}
        onOptionsChange={setAreas}
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