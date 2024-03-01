import { useState, useEffect, useCallback } from "react";
import { evaluate, format } from "mathjs";
import { buttons } from "../utils/buttonsConfig";

const useCalculator = () => {
  const [input, setInput] = useState("");
  const [prevInput, setPrevInput] = useState("");
  const [operator, setOperator] = useState("");
  const [shouldClearScreen, setShouldClearScreen] = useState(false);

  const evaluateInput = useCallback((input) => {
    try {
      const result = evaluate(input);
      const resultString = result.toString();

      if (resultString.length > 10) {
        return format(result, { notation: "exponential", precision: 6 });
      } else {
        const decimalCheck = resultString.split(".");
        if (decimalCheck.length > 1 && decimalCheck[1].length > 5) {
          return Number(result.toFixed(5)).toString();
        }
        return resultString;
      }
    } catch (error) {
      return "Error";
    }
  }, []);

  const handleInput = useCallback(
    (value) => {
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
    },
    [input, operator, prevInput, evaluateInput]
  );

  const handleKeyPress = useCallback(
    (event) => {
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
    },
    [handleInput]
  );

  useEffect(() => {
    const handleKeyDown = (event) => handleKeyPress(event);

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyPress]);

  return {
    input,
    setInput,
    handleInput,
  };
};

export default useCalculator;
