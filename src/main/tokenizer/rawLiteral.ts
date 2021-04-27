import { chainL, chainR, option } from "combinator-node";
import { interval } from "../parser/interval";
import { sames } from "../parser/sames";
import { textLiteral } from "./textLiteral";
import { tokenize } from "./tokenize";

const syntax = chainR(
  sames("raw("),
  option(interval),
  chainL(textLiteral, option(interval), sames(")"))
);
export const rawLiteral = tokenize(syntax, (it) => ({
  kind: "raw literal",
  value: it,
}));
