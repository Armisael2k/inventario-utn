import { LoadingButton } from "@mui/lab";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import FlexBox from "@/components/FlexBox";
import getAreas from "@/hooks/area/getAll";
import sleep from "@/utils/sleep";
import { useState } from "react";
import getMovementsByArea from "@/hooks/article/getMovementsByArea";
import FormAutocomplete from "@/components/FormAutocomplete";

const formSchema = yup.object().shape({
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
    const areaId = areas.find(area => area.name === data.area).id;
    const result = await getMovementsByArea(areaId);
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
      <FormAutocomplete
        control={control}
        fieldName="area"
        label="Área"
        api={() => getAreas(true)}
        isOptionEqualToValue={(option, value) => option?.id === value?.id}
        getOptionLabel={option => option?.name}
        onOptionsChange={setAreas}
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