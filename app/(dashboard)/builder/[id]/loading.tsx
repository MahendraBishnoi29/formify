import { ImSpinner2 } from "react-icons/im";

const loading = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <ImSpinner2 className="animate-spin h-14 w-14" />
    </div>
  );
};

export default loading;
