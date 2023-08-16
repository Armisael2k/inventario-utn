import FlexBox from "@/components/FlexBox";
import Asignar from "./Asignar";
import Mover from "./Mover";

function Actions() {
  return (
    <FlexBox
      direction="column"
      wrap="wrap"
      gap={2}
    >
      <Asignar/>
      <Mover/>
    </FlexBox>
  );
}

export default Actions;