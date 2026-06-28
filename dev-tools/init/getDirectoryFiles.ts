import fs from 'fs';

/**
 * Gets the files from a directory.
 *
 * @param directory The directory to search
 * @param appendDir Whether to append the filename to the directory for a full path
 */
export default function getDirectoryFiles(
  directory: string,
  appendDirname: boolean,
): string[] {
  return fs
    .readdirSync(directory, { recursive: true })
    .filter((item) => {
      if (fs.statSync(`${directory}/${item}`).isDirectory()) {
        return false;
      }

      return true;
    })
    .map((item) => {
      if (!appendDirname) {
        return `${item}`;
      }

      return `${directory}/${item}`;
    });
}
