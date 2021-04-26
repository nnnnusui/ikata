import { Combinator } from "combinator-node";
import { Char } from "./Char";

type Context<Src> = {
  src: Src;
  offset: number;
};
export type Parser<T> = Combinator<Context<Char[]>, T>;
