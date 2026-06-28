import fs from 'fs';
import getRootDir from '../utils/getRootDir';
import getDirectoryFiles from './getDirectoryFiles';

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
 * Updates the namespaces in php files
 */
export default function updatePhpNamespaces(phpNamespace: string) {
  const filesInc = getDirectoryFiles(getRootDir('/inc/app'), true);
  const filesTestsUnit = getDirectoryFiles(getRootDir('/tests/php/unit'), true);

  [filesInc, filesTestsUnit].forEach((files) => {
    replaceInFiles(files, /PluginNamespace/g, phpNamespace);
  });
}
