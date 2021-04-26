import { chainN, convert } from "combinator-node";
import { Parser } from "./type/Parser";
import { same } from "./minimum/same";
import "./minimum/Char";

export const sames = (value: string): Parser<string> => {
  const sames = value.chars().map((it) => same(it));
  const syntax = chainN(...sames);
  return convert(syntax, (it) => [...it].join(""));
};
