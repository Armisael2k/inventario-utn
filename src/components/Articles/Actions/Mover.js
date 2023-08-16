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
import { toast } from "react-toastify";
import move from "@/hooks/article/move";
import sleep from "@/utils/sleep";

const formSchema = yup.object().shape({
  startArea:
    yup.string().trim()
    .required("Área obligatoria"),
  article: 
    yup.string().trim()
    .required("Articulo obligatorio"),
  endArea:
    yup.string().trim()
    .required("Área obligatoria"),
});

function Mover() {
  const [articles, setArticles] = useState([]);
  const [areas, setAreas] = useState([]);
  const [selectedStartArea, setSelectedStartArea] = useState(-1);

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm({
    resolver: yupResolver(formSchema)
  });

  const formAccept = async (data) => {
    console.log(data);
    await sleep(500);
    const articleId = articles.find(article => `${article?.code} - ${article?.description}` === data.article).id;
    const startAreaId = areas.find(area => area.name === data.startArea).id;
    const endAreaId = areas.find(area => area.name === data.endArea).id;
    if (startAreaId === endAreaId) return toast.error("El area inicial y el area final no pueden ser iguales");
    await move(articleId, startAreaId, endAreaId);
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
      <Typography variant="h5">Mover</Typography>
      <FlexBox
        wrap="wrap"
        gap={2}
      >
        <FormAutocomplete
          control={control}
          fieldName="startArea"
          label="Área inicial"
          api={getAreas}
          isOptionEqualToValue={(option, value) => option?.id === value?.id}
          getOptionLabel={option => option?.name}
          onChange={option => setSelectedStartArea(option?.id || -1)}
          onOptionsChange={setAreas}
          disabled={isSubmitting}
        />
        <FormAutocomplete
          control={control}
          fieldName="article"
          label="Articulo"
          api={() => getArticles(selectedStartArea)}
          isOptionEqualToValue={(option, value) => option?.id === value?.id}
          getOptionLabel={option => option ? `${option?.code} - ${option?.description}` : null}
          onOptionsChange={setArticles}
          disabled={selectedStartArea === -1 || isSubmitting}
        />
        <FormAutocomplete
          control={control}
          fieldName="endArea"
          label="Área final"
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

export default Mover;