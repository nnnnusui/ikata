import { chainN, convert } from "combinator-node";
import { Parser } from "../Parser";
import { same } from "./minimum/same";
import "../Char";

export const sames = (value: string): Parser<string> => {
  const sames = value.chars().map((it) => same(it));
  const syntax = chainN(...sames);
  return convert(syntax, (it) => it.join(""));
};
