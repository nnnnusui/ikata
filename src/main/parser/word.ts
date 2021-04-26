import { Parser } from "../Parser";
import { interval } from "./interval";
import { strNot } from "./strNot";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const word = (...nots: Parser<any>[]): Parser<string> =>
  strNot(interval, ...nots);
