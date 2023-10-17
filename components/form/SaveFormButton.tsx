import { HiSaveAs } from "react-icons/hi";
import { Button } from "../ui/button";

const SaveFormButton = () => {
  return (
    <Button variant="outline" className="gap-2">
      <HiSaveAs className="h-4 w-4" />
      Save
    </Button>
  );
};

export default SaveFormButton;
