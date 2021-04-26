import { Char } from "./Char";
import "./Char";

export type Context = {
  src: Char[];
  offset: number;
};
export const init = (source: string): Context => ({
  src: source.chars(),
  offset: 0,
});
