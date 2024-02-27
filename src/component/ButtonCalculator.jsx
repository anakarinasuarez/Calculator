import React from "react";
import { Button } from "@chakra-ui/react";

const ButtonCalculator = ({ handleClick, value, children, ...props }) => {
  return (
    <Button
      bgColor="#FFF"
      color="#2F9D89"
      size={"lg"}
      boxShadow="lg"
      onClick={() => handleClick(value)}
      {...props}
    >
      {children}
    </Button>
  );
};

export default ButtonCalculator;
