import { defineFunction } from "../../main/tokenizer/defineFunction";
import { tokenizerTesterFrom } from "../env";

const kind = "define function";
const { ok, check } = tokenizerTesterFrom(kind, defineFunction);
describe(kind, () => {
  const fun = `{}`;
  describe("fail with", () => {
    it("prefix 'f ' not exists", () =>
      check(`main = ${fun}`).containSubset({ ok: false }));
    it("space after 'f' not exists", () =>
      check(`fmain = ${fun}`).containSubset({ ok: false }));
    it("interval before '=' not exists", () =>
      check(`f main= ${fun}`).containSubset({ ok: false }));
  });

  describe("Succeed with", () => {
    it("full syntax", () =>
      check(`f main:void =${fun}`).containSubset(
        ok({
          name: "main",
          returnType: "void",
          function: { kind: "function literal" },
        })
      ));

    it("interval between Name and ':'", () =>
      check(`f main  \n  :void = ${fun}`).containSubset(ok({})));
    it("interval between ':' and Type", () =>
      check(`f main:  \n  void = ${fun}`).containSubset(ok({})));
    it("interval between Type and '='", () =>
      check(`f main:void  \n  = ${fun}`).containSubset(ok({})));
    it("interval between '=' and Fun", () =>
      check(`f main:void =  \n  ${fun}`).containSubset(ok({})));

    it("no return type specified", () =>
      check(`f main = ${fun}`).containSubset(ok({ name: "main" })));
  });
});
