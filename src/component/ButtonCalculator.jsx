import React from "react";
import { Button, Icon } from "@chakra-ui/react";

const initialBgColor = "#fff";
const initialTextColor = "#3C1C55";

const ButtonCalculator = ({
  handleClick,
  value,
  children,
  bgColor = initialBgColor,
  color = initialTextColor,
  size = "lg",
  boxShadow = "lg",
  colSpan = 1,
  iconButton,
  ...props
}) => {
  const content = iconButton ? (
    <Icon as={iconButton} boxSize={6} />
  ) : (
    children || value
  );

  return (
    <Button
      gridColumn={`span ${colSpan}`}
      bgColor={bgColor}
      color={color}
      size={size}
      boxShadow={boxShadow}
      onClick={() => handleClick(value)}
      {...props}
    >
      {content}
    </Button>
  );
};

export default ButtonCalculator;
