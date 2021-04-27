import { chainR, option, or, repeat } from "combinator-node";
import { init } from "./main/Context";
import { interval } from "./main/parser/interval";
import { defineFunction } from "./main/tokenizer/defineFunction";
import { rawLiteral } from "./main/tokenizer/rawLiteral";
import { transpile } from "./main/transpiler/transpile";

const topLevel = or(defineFunction, rawLiteral);
const syntax = repeat(chainR(option(interval), topLevel));
const parse = (source: string) => syntax(init(source));

const text = `
raw("
|target triple = "x86_64-unknown-unknown-elf"
")
f KernelMain: void = {
  raw("
  |  br label %1
  |1:
  |  call void asm sideeffect "hlt", ""()
  |  br label %1
  ")
}
`;
const result = parse(text);
console.dir(result, { depth: Number.MAX_VALUE });
if (!result.ok) throw new Error("");

const transpiled = result.get.map((it) => transpile(it)).join("");
console.log(transpiled);
