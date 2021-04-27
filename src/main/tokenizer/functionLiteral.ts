import {
  chainN,
  chainL,
  option,
  or,
  repeat,
  convert,
  orN,
} from "combinator-node";
import { interval } from "../parser/interval";
import { sames } from "../parser/sames";
import { eol, space } from "../parser/things";
import { word } from "../parser/word";
import { rawLiteral } from "./rawLiteral";
import { tokenize } from "./tokenize";

const argumentType = word(sames("{"));

const order = rawLiteral;
const orderSeparator = chainN(option(repeat(space)), or(eol, sames(";")));
const orders = orN(
  convert(
    chainN(
      repeat(chainL(order, orderSeparator, option(interval))),
      option(chainL(order, option(orderSeparator)))
    ),
    ([heads, tail]) => [...heads, ...(tail ? [tail] : [])]
  ),
  convert(chainL(order, option(orderSeparator)), (it) => [it])
);

const syntax = chainN(
  chainL(option(argumentType), sames("{"), option(interval)),
  chainL(option(orders), option(interval), sames("}"))
);
export const functionLiteral = tokenize(syntax, ([argumentType, orders]) => ({
  kind: "function literal",
  value: {
    argumentType,
    orders: orders ? orders : [],
  },
}));
