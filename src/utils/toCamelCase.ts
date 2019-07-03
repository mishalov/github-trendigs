/**
 * Converts string in Cebab case and Snake case to Camel Case
 * @param s string to convert
 */
const toCamel = (s: string) => {
  return s.replace(/([-_][a-z])/gi, $1 => {
    return $1
      .toUpperCase()
      .replace("-", "")
      .replace("_", "");
  });
};

/**
 * Check if param is array
 * @param a thing ot check
 */
const isArray = function(a: any) {
  return Array.isArray(a);
};

/**
 * Check if param is object
 * @param o check if param is object
 */
const isObject = function(o: any) {
  return o === Object(o) && !isArray(o) && typeof o !== "function";
};

/**
 * Converts filds names from Kebab and Snake to Camel case
 * @param o object to convert fields
 */
export const objectKeysToCamelCase = function(o: any) {
  if (isObject(o)) {
    const n: any = {};

    Object.keys(o).forEach((k: string) => {
      n[toCamel(k)] = objectKeysToCamelCase(o[k]);
    });

    return n;
  } else if (isArray(o)) {
    return o.map((i: number) => {
      return objectKeysToCamelCase(i);
    });
  }

  return o;
};
