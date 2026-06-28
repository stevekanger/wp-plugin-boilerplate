import fs from 'fs';
import path from 'path';
import Mustache from 'mustache';
import getRootDir from '../utils/getRootDir';
import getDirectoryFiles from './getDirectoryFiles';
import { TemplateVars } from './types';

/**
 * Writes a mustache file to its desired location
 *
 * @param templateLocation The path to the template file.
 * @param outputLocation The path of the output file
 * @param templateVars The full template variables object
 */
function writeTemplateFile(
  templateLocation: string,
  outputLocation: string,
  templateVars: TemplateVars,
) {
  const templateContent = fs.readFileSync(templateLocation, 'utf8');
  const renderedTemplate = Mustache.render(templateContent, templateVars);

  if (renderedTemplate) {
    fs.writeFileSync(outputLocation, renderedTemplate, 'utf8');
  }
}

/**
 * Updates files with the template
 *
 * @param templateVars The template variables from the user
 */
export default function updateTemplateFiles(templateVars: TemplateVars) {
  const templateFiles = getDirectoryFiles(
    getRootDir('dev-tools', 'init', 'templates'),
    false,
  );

  templateFiles.forEach((template) => {
    if (template === 'entry-file.php.mustache') {
      writeTemplateFile(
        path.join(__dirname, 'templates', template),
        getRootDir(`${templateVars.slug}.php`),
        templateVars,
      );

      return;
    }

    const filename = template.replace('.mustache', '');

    writeTemplateFile(
      path.join(__dirname, 'templates', template),
      getRootDir(filename),
      templateVars,
    );
  });
}
