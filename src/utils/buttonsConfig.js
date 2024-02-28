import { ArrowLeftTag } from "iconoir-react";
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

export { buttons };
