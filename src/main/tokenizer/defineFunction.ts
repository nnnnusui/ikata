import { chainR, option, chainN } from "combinator-node";
import { interval } from "../parser/interval";
import { sames } from "../parser/sames";
import { word } from "../parser/word";
import { functionLiteral } from "./functionLiteral";
import { tokenize } from "./tokenize";

const name = word(sames(":"));
const naming = chainR(sames("f "), name);
const returnType = chainR(
  option(interval),
  sames(":"),
  option(interval),
  word()
);

const assignmentOperator = chainR(option(interval), sames("="));
const assignmentOperation = chainR(
  assignmentOperator,
  option(interval),
  functionLiteral
);
const syntax = chainN(naming, option(returnType), assignmentOperation);
export const defineFunction = tokenize(syntax, ([name, returnType, fun]) => ({
  kind: "define function",
  value: {
    name,
    returnType,
    function: fun,
  },
}));
