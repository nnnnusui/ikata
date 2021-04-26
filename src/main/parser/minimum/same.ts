import { Combinator } from "combinator-node";
import { Parser } from "../type/Parser";
import { Char } from "../type/Char";
import { any } from "./any";

export const same = (char: Char): Parser<Char> => (context) => {
  const result = any(context);
  if (!result.ok) return result;
  if (result.get !== char) {
    return Combinator.err(context, `same: ${result.get} should be ${char}`);
  }
  return result;
};
