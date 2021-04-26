import { chainR, option, chainN, chainL, convert } from "combinator-node";
import { sames } from "./main/parser/sames";
import { word } from "./main/parser/word";
import { interval } from "./main/parser/interval";
import { Tokenizer } from "./main/Tokenizer";

const returnType = chainR(sames(":"), option(interval), word());
const argumentType = word(sames("{"));

const name = word(sames(":"));

const naming = chainR(sames("f "), name);
const assignmentOperator = chainR(option(interval), sames("="));
const functionLiteral = chainN(
  chainL(option(argumentType), sames("{")),
  chainL(word(sames("}")), sames("}"))
); // tokenize
const assignmentOperation = chainR(
  assignmentOperator,
  option(interval),
  functionLiteral
);
const syntax = chainN(naming, option(returnType), assignmentOperation);
const defineFunction: Tokenizer<"define function"> = convert(
  syntax,
  ([name, returnType, fun]) => ({
    kind: "define function",
    value: {
      name,
      returnType,
      function: fun.join(""),
    },
  })
);

console.dir(
  defineFunction({ src: "f main: void = {test}".chars(), offset: 0 }),
  {
    depth: Number.MAX_VALUE,
  }
);
