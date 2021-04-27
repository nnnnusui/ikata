import { textLiteral } from "../../main/tokenizer/textLiteral";
import { tokenizerTesterFrom } from "../env";

const kind = "text literal";
const { ok, check } = tokenizerTesterFrom(kind, textLiteral);
describe(kind, () => {
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
      check(`"one line\ttext literal"`).containSubset(
        ok("one line\ttext literal")
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
