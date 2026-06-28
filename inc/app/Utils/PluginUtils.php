<?php

declare(strict_types=1);

namespace WpPluginBoilerplate\Utils;

defined('ABSPATH') || exit;

/**
 * PluginUtils class.
 *
 * Where static utility function live
 *
 * @since 0.1.0
 */
final class PluginUtils {
    /**
     * Log to the debug.log file.
     *
     * @param mixed ...$items Any item you want to log to the log file
     *
     * @return void
     *
     * @since 0.1.0
     */
    public static function debug(mixed ...$items) {
        if (true === \WP_DEBUG) {
            $hr_thick = "\n===========================================================================\n";
            $hr_thin = "\n---------------------------------------------------------------------------\n";

            $backtrace = debug_backtrace();
            $caller = array_shift($backtrace);
            $full_file = explode('/', $caller['file']);
            $file = end($full_file);
            $line = strval($caller['line']);
            $header = "File: {$file}\nLine: {$line}";
            $log = "{$hr_thick}{$header}{$hr_thin}";

            foreach ($items as $item) {
                if (is_array($item) || is_object($item)) {
                    $log .= print_r($item, true);
                } elseif (false === $item) {
                    $log .= 'false ';
                } elseif (null === $item) {
                    $log .= 'null ';
                } else {
                    $log .= ($item ?? '') . ' ';
                }
            }

            $log .= $hr_thick;
            error_log($log);
        }
    }
}
