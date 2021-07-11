import React from "react";
import Snackbar from "@material-ui/core/Snackbar";

export default function DirectionSnackbar({ listening }) {
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  React.useEffect(() => {
    if (!listening) {
      return handleClick({ vertical: "top", horizontal: "center" });
    }

    setTimeout(() => {
      handleClose();
    }, 3000);
  }, [listening]);

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message='Listening.....'
        key={vertical + horizontal}
      />
    </div>
  );
}
