// import { syntax } from "./test.nts";
import fs from "fs-extra";

// type SyntaxType = "Alias" | "Component";

// type FileSyntax = {
//   filename: string;
//   content: string[];
// }

const parseSyntax = () => {
  const dirFiles = fs.readdirSync("./nts", { withFileTypes: true });

  const fileSyntax = [];
  for (let dirent of dirFiles) {
    if (!dirent.isFile()) continue;

    const content = fs.readFileSync(`./nts/${dirent.name}`);
    fileSyntax.push({
      filename: dirent.name,
      content: parseBufferFileContent(content),
    });
  }

  fileSyntax.forEach((data) => {
    writeFile(data.filename, data.content);
  });

  return fileSyntax;
};

function writeFile(filename: string, contents: string[]) {
  const javascriptFileName = filename.replace(".nts", ".js");
  const rootDirName = "nts";
  const baseDirName = "output";
  const dirPath = `${rootDirName}/${baseDirName}`;
  const filePath = `${dirPath}/${javascriptFileName}`;

  fs.rmSync(dirPath, { recursive: true, force: true });
  fs.mkdirSync(dirPath);

  // fs.createFileSync(filePath);

  contents.forEach((content) => {
    try {
      fs.appendFileSync(filePath, content + "\n");
    } catch (error) {
      console.log("error: ", error);
    }
  });
}

function parseBufferFileContent(content: Buffer): any {
  const rawStringContent = content.toString();
  const contents = rawStringContent.split("\n");
  const finalContents = [];

  for (let syntax of contents) {
    if (syntax.trim().length > 0) {
      if (syntax.startsWith("alias")) {
        const aliasContent = syntax
          .trim()
          .split("(")[1]
          .split(")")[0]
          .split(",");
        finalContents.push(`const ${aliasContent[0]} = ${aliasContent[1]};`);
      } else {
        finalContents.push(syntax);
      }
    }
  }

  return finalContents;
}

parseSyntax();
