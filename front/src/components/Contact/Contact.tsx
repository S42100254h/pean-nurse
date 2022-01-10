import React, { useState } from "react";
import { MailOutline } from "@material-ui/icons";
import { Box } from "@material-ui/core";
import { ClosableDialog } from "./index";
import styled from "styled-components";

const Root = styled(Box)`
    position: fixed;
    bottom: 0;
    right: 10px;
    padding: 8px 20px;
    background-color: #F08080;
    border-radius: 2px;
    cursor: pointer;
    z-index: 999;
`;

const Heading = styled.p`
  float: right;
  color: #fff;
  font-size: 0.8rem;
  margin-left: 8px;
`;

const Contact = () => {
  const [open, setOpen] = useState(false);
  const handleDialogToggle = () => setOpen(!open);

  return (
    <>
      <Root
        display="flex"
        alignItems="center"
        justifyContent="center"
        onClick={() => handleDialogToggle()}
      >
        <MailOutline fontSize="small" style={{ color: "white" }} />
        <Heading>ご意見箱</Heading>
      </Root>
      <ClosableDialog open={open} onClose={handleDialogToggle} />
    </>
  );
};

export default Contact;
