export const divideNumbers = (num: number | string) => {
  return num.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
};
