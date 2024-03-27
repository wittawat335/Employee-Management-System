import ReactLoading from "react-loading";

const Loader = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <ReactLoading type="balls" color="blue" />
    </div>
  );
};

export default Loader;
