import { Token, TokenKind } from "../Token";

export const transpile = (it: Token<TokenKind>): string => {
  switch (it.kind) {
    case "file":
      return it.value.map((it) => transpile(it)).join("");
    case "define function": {
      const { name, returnType, function: fun } = it.value;
      return `define ${returnType} @${name}() ${transpile(fun)}`;
    }
    case "function literal":
      return `{\n${it.value.orders.map((it) => transpile(it)).join("")}}`;
    case "raw literal":
      return `${it.value.value}\n`;
    default:
      return "";
  }
};
