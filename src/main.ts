import { chainR, option, chainN, chainL, convert } from "combinator-node";
import { sames } from "./main/parser/sames";
import { word } from "./main/parser/word";
import { interval } from "./main/parser/interval";
import "./main/Char";

const returnType = chainR(sames(":"), option(interval), word());
const argumentType = word(sames("{"));

const name = word(sames(":"));

const defineFunction = chainR(sames("f "), name);
const assignmentOperator = chainR(option(interval), sames("="));
const functionLiteral = chainN(
  chainL(option(argumentType), sames("{")),
  chainL(word(sames("}")), sames("}"))
);
const assignmentOperation = chainR(
  assignmentOperator,
  option(interval),
  functionLiteral
);
const syntax = chainN(defineFunction, option(returnType), assignmentOperation);
const fun = convert(syntax, (it) => it);

console.dir(fun({ src: "f main: void = {test}".chars(), offset: 0 }), {
  depth: Number.MAX_VALUE,
});
