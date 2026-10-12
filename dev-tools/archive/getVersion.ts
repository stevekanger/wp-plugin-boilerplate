import { config as dotenvConfig } from 'dotenv';
import fs from 'fs';
import packageJson from '../../package.json';
import composerJson from '../../composer.json';
import getEnv from '../utils/getEnv';
import getRootDir from '../utils/getRootDir';

dotenvConfig({ quiet: true });

const entryFile = process.env.ENTRY_FILE;

if (!entryFile) {
  throw new Error('No entry file specified in .env');
}

/**
 * Gets the version from the php entry file.
 *
 * @param {string} filePath The path to the entry file
 * @return array
 *
 * @since 0.1.0
 */
async function getVersionFromEntryFile(filePath: string) {
  const content = await fs.promises.readFile(filePath, 'utf8');

  /**
   * Matches the plugin version from the PHP docblock header.
   *
   * Example matched line:
   *   * Version: 0.1.0
   *
   * Breakdown:
   *   \* Version:  = literal docblock "Version:" line
   *   \s*          = optional whitespace after the colon
   *   ([0-9.]+)    = captures the version number (digits and dots)
   *
   * match[1] will contain the version string.
   */
  const headerMatch = content.match(/\* Version:\s*([0-9.]+)/);

  if (!headerMatch || !headerMatch[1]) {
    throw new Error('Could not find the version in php entry header.');
  }

  /**
   * Matches the version passed as the first argument to PluginConfig::init().
   *
   * Example matched code:
   *   PluginConfig::init(
   *       "0.1.0",
   *
   * Breakdown:
   *   PluginConfig::init = literal method call
   *   \(                 = opening parenthesis
   *   \s*                = optional whitespace / newlines
   *   ["']               = opening quote (single or double)
   *   ([0-9.]+)          = captures the version string
   *   ["']               = closing quote
   *   \s*                = optional whitespace
   *   ,                  = ensures it is the first argument
   *
   * match[1] will contain the version string.
   */
  const configMatch = content.match(
    /PluginConfig::init\(\s*["']([0-9.]+)["']\s*,/,
  );

  if (!configMatch || !configMatch[1]) {
    throw new Error('Could not find the version in php entry header.');
  }

  return [headerMatch[1], configMatch[1]];
}

/**
 * Logs the package versions in command line
 *
 * @param {string} packageVersion
 * @param {string} composerVersion
 * @param {string} headerVersion
 * @param {string} configVersion
 * @returns void
 *
 * @since 0.1.0
 */
function showVersions(
  packageVersion: string,
  composerVersion: string,
  headerVersion: string,
  configVersion: string,
) {
  console.log(`
=========================================
Versions 
-----------------------------------------
package.json = ${packageVersion} 
composer.json = ${composerVersion} 
entry file header = ${headerVersion}
entry file config = ${configVersion}
=========================================
  `);
}

/**
 * Gets the plugin version
 *
 * Checks all files that should contain a plugin version.
 * Checks whether all versions are the same and return the version.
 *
 * @returns string
 *
 * @since 0.1.0
 */
export default async function getPluginVersion() {
  const packageVersion = packageJson.version;
  const composerVersion = composerJson.version;

  const entryFilePath = getRootDir(getEnv('ENTRY_FILE'));
  const [headerVersion, configVersion] =
    await getVersionFromEntryFile(entryFilePath);

  const versions = [
    packageVersion,
    composerVersion,
    headerVersion,
    configVersion,
  ];

  const allMatch = versions.every((v) => v === packageVersion);

  if (!allMatch) {
    showVersions(packageVersion, composerVersion, headerVersion, configVersion);
    throw new Error('You have mismatch versions in your files.');
  }

  return packageVersion;
}
