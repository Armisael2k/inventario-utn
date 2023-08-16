import FlexBox from "@/components/FlexBox";
import { Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import FormAutocomplete from "@/components/FormAutocomplete";
import getArticles from "@/hooks/article/getAllByArea";
import getAreas from "@/hooks/area/getAll";
import { useState } from "react";
import set from "@/hooks/article/set";
import sleep from "@/utils/sleep";

const formSchema = yup.object().shape({
  article: 
    yup.string().trim()
    .required("Articulo obligatorio"),
  area: 
    yup.string().trim()
    .required("Área obligatoria")
});

function Asignar() {
  const [articles, setArticles] = useState([]);
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
    const articleId = articles.find(article => `${article?.code} - ${article?.description}` === data.article).id;
    const areaId = areas.find(area => area.name === data.area).id;
    await set(articleId, areaId);
  }
  
  return (
    <FlexBox
      direction="column"
      wrap="wrap"
      gap={2}
      component="form"
      action=""
      onSubmit={handleSubmit(formAccept)}
    >
      <Typography variant="h5">Asignación</Typography>
      <FlexBox
        wrap="wrap"
        gap={2}
      >
        <FormAutocomplete
          control={control}
          fieldName="article"
          label="Articulo"
          api={() => getArticles(0)}
          isOptionEqualToValue={(option, value) => option?.id === value?.id}
          getOptionLabel={option => option ? `${option?.code} - ${option?.description}` : null}
          onOptionsChange={setArticles}
          disabled={isSubmitting}
        />
        <FormAutocomplete
          control={control}
          fieldName="area"
          label="Área"
          api={getAreas}
          isOptionEqualToValue={(option, value) => option?.id === value?.id}
          getOptionLabel={option => option?.name}
          onOptionsChange={setAreas}
          disabled={isSubmitting}
        />
      </FlexBox>
      <LoadingButton
        sx={{
          alignSelf: "start"
        }}
        variant="contained"
        type="submit"
        loading={isSubmitting}
      >
        Asignar
      </LoadingButton>
    </FlexBox>
  );
}

export default Asignar;