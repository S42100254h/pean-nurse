import React, { useState } from "react";
import { useSelector } from "react-redux";
import { MailOutline } from "@material-ui/icons";
import { Box } from "@material-ui/core";
import { ClosableDialog } from "./index";
import { getAdminSignedIn } from "../../reducks/admin/selectors";
import styled from "styled-components";
import { RootState } from "../../types/entity/rootState";

const Root = styled(Box)`
  position: fixed;
  bottom: 0;
  right: 10px;
  padding: 8px 20px;
  background-color: #f08080;
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
  const selector = useSelector((state: RootState) => state);
  const [open, setOpen] = useState(false);
  const handleDialogToggle = () => setOpen(!open);

  const isAdminSignedIn = getAdminSignedIn(selector);

  return (
    <>
      {isAdminSignedIn !== true && (
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
      )}
    </>
  );
};

export default Contact;
