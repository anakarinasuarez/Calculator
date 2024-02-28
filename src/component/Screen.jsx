import React from "react";
import { Input } from "@chakra-ui/react";
import { useState, useEffect } from "react";

const textColor = "#3C1C55";
const bgColor = "#fff";

const Screen = ({ input }) => {
  const [fontSize, setFontSize] = useState("3xl");

  useEffect(() => {
    if (input.length > 10) {
      setFontSize("2xl");
    } else if (input.length > 15) {
      setFontSize("xl");
    } else {
      setFontSize("3xl");
    }
  }, [input]);
  return (
    <Input
      value={input}
      readOnly
      paddingX={3}
      marginY={6}
      bgColor={bgColor}
      textColor={textColor}
      placeholder="0"
      placeholderTextColor={textColor}
      fontSize={fontSize}
      size="lg"
      border="none"
    />
  );
};

export default Screen;
