export const truncateText = (description: string, maxLength: number) => {
  if (!description) return description;
  if (description.length <= maxLength) return description;
  return description.slice(0, maxLength) + "...";
};
