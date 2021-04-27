import { init } from "./main/Context";
import { defineFunction } from "./main/tokenizer/defineFunction";

console.dir(defineFunction(init(`f main: void = {raw("sample")} `)), {
  depth: Number.MAX_VALUE,
});
