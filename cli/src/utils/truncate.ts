type TruncateOptions = {
  text: string;
  isTruncated: boolean;
};

export const truncate = (
  text: string,
  maxLength: number,
): TruncateOptions => {
  if (text.length <= maxLength) {
    return { text, isTruncated: false };
  }

  return { text: text.slice(0, maxLength), isTruncated: true };
};
