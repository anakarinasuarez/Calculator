import React from "react";
import { Input } from "@chakra-ui/react";

const Screen = ({ input }) => {
  return (
    <Input
      value={input}
      readOnly
      bgColor="#fff"
      textColor="#2F9D89"
      placeholder="0"
      placeholderTextColor="#2F9D89"
      fontSize="2xl"
      paddingX={3}
      size="lg"
      border="none"
    />
  );
};

export default Screen;
