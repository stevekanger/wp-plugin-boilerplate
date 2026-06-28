<?php

declare(strict_types=1);

namespace WpPluginBoilerplate\Tests\Unit;

use WP_UnitTestCase;
use WpPluginBoilerplate\Utils\PluginUtils;

/**
 * ExampleTest class.
 *
 * We use the global WP_UnitTestCase from wordpress testing lib.
 *
 * @since 0.1.0
 */
final class ExampleTest extends \WP_UnitTestCase {
    /**
     * Check if the wordpress users table exists so we know our database setup is correct.
     *
     * @since 0.1.0
     */
    public function testUsersTableExists() {
        PluginUtils::debug('Yay! A test has been run.');

        global $wpdb;
        $table_name = $wpdb->prefix . 'users';
        $this->assertEquals(
            $table_name,
            $wpdb->get_var($wpdb->prepare('SHOW TABLES LIKE %s', $table_name)),
        );
    }
}
