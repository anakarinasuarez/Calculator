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
import useCalculator from "./hooks/useCalculator";
import { buttons } from "./utils/buttonsConfig";

function MyCalculator() {
  const { input, handleInput } = useCalculator();

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

export default MyCalculator;
