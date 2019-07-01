const toCamel = (s: string) => {
  return s.replace(/([-_][a-z])/gi, $1 => {
    return $1
      .toUpperCase()
      .replace("-", "")
      .replace("_", "");
  });
};

const isArray = function(a: any) {
  return Array.isArray(a);
};

const isObject = function(o: any) {
  return o === Object(o) && !isArray(o) && typeof o !== "function";
};

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
