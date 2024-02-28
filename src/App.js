import React, { useState, useEffect } from "react";
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
import { evaluate, format } from "mathjs";
import { ArrowLeftTag } from "iconoir-react";

function App() {
  const [input, setInput] = useState("");
  const [prevInput, setPrevInput] = useState("");
  const [operator, setOperator] = useState("");
  const [shouldClearScreen, setShouldClearScreen] = useState(false);

  const otherBgColor = "#3C1C55";
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
      const result = evaluate(input);

      const maxDigits = 15;

      return format(result, { notation: "auto", precision: maxDigits });
    } catch (error) {
      return "Error";
    }
  };
  const handleInput = (value) => {
    if (value === "AC") {
      setInput("");
      setPrevInput("");
      setOperator("");
      setShouldClearScreen(false);
    } else if (value === "=") {
      if (operator && prevInput && input) {
        let expression = `${prevInput}${operator}${input}`;
        let result = evaluateInput(expression);
        setInput(result);
        setPrevInput("");
        setOperator("");
        setShouldClearScreen(false);
      }
    } else if (["+", "-", "*", "/", "%"].includes(value)) {
      if (!operator) {
        setOperator(value);
        setPrevInput(input);
        setShouldClearScreen(true);
      }
    } else if (value === "del") {
      setInput(input.slice(0, -1));
    } else {
      if (shouldClearScreen) {
        setInput(value);
        setShouldClearScreen(false);
      } else {
        setInput(input + value);
      }
    }
  };
  const handleKeyPress = (event) => {
    let value = null;

    const specialKeys = {
      Backspace: "del",
      Enter: "=",
      Escape: "AC",
    };

    if (specialKeys[event.key]) {
      value = specialKeys[event.key];
    } else {
      const validKeys = "0123456789+-*/.%";
      if (validKeys.includes(event.key)) {
        value = event.key;
      }
    }

    if (value && buttons.some((button) => button.value === value)) {
      handleInput(value);
    }
  };
  useEffect(() => {
    const handleKeyDown = (event) => {
      handleKeyPress(event);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyPress]);

  return (
    <ChakraProvider>
      <Flex
        height="100vh"
        width="100vw"
        alignItems="center"
        justifyContent="center"
        bgColor="#F5F5F5"
      >
        <Box p={4}>
          <VStack spacing={4} marginBottom={10}>
            <Text color="#3C1C55" fontSize="4xl">
              My Calculator
            </Text>
          </VStack>
          <VStack
            bgColor="#fff"
            p={6}
            borderWidth={1}
            borderRadius="xl"
            boxShadow="dark-lg"
            minW={380}
          >
            <Screen input={input} />
            <VStack paddingY={4}>
              <Grid templateColumns="repeat(4, 1fr)" gap={1}>
                {buttons.map((button) => (
                  <ButtonCalculator
                    key={button.value}
                    handleClick={handleInput}
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
