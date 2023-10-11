import fs from "fs/promises";
import path from "path";

export type FileError = {
  message: string;
};
/* 
  read a directory and return all the filenames from that directory
*/
export async function readDirectory(localPath: string): Promise<string[]> {
  const directoryPath = path.join(process.cwd(), localPath);
  try {
    const fileNames = await fs.readdir(directoryPath);
    return fileNames;
  } catch (error) {
    const fileError: FileError = {
      message: getErrorMessage(error),
    };
    throw fileError;
  }
}

/* 
  read a file and return it's content as string
*/
export async function readFile(localPath: string): Promise<string> {
  console.log(`trying to read: ${localPath}`);
  console.log(`full path: ${path.join(process.cwd(), localPath)}`);
  const filePath = path.join(process.cwd(), localPath);
  try {
    const fileContent = await fs.readFile(filePath, "utf-8");
    return fileContent;
  } catch (error) {
    const fileError: FileError = {
      message: getErrorMessage(error),
    };
    throw fileError;
  }
}

export async function readFile2(localPath: string): Promise<string> {
  console.log(`trying to read: ${localPath}`);
  try {
    const fileContent = await fs.readFile(localPath, "utf-8");
    return fileContent;
  } catch (error) {
    const fileError: FileError = {
      message: getErrorMessage(error),
    };
    throw fileError;
  }
}

/* 
  read content to a file at localPath parameter
*/
export async function writeFile(
  localPath: string,
  content: string
): Promise<void> {
  const filePath = path.join(process.cwd(), localPath);
  try {
    await fs.writeFile(filePath, content, "utf-8");
  } catch (error) {
    const fileError: FileError = {
      message: getErrorMessage(error),
    };
    throw fileError;
  }
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  } else if (typeof error === "string") {
    return error;
  } else {
    try {
      return JSON.stringify(error);
    } catch {
      return "Unknown Error";
    }
  }
}
