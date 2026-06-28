import pathlib from 'path';

/**
 * Gets the root directory and if path is provided then it will be appended.
 *
 * @param path Any extra path you want appended to the root dir
 * @return The full path to the root dir and any extra if passed in
 */
export default function getRootDir(path?: string): string {
  return pathlib.join(__dirname, '..', '..', path || '');
}
