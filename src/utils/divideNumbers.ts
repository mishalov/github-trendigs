export const divideNumbers = (num: number | string) => {
  if (isNaN(+num)) return "";
  return num.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
};
