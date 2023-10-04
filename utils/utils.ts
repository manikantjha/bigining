export const phoneRegex =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const queryClientStaleTime = 1000 * 60 * 60 * 24; // 24 Hrs in Ms

export const truncateText = (description: string, maxLength: number) => {
  if (!description) return description;
  if (description.length <= maxLength) return description;
  return description.slice(0, maxLength) + "...";
};

export function camelize(str: string) {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
    if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
    return index === 0 ? match.toLowerCase() : match.toUpperCase();
  });
}
