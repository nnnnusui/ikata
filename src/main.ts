import { init } from "./main/Context";
import { Tokenizer } from "./main/Tokenizer";
import { file } from "./main/tokenizer/file";
import { transpile } from "./main/transpiler/transpile";

export const parse = (source: string): ReturnType<Tokenizer<"file">> =>
  file(init(source));
export { transpile };
