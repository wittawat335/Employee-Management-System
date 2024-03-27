import LoadingButton, { LoadingButtonProps } from "@mui/lab/LoadingButton";

const MuiLoadingButton = (props: LoadingButtonProps) => {
  return (
    <LoadingButton variant="contained" {...props}>
      {props.children}
    </LoadingButton>
  );
};

export default MuiLoadingButton;
