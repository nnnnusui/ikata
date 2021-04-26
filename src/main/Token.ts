/* eslint-disable @typescript-eslint/naming-convention */
const TokenKind = ["define function"] as const;
export type TokenKind = typeof TokenKind[number];

type DefineFunction = {
  kind: "define function";
  value: {
    name: string;
    returnType: string | null;
    function: string;
  };
};

export type TokenValue = DefineFunction;
export type Token<Kind extends TokenKind> = Extract<
  TokenValue,
  Record<"kind", Kind>
>;
