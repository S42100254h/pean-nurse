import React from "react";
import { Box } from "@material-ui/core";

const TabPanel = (props) => {
  const { children, value, index } = props;

  return (
    <div role="tabpanel" hidden={ value !== index }>
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
};

export default TabPanel;
