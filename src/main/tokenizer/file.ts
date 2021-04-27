import { or, repeat, chainR, option } from "combinator-node";
import { interval } from "../parser/interval";
import { defineFunction } from "./defineFunction";
import { rawLiteral } from "./rawLiteral";
import { tokenize } from "./tokenize";

const topLevel = or(defineFunction, rawLiteral);
const syntax = repeat(chainR(option(interval), topLevel));
export const file = tokenize(syntax, (it) => ({ kind: "file", value: it }));
