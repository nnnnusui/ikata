#!/usr/bin/env node
import cac from "cac";
import * as fs from "fs";
import * as Path from "path";
import { glob } from "glob";
import { parse, transpile } from "../main";

const cli = cac();
cli
  .command("[input]", ".ik file or directory")
  .option("-o <output>", "template html file path")
  .action((input: string, options) => {
    if (!fs.existsSync(input)) return;
    const status = fs.statSync(input);
    const isDirectory = status.isDirectory();
    const root = isDirectory
      ? input + (input.endsWith("/") ? "" : "/")
      : Path.dirname(input);

    const pattern = isDirectory ? root + "**/*.ik" : input;
    const paths = glob.sync(pattern);
    paths.map((path) => {
      const relativePath = path.replace(root, "");
      const [, ...tails] = relativePath.split(".").reverse();
      const relativePathWithoutExtension = tails.reverse().join("");
      const outputRoot = options.o
        ? options.o + (options.o.endsWith("/") ? "" : "/")
        : root;
      console.log(options);
      const outputPath = outputRoot + relativePathWithoutExtension + ".ll";
      fs.readFile(path, { encoding: "utf8" }, (err, text) => {
        if (err) throw err;
        const parsed = parse(text);
        if (!parsed.ok) throw parsed;
        const outputDir = Path.dirname(outputPath);
        if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);
        fs.writeFile(outputPath, transpile(parsed.get), () => {});
        console.log(`writed to: ${outputPath}`);
      });
    });
  });
cli.help();
cli.parse();
