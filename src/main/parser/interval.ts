import { orN, repeat } from "combinator-node";
import { sames } from "./sames";

const space = sames(" ");
const eol = sames("\n");
export const interval = repeat(orN(space, eol));
