import React from "react";

import { Card, CardContent, Box, Typography } from "@mui/material";

const BaseCard = (props) => {
  return (
    <Card>
      <Box p={2} display="flex" alignItems="center">
        {props.title ? (
          <Typography
            variant="h4"
            sx={{
              width: "100%",
              padding: "1rem",
              borderBottom: "1px solid rgba(77,77,77,0.2)",
              textAlign: "center",
              textTransform: "uppercase",
            }}
          >
            {props.title}
          </Typography>
        ) : (
          ""
        )}
      </Box>
      <CardContent>{props.children}</CardContent>
    </Card>
  );
};

export default BaseCard;
