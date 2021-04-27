import { rawLiteral } from "../../main/tokenizer/rawLiteral";
import { tokenizerTesterFrom } from "../env";

const kind = "raw literal";
const { ok: rawOk, check } = tokenizerTesterFrom(kind, rawLiteral);

const ok = (value: string) => rawOk({ kind: "text literal", value });
describe(kind, () => {
  describe("fail with", () => {
    it("prefix not exists", () => check(`aw("")`).containSubset({ ok: false }));
    it("value not exists", () => check(`raw()`).containSubset({ ok: false }));
    it("enclosure not closed", () =>
      check(`raw("hoa"`).containSubset({ ok: false }));
  });

  describe("Succeed with", () => {
    it("empty", () => check(`raw("")`).containSubset(ok("")));

    it("has eol", () =>
      check(`raw(
      ""
      )`).containSubset(ok("")));

    it("get raw text", () =>
      check(`raw("
      | raw text;
      | line2;
      ")`).containSubset(ok(" raw text;\n line2;")));
  });
});
