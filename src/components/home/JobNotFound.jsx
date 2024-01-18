import { Box, Typography } from "@mui/material";

import imageNotFound from "../../sources/ImageNotFound.png";

const JobNotFound = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "60vh",
        backgroundColor: "#ECECEC",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 5,
      }}
    >
      <Box
        sx={{
          width: "70%",
          background: "white",
          height: "80%",
          borderRadius: 10,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <img
          src={imageNotFound}
          alt=""
          style={{ width: 600, height: "auto" }}
        />

        <Typography fontWeight={600} fontSize={25}>
          Xin lỗi! Việc làm bạn đang tìm kiếm không tồn tại.
        </Typography>
      </Box>
    </Box>
  );
};

export default JobNotFound;
