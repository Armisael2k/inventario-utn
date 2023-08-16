import FlexBox from "@/components/FlexBox";
import Asignar from "./Asignar";

function Actions() {
  return (
    <FlexBox
      direction="column"
      wrap="wrap"
      gap={2}
    >
      <Asignar/>
    </FlexBox>
  );
}

export default Actions;