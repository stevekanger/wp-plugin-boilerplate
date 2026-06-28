import { TemplateVars } from './types';

export const initDescription = `
Caution: this will overwrite your existing files.`;

export const authorDescription = `
============================================================
Author
------------------------------------------------------------
Either your name or your organizations name.
============================================================`;

export const phpNamespaceDescription = `
============================================================
Php Namespace
------------------------------------------------------------
This will be used for all your local php file namespacing.

Example:
<?php

namespace PluginNamespace;
============================================================`;

export const phpVersionDescription = `
============================================================
Php Version
------------------------------------------------------------
Target php version.

https://wordpress.org/about/requirements/
https://www.php.net/supported-versions.php
============================================================`;

export const titleDescription = `
============================================================
Title
------------------------------------------------------------
Proper name for your package eg. "My Awesome Thing". 
A slug and prefix will be generated from this as well.

Example Output:
Title: My Awesome Thing
slug: my-awesome-thing
prefix: my_awesome_thing
============================================================`;

export const wordpressVersionDescription = `
============================================================
Wordpress Version
------------------------------------------------------------
Target wordpress version. Probably should choose latest.

https://develop.svn.wordpress.org/tags/ 
============================================================`;

export function createInfoDescription({
  title,
  author,
  wordpressVersion,
  phpVersion,
  phpNamespace,
  slug,
  prefix,
}: TemplateVars) {
  const info = `
============================================================
Your info
------------------------------------------------------------
Title: ${title}
Slug: ${slug}
Prefix: ${prefix}
Author: ${author}
Wordpress Version: ${wordpressVersion}
Php Version: ${phpVersion}
Php Namespace: ${phpNamespace}
============================================================`;

  return info;
}
