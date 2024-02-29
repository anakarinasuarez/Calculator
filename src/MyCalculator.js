import { ChakraProvider, VStack, Grid, Text, Flex } from "@chakra-ui/react";
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

  useEffect(() => {
    function updateConstraints() {
      const calculatorElement = document.getElementById("calculator-container");
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

  const containerVariants = {
    hidden: { x: "50vw", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 120, duration: 1.0 },
    },
  };

  const textVariants = {
    hidden: { x: "-50vw", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 120, delay: 0.2, duration: 0.5 },
    },
  };

  return (
    <ChakraProvider>
      <Flex
        height="100vh"
        width="100vw"
        alignItems="center"
        justifyContent="center"
        bgColor="#F3ECF9"
      >
        <motion.div
          drag
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          dragConstraints={constraints}
          dragElastic={0.1}
          id="calculator-container"
          initial="hidden"
          animate="visible"
          style={{ perspective: 600 }}
        >
          <VStack spacing={4} align="center">
            <motion.div
              variants={textVariants}
              initial="hidden"
              animate="visible"
            >
              <Text
                color={isDragging ? "transparent" : "#3C1C55"}
                fontSize="5xl"
                mb={4}
                transition="color 0.1s"
              >
                My Calculator
              </Text>
            </motion.div>
            <motion.div variants={containerVariants}>
              <VStack
                bgColor="#fff"
                p={6}
                borderWidth={1}
                borderRadius="xl"
                boxShadow="dark-lg"
                minW={380}
                cursor={isDragging ? "grabbing" : "grab"}
              >
                <Screen input={input} />
                <VStack paddingTop={4}>
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
          </VStack>
        </motion.div>
      </Flex>
    </ChakraProvider>
  );
}

export default MyCalculator;
