import { Combinator } from "combinator-node";
import { Char } from "../../Char";
import { Parser } from "../../Parser";

export const any: Parser<Char> = (context) => {
  const [head, ...tails] = context.src;
  if (!head) return Combinator.err(context, "any: no more sources.");
  const next = { src: tails, offset: context.offset + 1 };
  return Combinator.ok(next, head);
};
