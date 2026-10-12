<?php

declare(strict_types=1);

require __DIR__ . '/dev-tools/php-cs-fixer/ArrayFormatFixer.php';

$rules = [
    // Docs https://cs.symfony.com/doc/rules/index.html
    '@Symfony' => true,
    // Same line opening braces
    'braces_position' => [
        'functions_opening_brace' => 'same_line',
        'classes_opening_brace' => 'same_line',
        'control_structures_opening_brace' => 'same_line',
        'anonymous_functions_opening_brace' => 'same_line',
        'anonymous_classes_opening_brace' => 'same_line',
    ],
    // Single space before and after =>
    'binary_operator_spaces' => [
        'default' => 'single_space',
        'operators' => [
            '=>' => 'single_space',
        ],
    ],
    // Single line concat space
    'concat_space' => [
        'spacing' => 'one',
    ],
    // Proper spacing for function opening braces
    'function_declaration' => [
        'closure_fn_spacing' => 'none',
        'closure_function_spacing' => 'none',
    ],
    // Require strict types
    'declare_strict_types' => [
        'preserve_existing_declaration' => true,
    ],
    // Fix multiline args in methods/functions
    'method_argument_space' => true,
    // Allow multiline throws
    'single_line_throw' => false,
    // Replace superfluous else if
    'no_superfluous_elseif' => true,
    // Allow sentences in phpdoc descriptions
    'phpdoc_annotation_without_dot' => false,
    // Set statements that require blank lines before
    'blank_line_before_statement' => [
        'statements' => ['break', 'continue', 'declare', 'if', 'return', 'throw', 'try'],
    ],
    // Custom fixer
    'array_indentation' => false,
    'Custom/array_format' => true,
];

$finder = (new PhpCsFixer\Finder())
    ->in(__DIR__)
    ->notPath('inc/cache')
    ->notName('*.blade.php')
    ->exclude([
        'cache',
        'vendor',
        'build',
        'node_modules',
    ]);

return (new PhpCsFixer\Config())
    ->setRules($rules)
    ->setRiskyAllowed(true)
    ->setFinder($finder)
    ->registerCustomFixers([
        new CustomPhpCsFixer\ArrayFormatFixer(),
    ]);
