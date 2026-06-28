import fs from 'fs';
import getRootDir from '../utils/getRootDir';

/**
 * Find and replace for an array of files
 *
 * @param files Array of file paths
 * @param search The value to search for
 * @replace the value to replace with
 */
function replaceInFiles(
  files: string[],
  search: string | RegExp,
  replace: string,
) {
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    fs.writeFileSync(file, content.replace(search, replace));
  }
}

/**
 * Gets the files from a directory.
 *
 * @param directory The directory to search
 */
function getFilesFromDirectory(directory: string): string[] {
  return fs
    .readdirSync(directory, { recursive: true })
    .filter((item) => {
      if (fs.statSync(`${directory}/${item}`).isDirectory()) {
        return false;
      }

      return true;
    })
    .map((item) => {
      return `${directory}/${item}`;
    });
}

/**
 * Updates the namespaces in php files
 */
export default function updateNamespaces(phpNamespace: string) {
  const filesInc = getFilesFromDirectory(getRootDir('/inc/app'));
  const filesTestsUnit = getFilesFromDirectory(getRootDir('/tests/php/unit'));

  [filesInc, filesTestsUnit].forEach((files) => {
    replaceInFiles(files, /PluginNamespace/g, phpNamespace);
  });
}
