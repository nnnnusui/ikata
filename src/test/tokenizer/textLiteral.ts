import { expect } from "chai";
import { init } from "../../main/Context";
import { textLiteral } from "../../main/tokenizer/textLiteral";
import "../env";

const ok = (value: string) => ({
  ok: true,
  get: { kind: "text literal", value },
});
const check = (source: string) => expect(textLiteral(init(source))).to;
describe("textLiteral", () => {
  describe("fail with", () => {
    it("enclosure not exists", () => check(`tes`).containSubset({ ok: false }));
    it("enclosure don't started", () =>
      check(`tes"`).containSubset({ ok: false }));
    it("enclosure don't closed", () =>
      check(`"tes`).containSubset({ ok: false }));
  });

  describe("Succeed with", () => {
    it("empty", () => check(`""`).containSubset(ok("")));

    it("one line", () =>
      expect(
        check(`"one line\ttext literal"`).containSubset(
          ok("one line\ttext literal")
        )
      ));

    it("paling by pipe", () =>
      check(`"
      |line1
      |  line2
      "`).containSubset(ok("line1\n  line2")));

    it("enclose lines", () =>
      // WARN: This value is affected by indentation.
      check(`"any
      tex
      ts"`).containSubset(ok("any\n      tex\n      ts")));
  });
});
