import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 700px;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 4px;
`;

const Caption = styled.p`
  font-weight: bold;
`;

type Props = {
  choice: string;
  select: string;
  label: string;
};

const ChoiceCard = (props: Props) => {
  return (
    <>
      {props.choice && (
        <Container>
          <Caption>{props.label}</Caption>
          <div>{props.choice}</div>
          {props.select == "true" ? (
            <div>- right -</div>
          ) : (
            <div>- wrong -</div>
          )}
        </Container>
      )}
    </>
  );
};

export default ChoiceCard;
