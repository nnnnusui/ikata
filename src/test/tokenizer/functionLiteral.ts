import { functionLiteral } from "../../main/tokenizer/functionLiteral";
import { tokenizerTesterFrom } from "../env";

const kind = "function literal";
const { ok, check } = tokenizerTesterFrom(kind, functionLiteral);
describe(kind, () => {
  const order = `raw("sample")`;
  describe("fail with", () => {
    it("enclosure not exists", () =>
      check(`${order}`).containSubset({ ok: false }));
    it("enclosure don't started", () =>
      check(`${order}}`).containSubset({ ok: false }));
    it("enclosure don't closed", () =>
      check(`{${order}`).containSubset({ ok: false }));
  });

  describe("Succeed with", () => {
    it("empty", () => check(`{}`).containSubset(ok({ orders: { length: 0 } })));

    it("has argumentType", () =>
      check(`void{}`).containSubset(ok({ argumentType: "void" })));

    it("has order", () =>
      check(`{${order}}`).containSubset(ok({ orders: { length: 1 } })));

    it("interval before order", () =>
      check(`{  \n  ${order}}`).containSubset(ok({ orders: { length: 1 } })));
    it("interval after order", () =>
      check(`{${order}  \n  }`).containSubset(ok({ orders: { length: 1 } })));

    it("has orders separated by semicolon", () =>
      check(`{${order};${order}}`).containSubset(
        ok({ orders: { length: 2 } })
      ));

    it("has orders separated by line break", () =>
      check(`{
      ${order}
      ${order}
    }`).containSubset(ok({ orders: { length: 2 } })));
  });
});
