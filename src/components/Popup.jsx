import { Box, SpeedDial } from "@mui/material";
import { useDispatch } from "react-redux";
import { setModal } from "../slice/companySlice";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";

const Popup = () => {
  const dispatch = useDispatch();
  const handleCreateCompany = () => {
    dispatch(setModal({ show: true }));
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        right: 0,
      }}
    >
      <SpeedDial
        onClick={handleCreateCompany}
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      ></SpeedDial>
    </Box>
  );
};

export default Popup;
