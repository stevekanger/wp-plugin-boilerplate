import fs from 'fs';

import getRootDir from '../utils/getRootDir';

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

export default function updateNamespaces(phpNamespace: string) {
  const files = fs
    .readdirSync(getRootDir('/inc/app'), { recursive: true })
    .filter((item) => {
      if (fs.statSync(getRootDir(`/inc/app/${item}`)).isDirectory()) {
        return false;
      }

      return true;
    })
    .map((item) => {
      return getRootDir(`/inc/app/${item}`);
    });

  replaceInFiles(files, /WpPluginBoilerplate/g, phpNamespace);
}
