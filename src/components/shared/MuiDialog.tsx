import {
  Breakpoint,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

type DialogProps = {
  title: string;
  children: React.ReactNode;
  openPopup: boolean;
  maxWidth: Breakpoint | false;
  setOpenPopup: (open: boolean) => void;
};

const MuiDialog = (props: DialogProps) => {
  const { title, children, openPopup, maxWidth, setOpenPopup } = props;
  return (
    <Dialog
      open={openPopup}
      onClose={() => {
        setOpenPopup(false);
      }}
      fullWidth
      maxWidth={maxWidth}
    >
      <DialogTitle>
        <div style={{ display: "flex" }}>
          <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <IconButton
            style={{ float: "right" }}
            onClick={() => {
              setOpenPopup(false);
            }}
          >
            <CancelIcon color="inherit" fontSize="large" />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default MuiDialog;
