export const czechLettersReplacements = {
  ě: "e",
  ř: "r",
  š: "s",
  č: "c",
  ž: "z",
  ý: "y",
  á: "a",
  í: "i",
  é: "e",
  ú: "u",
  ó: "o",
  ů: "u",
  ď: "d",
  ť: "t",
  ň: "n",
  ľ: "l",
  Ě: "E",
  Ř: "R",
  Š: "S",
  Č: "C",
  Ž: "Z",
  Ý: "Y",
  Á: "A",
  Í: "I",
  É: "E",
  Ú: "U",
  Ó: "O",
  Ů: "U",
  Ď: "D",
  Ť: "T",
  Ň: "N",
  Ľ: "L",

  // also portuguese letters
  ã: "a",
  õ: "o",
  Ã: "A",
  Õ: "O",
};

export const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
};
