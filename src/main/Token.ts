/* eslint-disable @typescript-eslint/naming-convention */
const TokenKind = [
  "file",
  "define function",
  "function literal",
  "text literal",
  "raw literal",
] as const;
export type TokenKind = typeof TokenKind[number];

type RawLiteral = {
  kind: "raw literal";
  value: TextLiteral;
};

type TextLiteral = {
  kind: "text literal";
  value: string;
};

type FunctionLiteral = {
  kind: "function literal";
  value: {
    argumentType: string | null;
    orders: RawLiteral[];
  };
};

type DefineFunction = {
  kind: "define function";
  value: {
    name: string;
    returnType: string | null;
    function: FunctionLiteral;
  };
};

type TopLevel = DefineFunction | RawLiteral;
type File = {
  kind: "file";
  value: TopLevel[];
};

export type TokenValue =
  | File
  | DefineFunction
  | FunctionLiteral
  | TextLiteral
  | RawLiteral;

export type Token<Kind extends TokenKind> = Extract<
  TokenValue,
  Record<"kind", Kind>
>;
