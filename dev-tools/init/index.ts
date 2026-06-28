import fs from 'fs';
import Mustache from 'mustache';
import path from 'path';
import commandLinePrompt from '../utils/commandLinePrompt';
import getRootDir from '../utils/getRootDir';
import {
  authorDescription,
  createInfoDescription,
  initDescription,
  phpNamespaceDescription,
  phpVersionDescription,
  titleDescription,
  wordpressVersionDescription,
} from './promptDescriptions';
import { TemplateVars } from './types';
import updateNamespaces from './updateNamespaces';

enum PromptColors {
  black = 30,
  red = 31,
  green = 32,
  yellow = 33,
  blue = 34,
  magenta = 35,
  cyan = 36,
  white = 37,
}

type PromptValidator = (val: string) => void;

/**
 * Logs to the console in a specific color
 *
 * @paramn color The color of text
 * @param txt The text to log
 */
function consoleColor(color: PromptColors, txt: string) {
  console.log(`\x1b[${color}m%s\x1b[0m`, txt);
}

/**
 * Validates that a prompt is not empty
 *
 * @param field The field that you are validating
 */
function validateIsSet(field: string) {
  return (val: string) => {
    if (val === '') {
      throw new Error(`${field} is required. Aborting`);
    }
  };
}

/**
 * Validates the (y/n) promts
 *
 * @param field The field to validate
 */
function validateIsY(field: string) {
  return (val: string) => {
    if (val.toLowerCase().trim() !== 'y') {
      throw new Error(`${field} not confirmed. Aborting`);
    }
  };
}

/**
 * Prompts the user for input
 *
 * @param color The ascii color for the description
 * @param prompt The users prompt
 */
async function prompt(
  prompt: string,
  description: string,
  validator: PromptValidator,
  color: PromptColors = PromptColors.white,
) {
  consoleColor(color, description);
  const answer = await commandLinePrompt(prompt);
  validator(answer);

  return answer;
}

/**
 * Writes a mustache file to its desired location
 *
 * @param template The template file to use. Not the full path just the filename.
 * @param outputFile Full path of the output file
 * @param templateVars The full template variables object
 */
async function writeTemplateFile(
  template: string,
  outputFile: string,
  templateVars: TemplateVars,
) {
  const templateContent = fs.readFileSync(
    path.join(__dirname, 'templates', template),
    'utf8',
  );

  const renderedTemplate = Mustache.render(templateContent, templateVars);

  if (renderedTemplate) {
    fs.writeFileSync(outputFile, renderedTemplate, 'utf8');
  }
}

/**
 * Starts the init process
 */
async function main() {
  try {
    await prompt(
      'Continue? (y/n): ',
      initDescription,
      validateIsY('Continue'),
      PromptColors.yellow,
    );

    const title = await prompt(
      'Title: ',
      titleDescription,
      validateIsSet('Title'),
      PromptColors.green,
    );
    const author = await prompt(
      'Author: ',
      authorDescription,
      validateIsSet('Author'),
      PromptColors.green,
    );
    const wordpressVersion = await prompt(
      'Wordrpess Version: ',
      wordpressVersionDescription,
      validateIsSet('Wordpress Version'),
      PromptColors.green,
    );
    const phpVersion = await prompt(
      'Php Version: ',
      phpVersionDescription,
      validateIsSet('Php Version'),
      PromptColors.green,
    );
    const phpNamespace = await prompt(
      'Php Namespace: ',
      phpNamespaceDescription,
      validateIsSet('Php Namespace'),
      PromptColors.green,
    );
    const slug = title.toLowerCase().replaceAll(' ', '-');
    const prefix = title.toLowerCase().replaceAll(' ', '_');

    const templateVars: TemplateVars = {
      title,
      slug,
      prefix,
      author,
      wordpressVersion,
      phpVersion,
      phpNamespace,
    };

    await prompt(
      'Is this correct? (y/n): ',
      createInfoDescription(templateVars),
      validateIsY('Info'),
      PromptColors.green,
    );

    try {
      fs.unlinkSync(getRootDir('/wp-plugin-boilerplate.php'));
      fs.rmSync(getRootDir('/.git'), { recursive: true });
    } catch (err) {
      console.log(err);
    }

    // Create the entry file
    writeTemplateFile(
      'entry-file.php.mustache',
      getRootDir(`/${slug}.php`),
      templateVars,
    );

    // create package.json
    writeTemplateFile(
      'package.json.mustache',
      getRootDir(`/package.json`),
      templateVars,
    );

    // create composer.json
    writeTemplateFile('composer.json.mustache', getRootDir(`/composer.json`), {
      ...templateVars,
      author: author.toLowerCase().replaceAll(' ', ''),
    });

    // create .env
    writeTemplateFile('.env.mustache', getRootDir(`/.env`), templateVars);

    // create .example.env
    writeTemplateFile(
      '.env.mustache',
      getRootDir(`/.example.env`),
      templateVars,
    );

    // create readme.txt
    writeTemplateFile(
      'readme.txt.mustache',
      getRootDir(`/readme.txt`),
      templateVars,
    );

    // create README.md
    writeTemplateFile(
      'README.md.mustache',
      getRootDir(`/README.md`),
      templateVars,
    );

    // create dev-tools/config.ts
    writeTemplateFile(
      'config.ts.mustache',
      getRootDir(`/dev-tools/config.ts`),
      templateVars,
    );

    // Update the namespaces
    updateNamespaces(phpNamespace);

    consoleColor(PromptColors.green, '\nFinished');
  } catch (err) {
    consoleColor(PromptColors.red, (err as Error).message);
  }
}

main();
