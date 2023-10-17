import { MdOutlinePublish } from "react-icons/md";
import { Button } from "../ui/button";

const PublishFormButton = () => {
  return (
    <Button
      variant="outline"
      className="gap-2 text-white bg-gradient-to-br from-indigo-500 to-cyan-400 hover:bg-gradient-to-bl transition-all"
    >
      <MdOutlinePublish className="h-4 w-4" />
      Publish
    </Button>
  );
};

export default PublishFormButton;
