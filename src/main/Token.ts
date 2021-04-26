/* eslint-disable @typescript-eslint/naming-convention */
const TokenKind = ["define function", "text literal"] as const;
export type TokenKind = typeof TokenKind[number];

type DefineFunction = {
  kind: "define function";
  value: {
    name: string;
    returnType: string | null;
    function: string;
  };
};

type TextLiteral = {
  kind: "text literal";
  value: string;
};

export type TokenValue = DefineFunction | TextLiteral;
export type Token<Kind extends TokenKind> = Extract<
  TokenValue,
  Record<"kind", Kind>
>;
