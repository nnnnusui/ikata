import { expect } from "chai";
import { init } from "../../main/Context";
import { rawLiteral } from "../../main/tokenizer/rawLiteral";
import "../env";

const ok = (value: string) => ({
  ok: true,
  get: { kind: "raw literal", value: { kind: "text literal", value } },
});
const check = (source: string) => expect(rawLiteral(init(source))).to;
describe("rawLiteral", () => {
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
