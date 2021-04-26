import { orN, repeat } from "combinator-node";
import { eol, space } from "./things";

export const interval = repeat(orN(space, eol));
