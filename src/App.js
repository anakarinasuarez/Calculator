import React, { useState } from "react";
import {
  ChakraProvider,
  Box,
  VStack,
  Flex,
  Grid,
  Text,
} from "@chakra-ui/react";
import ButtonCalculator from "./component/ButtonCalculator";
import Screen from "./component/Screen";
import { evaluate } from "mathjs";
import { ArrowLeftTag } from "iconoir-react";

function App() {
  const [input, setInput] = useState("");

  const otherBgColor = "#2F9D89";
  const otherTextColor = "#fff";

  const buttons = [
    { value: "AC", colSpan: 1 },
    { value: "del", colSpan: 1, iconButton: ArrowLeftTag },
    { value: "%", colSpan: 1 },
    {
      value: "/",
      colSpan: 1,
      bgColor: otherBgColor,
      color: otherTextColor,
    },
    { value: "7", colSpan: 1 },
    { value: "8", colSpan: 1 },
    { value: "9", colSpan: 1 },
    {
      value: "*",
      colSpan: 1,
      bgColor: otherBgColor,
      color: otherTextColor,
    },
    { value: "4", colSpan: 1 },
    { value: "5", colSpan: 1 },
    { value: "6", colSpan: 1 },
    {
      value: "-",
      colSpan: 1,
      bgColor: otherBgColor,
      color: otherTextColor,
    },
    { value: "1", colSpan: 1 },
    { value: "2", colSpan: 1 },
    { value: "3", colSpan: 1 },
    {
      value: "+",
      colSpan: 1,
      bgColor: otherBgColor,
      color: otherTextColor,
    },
    { value: "0", colSpan: 2 },
    { value: ".", colSpan: 1 },
    {
      value: "=",
      colSpan: 1,
      bgColor: otherBgColor,
      color: otherTextColor,
    },
  ];

  const evaluateInput = (input) => {
    try {
      return evaluate(input).toString();
    } catch (error) {
      return "Error";
    }
  };

  const handleClick = (value) => {
    if (value === "AC") {
      setInput("");
    } else if (value === "=") {
      let sanitizedInput = input.replace("%", "/100");
      setInput(evaluateInput(sanitizedInput));
    } else if (value === "del") {
      setInput(input.slice(0, -1));
    } else {
      setInput(input + value);
    }
  };

  return (
    <ChakraProvider>
      <Flex
        height="100vh"
        width="100vw"
        alignItems="center"
        justifyContent="center"
      >
        <Box p={4}>
          <VStack spacing={4} marginBottom={10}>
            <Text color="#1C554B" fontSize="4xl">
              My Calculator
            </Text>
          </VStack>
          <VStack
            bgColor="#fff"
            p={6}
            borderWidth={1}
            borderRadius="xl"
            boxShadow="dark-lg"
          >
            <Screen input={input} />
            <VStack paddingY={2}>
              <Grid templateColumns="repeat(4, 1fr)" gap={1}>
                {buttons.map((button) => (
                  <ButtonCalculator
                    key={button.value}
                    handleClick={handleClick}
                    value={button.value}
                    colSpan={button.colSpan}
                    bgColor={button.bgColor}
                    color={button.color}
                    iconButton={button.iconButton}
                  />
                ))}
              </Grid>
            </VStack>
          </VStack>
        </Box>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
