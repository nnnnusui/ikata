import { convert } from "combinator-node";
import { Parser } from "../Parser";
import { Token, TokenKind } from "../Token";
import { Tokenizer } from "../Tokenizer";

export const tokenize = <Before, Kind extends TokenKind>(
  parser: Parser<Before>,
  func: (before: Before) => Token<Kind>
): Tokenizer<Kind> => convert(parser, (it) => func(it));
