<?php

declare(strict_types=1);

namespace WpPluginBoilerplate\Tests\Utils;

use WpPluginBoilerplate\App;

use const WpPluginBoilerplate\APP_BUILD_PATH;
use const WpPluginBoilerplate\APP_PREFIX;
use const WpPluginBoilerplate\APP_ROOT_DIR;
use const WpPluginBoilerplate\APP_ROOT_FILE;
use const WpPluginBoilerplate\APP_SLUG;
use const WpPluginBoilerplate\APP_TITLE;
use const WpPluginBoilerplate\APP_VIEW_PATH;

defined('ABSPATH') || exit;

final class UnitTestUtils {
    /**
     * Gets the project root dir.
     *
     * @param string $path Optional. Any path you want to append (requires you to add the preceeding /)
     *
     * @since 1.0.0
     */
    public static function get_root_dir(string $path = ''): string {
        return dirname(__DIR__, 3) . $path;
    }

    /**
     * Creates a test app instance.
     *
     * @since 1.0.0
     */
    public static function make_app(
        string $title = APP_TITLE,
        string $prefix = APP_PREFIX,
        string $slug = APP_SLUG,
        string $version = '1.0.0',
        string $rest_version = 'v1',
        string $root_dir = APP_ROOT_DIR,
        string $root_file = APP_ROOT_FILE,
        string $build_path = APP_BUILD_PATH,
        string $view_path = APP_VIEW_PATH,
    ): App {
        return new App(
            title: $title,
            prefix: $prefix,
            slug: $slug,
            version: $version,
            rest_version: $rest_version,
            root_dir: $root_dir,
            root_file: $root_file,
            build_path: $build_path,
            view_path: $view_path,
        );
    }
}
