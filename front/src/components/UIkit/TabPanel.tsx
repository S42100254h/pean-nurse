import React, { ReactNode } from "react";
import { Box } from "@material-ui/core";

type Props = {
  children: ReactNode;
  value: number;
  index: number;
};

const TabPanel = (props: Props) => {
  const { children, value, index } = props;

  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

export default TabPanel;
