import { chainR, not, orN, convert, repeat } from "combinator-node";
import { Parser } from "../Parser";
import { any } from "./minimum/any";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const strNot = (...nots: Parser<any>[]): Parser<string> => {
  const char = chainR(not(orN(...nots)), any);
  return convert(repeat(char), (it) => it.join(""));
};
