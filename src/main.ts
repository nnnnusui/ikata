import { init } from "./main/Context";
import { Tokenizer } from "./main/Tokenizer";
import { file } from "./main/tokenizer/file";
import { transpile } from "./main/transpiler/transpile";

export const parse = (source: string): ReturnType<Tokenizer<"file">> =>
  file(init(source));

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

console.log(transpile(result.get));
