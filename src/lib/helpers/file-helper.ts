import fs from 'fs/promises';
import path from 'path';

export type FileError = {
  message: string;
};

/**
 * Reads a directory and returns an array of filenames.
 *
 * @param localPath - The relative path to the directory to be read.
 * @returns A promise that resolves to an array of filenames as strings.
 * @throws A FileError if the directory cannot be read.
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

/**
 * Reads a file and returns its content as a string.
 *
 * @param localPath - The relative path to the file to be read.
 * @returns A promise that resolves to the content of the file as a string.
 * @throws A FileError if the file cannot be read.
 */
export async function readFile(localPath: string): Promise<string> {
  const filePath = path.join(process.cwd(), localPath);
  try {
    const fileContent = await fs.readFile(filePath, 'utf8');
    return fileContent;
  } catch (error) {
    const fileError: FileError = {
      message: getErrorMessage(error),
    };
    throw fileError;
  }
}

/**
 * Writes content to a file at the specified path.
 *
 * @param localPath - The relative path to the file where content will be written.
 * @param content - The content to be written to the file.
 * @returns A promise that resolves when the content has been successfully written.
 * @throws A FileError if the file cannot be written.
 */
export async function writeFile(
  localPath: string,
  content: string
): Promise<void> {
  const filePath = path.join(process.cwd(), localPath);
  try {
    await fs.writeFile(filePath, content, 'utf8');
  } catch (error) {
    const fileError: FileError = {
      message: getErrorMessage(error),
    };
    throw fileError;
  }
}

/**
 * Extracts the error message from an unknown error type.
 *
 * @param error - The unknown error object.
 * @returns The extracted error message as a string.
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  } else if (typeof error === 'string') {
    return error;
  } else {
    try {
      return JSON.stringify(error);
    } catch {
      return 'Unknown Error';
    }
  }
}
