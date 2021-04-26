import { Combinator } from "combinator-node";
import { Context } from "./Context";

export type Parser<T> = Combinator<Context, T>;
