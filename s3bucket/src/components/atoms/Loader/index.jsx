import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Loader = (props) => {
  return (
    <Box
      sx={{
        height: props?.size ? props?.size : null,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress
        style={{
          color: props?.color ? props?.color : "rgba(255, 183, 0, 1)",
          width:props?.width ? props?.width : 40,
          height:props?.height ? props?.height : 40
        }}
      />
    </Box>
  );
};

export default Loader;
