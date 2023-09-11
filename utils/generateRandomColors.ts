const color = [
  "#38a832",
  "#3892c2",
  "#c2c238",
  "#d4342f",
  "#e036de",
  "#bf2175",
];

const generateRandomColors = (): string => {
  const randomNumber = Math.round(Math.random() * color.length - 1);

  return color[randomNumber];
};

export default generateRandomColors;
