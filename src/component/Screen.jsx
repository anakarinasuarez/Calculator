import React from "react";
import { Input, Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";

const textColor = "#3C1C55";

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
    <Box
      boxShadow="inset 4px 1px 6px rgba(0,0,0,.1), inset -4px -3px 6px #fff"
      borderColor="rgba(0, 0, 0, 0.01)"
      borderWidth={1}
      bgColor="#F3ECF9"
      borderRadius="lg"
    >
      <Input
        value={input}
        readOnly
        paddingX={3}
        marginY={6}
        textColor={textColor}
        placeholder="0"
        placeholderTextColor={textColor}
        fontSize={fontSize}
        size="lg"
        border="none"
        bgColor="transparent"
      />
    </Box>
  );
};

export default Screen;
