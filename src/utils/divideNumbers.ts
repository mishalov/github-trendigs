/**
 * Divides groups of 3 digits of param with whitespaces
 * @param num number or srting with digits
 */
export const divideNumbers = (num: number | string) => {
  if (isNaN(+num)) return "";
  return num.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
};
