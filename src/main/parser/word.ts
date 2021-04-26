import { chainR, not, orN, convert, repeat } from "combinator-node";
import { Parser } from "./type/Parser";
import { any } from "./minimum/any";
import { interval } from "./interval";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const word = (...nots: Parser<any>[]): Parser<string> => {
  const char = chainR(not(orN(interval, ...nots)), any);
  return convert(repeat(char), (it) => it.join(""));
};
