export const phoneRegex =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const truncateText = (description: string, maxLength: number) => {
  if (!description) return description;
  if (description.length <= maxLength) return description;
  return description.slice(0, maxLength) + "...";
};
