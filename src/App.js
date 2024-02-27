import React, { useState } from "react";
import {
  ChakraProvider,
  Box,
  VStack,
  Flex,
  Icon,
  Text,
} from "@chakra-ui/react";
import ButtonCalculator from "./component/ButtonCalculator";
import Screen from "./component/Screen";
import { evaluate } from "mathjs";
import { ArrowLeftTag } from "iconoir-react";

function App() {
  const [input, setInput] = useState("");

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
              <Flex justify="space-between" gap={1}>
                <ButtonCalculator
                  handleClick={handleClick}
                  value="AC"
                  size="lg"
                  flex="1"
                >
                  AC
                </ButtonCalculator>
                <ButtonCalculator
                  handleClick={handleClick}
                  value="del"
                  flex="1"
                  size="lg"
                >
                  <Icon as={ArrowLeftTag} boxSize={6} />
                </ButtonCalculator>
                <ButtonCalculator
                  handleClick={handleClick}
                  value="%"
                  flex="1"
                  size="lg"
                >
                  %
                </ButtonCalculator>
                <ButtonCalculator
                  handleClick={handleClick}
                  value="/"
                  flex="1"
                  size="lg"
                  bgColor="#2F9D89"
                  color="#fff"
                >
                  /
                </ButtonCalculator>
              </Flex>
              <Flex justify="space-between" gap={1}>
                <ButtonCalculator
                  handleClick={handleClick}
                  value="7"
                  flex="1"
                  size="lg"
                >
                  7
                </ButtonCalculator>
                <ButtonCalculator
                  handleClick={handleClick}
                  value="8"
                  flex="1"
                  size="lg"
                >
                  8
                </ButtonCalculator>
                <ButtonCalculator
                  handleClick={handleClick}
                  value="9"
                  flex="1"
                  size="lg"
                >
                  9
                </ButtonCalculator>
                <ButtonCalculator
                  handleClick={handleClick}
                  value="*"
                  flex="1"
                  size="lg"
                  bgColor="#2F9D89"
                  color="#fff"
                >
                  *
                </ButtonCalculator>
              </Flex>
              <Flex justify="space-between" gap={1}>
                <ButtonCalculator
                  handleClick={handleClick}
                  value="6"
                  flex="1"
                  size="lg"
                >
                  6
                </ButtonCalculator>
                <ButtonCalculator
                  handleClick={handleClick}
                  value="5"
                  flex="1"
                  size="lg"
                >
                  5
                </ButtonCalculator>
                <ButtonCalculator
                  handleClick={handleClick}
                  value="4"
                  flex="1"
                  size="lg"
                >
                  4
                </ButtonCalculator>
                <ButtonCalculator
                  handleClick={handleClick}
                  value="-"
                  flex="1"
                  size="lg"
                  bgColor="#2F9D89"
                  color="#fff"
                >
                  -
                </ButtonCalculator>
              </Flex>
              <Flex justify="space-between" gap={1}>
                <ButtonCalculator
                  handleClick={handleClick}
                  value="1"
                  flex="1"
                  size="lg"
                >
                  1
                </ButtonCalculator>
                <ButtonCalculator
                  handleClick={handleClick}
                  value="2"
                  flex="1"
                  size="lg"
                >
                  2
                </ButtonCalculator>
                <ButtonCalculator
                  handleClick={handleClick}
                  value="3"
                  flex="1"
                  size="lg"
                >
                  3
                </ButtonCalculator>
                <ButtonCalculator
                  handleClick={handleClick}
                  value="+"
                  flex="1"
                  size="lg"
                  bgColor="#2F9D89"
                  color="#fff"
                >
                  +
                </ButtonCalculator>
              </Flex>
              <Flex justify="space-between" gap={1}>
                <ButtonCalculator
                  handleClick={handleClick}
                  value="0"
                  flex="2"
                  size="lg"
                >
                  0
                </ButtonCalculator>
                <ButtonCalculator
                  handleClick={handleClick}
                  value="."
                  flex="1"
                  size="lg"
                >
                  .
                </ButtonCalculator>
                <ButtonCalculator
                  handleClick={handleClick}
                  value="="
                  flex="1"
                  size="lg"
                  bgColor="#2F9D89"
                  color="#fff"
                >
                  =
                </ButtonCalculator>
              </Flex>
            </VStack>
          </VStack>
        </Box>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
