import fs from 'fs';
import Mustache from 'mustache';
import path from 'path';
import getRootDir from '../utils/getRootDir';
import { TemplateVars } from './types';
import commandLinePrompt from '../utils/commandLinePrompt';
import {
  titleDescription,
  authorDescription,
  wordpressVersionDescription,
  phpVersionDescription,
  phpNamespaceDescription,
  createInfoDescription,
  initDescription,
} from './promptDescriptions';
import updateNamespaces from './updateNamespaces';

enum PromptColors {
  red = 31,
  green = 32,
  yellow = 33,
}

type PromptValidator = (val: string) => void;

function validateIsSet(field: string) {
  return (val: string) => {
    if (val === '') {
      throw new Error(`${field} is required. Aborting`);
    }
  };
}

function validateIsY(field: string) {
  return (val: string) => {
    if (val.toLowerCase().trim() !== 'y') {
      throw new Error(`${field} not confirmed. Aborting`);
    }
  };
}

async function prompt(
  color: number,
  prompt: string,
  description: string,
  validator: PromptValidator,
) {
  console.log(`\x1b[${color}m%s\x1b[0m`, description);
  const answer = await commandLinePrompt(prompt);
  validator(answer);

  return answer;
}

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

async function main() {
  try {
    await prompt(
      PromptColors.yellow,
      'Continue? (y/n): ',
      initDescription,
      validateIsY('Continue'),
    );

    const title = await prompt(
      PromptColors.green,
      'Title: ',
      titleDescription,
      validateIsSet('Title'),
    );
    const author = await prompt(
      PromptColors.green,
      'Author: ',
      authorDescription,
      validateIsSet('Author'),
    );
    const wordpressVersion = await prompt(
      PromptColors.green,
      'Wordrpess Version: ',
      wordpressVersionDescription,
      validateIsSet('Wordpress Version'),
    );
    const phpVersion = await prompt(
      PromptColors.green,
      'Php Version: ',
      phpVersionDescription,
      validateIsSet('Php Version'),
    );
    const phpNamespace = await prompt(
      PromptColors.green,
      'Php Namespace: ',
      phpNamespaceDescription,
      validateIsSet('Php Namespace'),
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
      PromptColors.green,
      'Is this correct? (y/n): ',
      createInfoDescription(templateVars),
      validateIsY('Info'),
    );

    try {
      fs.unlinkSync(getRootDir('/wp-plugin-boilerplate.php'));
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

    // Update the namespaces in inc/app
    updateNamespaces(phpNamespace);

    console.log(`\x1b[${PromptColors.green}m%s\x1b[0m`, '\nFinished!');
  } catch (err) {
    console.log(`\x1b[${PromptColors.red}m%s\x1b[0m`, (err as Error).message);
  }
}

main();
