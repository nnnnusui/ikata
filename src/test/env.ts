import { expect } from "chai";
import { init } from "../main/Context";
import { TokenKind } from "../main/Token";
import { Tokenizer } from "../main/Tokenizer";
import * as chai from "chai";
import chaiSubset = require("chai-subset");

chai.use(chaiSubset);

/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types */
export const tokenizerTesterFrom = <Kind extends TokenKind>(
  kind: Kind,
  tokenizer: Tokenizer<Kind>
) => ({
  check: (source: string) => expect(tokenizer(init(source))).to,
  ok: (value: any) => ({
    ok: true,
    get: { kind, value },
  }),
});
/* eslint-enable @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types */
