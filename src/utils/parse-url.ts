export const parseURL = (input: string): URL | null => {
  try {
    return new URL(input);
  } catch (err) {
    return null;
  }
};
