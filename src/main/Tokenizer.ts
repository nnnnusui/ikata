import { Combinator } from "combinator-node";
import { Context } from "./Context";
import { Token, TokenKind } from "./Token";

export type Tokenizer<Kind extends TokenKind> = Combinator<
  Context,
  Token<Kind>
>;
