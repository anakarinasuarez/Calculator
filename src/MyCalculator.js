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
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function MyCalculator() {
  const { input, handleInput } = useCalculator();
  const [constraints, setConstraints] = useState({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  });
  const [isDragging, setIsDragging] = useState(false);

  const textVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const containerVariants = {
    hover: {
      scale: 1.05,
      rotateX: 5,
      rotateY: 5,
      transition: { type: "spring", stiffness: 300 },
    },
  };

  useEffect(() => {
    function updateConstraints() {
      const calculatorElement = document.getElementById("calculator");
      if (calculatorElement) {
        const { width, height } = calculatorElement.getBoundingClientRect();
        setConstraints({
          top: -calculatorElement.offsetTop,
          right: window.innerWidth - (calculatorElement.offsetLeft + width),
          bottom: window.innerHeight - (calculatorElement.offsetTop + height),
          left: -calculatorElement.offsetLeft,
        });
      }
    }

    window.addEventListener("resize", updateConstraints);

    updateConstraints();

    return () => {
      window.removeEventListener("resize", updateConstraints);
    };
  }, []);

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
          <motion.div
            variants={textVariants}
            animate={isDragging ? "hidden" : "visible"}
            transition={{ duration: 0.2 }}
          >
            <VStack spacing={4} marginBottom={10}>
              <Text color="#3C1C55" fontSize="5xl">
                My Calculator
              </Text>
            </VStack>
          </motion.div>
          <motion.div
            drag
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setIsDragging(false)}
            dragConstraints={constraints}
            dragElastic={0.1}
            id="calculator"
            whileHover="hover"
            variants={containerVariants}
            style={{ perspective: 600 }}
          >
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
          </motion.div>
        </Box>
      </Flex>
    </ChakraProvider>
  );
}

export default MyCalculator;
