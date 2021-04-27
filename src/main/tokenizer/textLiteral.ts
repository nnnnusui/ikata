import {
  chainL,
  chainN,
  chainR,
  convert,
  option,
  orN,
  repeat,
} from "combinator-node";
import { interval } from "../parser/interval";
import { sames } from "../parser/sames";
import { strNot } from "../parser/strNot";
import { eol } from "../parser/things";
import { tokenize } from "./tokenize";

const enclosure = sames('"');
const paling = sames("|");
const newLine = chainN(eol, option(interval), paling);

const toClose = convert(option(strNot(enclosure)), (it) => (it ? it : ""));
const paled = (() => {
  const line = convert(option(strNot(eol)), (it) => (it ? it : ""));
  return convert(repeat(chainR(newLine, line)), (it) => it.join("\n"));
})();
const paledOrClose = orN(chainL(paled, interval), toClose);
const syntax = chainR(enclosure, chainL(paledOrClose, enclosure));
export const textLiteral = tokenize(syntax, (it) => ({
  kind: "text literal",
  value: it,
}));
