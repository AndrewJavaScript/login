export default [
  {
    files: [
      "src/**/*.js",
      "src/**/*.ts",
    ],
    rules: {
      'consistent-return': 'off',
      'func-names': 'off',
      indent: 'off',
      'import/extensions': 'off',
      'import/newline-after-import': [
        'error',
        {
          count: 1,
        },
      ],
      'import/no-unresolved': 'off',
      'import/prefer-default-export': 'off',
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'type', 'index', 'parent', 'sibling'],
          pathGroups: [
            {
              pattern: 'vue',
              group: 'builtin',
              position: 'before',
            },
            {
              pattern: '@/*',
              group: 'external',
              position: 'after',
            },
            {
              pattern: '@komus/core',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '**/*.vue',
              group: 'sibling',
              position: 'after',
            },
            {
              pattern: './*.vue',
              group: 'sibling',
              position: 'after',
            },
            {
              pattern: '**/*.**',
              group: 'index',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['type'],
          alphabetize: {
            order: 'asc',
          },
          'newlines-between': 'never',
        },
      ],
      'no-continue': 'off',
      'new-cap': 'warn',
      'no-console': [
        'error',
        {
          allow: ['error', 'warn'],
        },
      ],
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      'no-else-return': 'error',
      'no-inline-comments': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      'no-nested-ternary': 'error',
      'no-param-reassign': 'off',
      'no-return-assign': 'off',
      'no-plusplus': 'off',
      'no-restricted-globals': 'warn',
      'no-undef': 'off',
      'no-use-before-define': ['error', { functions: false }],
      'no-unused-expressions': [
        'error',
        {
          allowTernary: true,
          allowShortCircuit: true,
        },
      ],
      'no-underscore-dangle': 'off',
      'no-unneeded-ternary': 'error',
      'no-var': 'error',
      'object-shorthand': 'error',
      'padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          prev: 'if',
          next: '*',
        },
        {
          blankLine: 'always',
          prev: '*',
          next: 'if',
        },
        {
          blankLine: 'always',
          prev: 'multiline-block-like',
          next: '*',
        },
      ],
      'prefer-arrow-callback': 'error',
      'prefer-const': 'error',
      'prefer-template': 'error',
      'global-require': 0,
      'vue/html-comment-content-newline': ['error'],
      'vue/prefer-true-attribute-shorthand': ['error', 'always'],
      'vue/no-v-html': 'off',
      'vue/attributes-order': [
        'error',
        {
          order: [
            'DEFINITION',
            'LIST_RENDERING',
            'CONDITIONALS',
            'RENDER_MODIFIERS',
            'GLOBAL',
            ['UNIQUE', 'SLOT'],
            'TWO_WAY_BINDING',
            'OTHER_DIRECTIVES',
            'ATTR_STATIC',
            'ATTR_SHORTHAND_BOOL',
            'ATTR_DYNAMIC',
            'EVENTS',
            'CONTENT',
          ],
          alphabetical: false,
        },
      ],
      'vue/first-attribute-linebreak': [
        'error',
        {
          singleline: 'ignore',
          multiline: 'below',
        },
      ],
      'vue/no-reserved-component-names': [
        'error',
        {
          disallowVueBuiltInComponents: false,
        },
      ],
      'vue/component-name-in-template-casing': [
        'error',
        'kebab-case',
        {
          registeredComponentsOnly: true,
          ignores: [],
        },
      ],
      'vue/html-button-has-type': [
        'error',
        {
          button: true,
          submit: true,
          reset: true,
        },
      ],
      'vue/require-prop-types': ['error'],
      'vue/component-definition-name-casing': ['error', 'PascalCase'],
      'vue/attribute-hyphenation': ['error', 'always'],
      'vue/require-default-prop': 'error',
      'vue/order-in-components': ['error'],
      'vue/no-template-shadow': ['error'],
      'vue/no-empty-component-block': ['error'],
      'vue/no-static-inline-styles': ['error'],
      'vue/padding-line-between-tags': [
        'error',
        [
          {
            blankLine: 'always',
            prev: '*',
            next: '*',
          },
        ],
      ],
      'vue/block-lang': [
        'error',
        {
          script: {
            lang: 'ts',
          },
          style: {
            lang: 'stylus',
          },
        },
      ],
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      'no-return-await': 'off',
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': [
        'error',
        {
          allow: ['Vue', 'state', 'getters'],
        },
      ],
      '@typescript-eslint/prefer-optional-chain': 'off',
      'import/no-extraneous-dependencies': 'off',
      'no-relative-import-paths/no-relative-import-paths': [
        'warn',
        { allowSameFolder: true, prefix: '@', rootDir: 'src' },
      ],
      'vue/component-api-style': ['error', ['script-setup', 'composition']],
      'vue/define-emits-declaration': ['error', 'type-based'],
      'vue/define-macros-order': [
        'error',
        {
          order: ['defineOptions', 'defineProps', 'defineEmits', 'defineSlots'],
        },
      ],
      'vue/define-props-declaration': ['error', 'type-based'],
      'vue/match-component-file-name': [
        'error',
        {
          extensions: ['vue', 'ts'],
          shouldMatchCase: true,
        },
      ],
      'vue/next-tick-style': ['error', 'promise'],
      'vue/no-deprecated-model-definition': [
        'error',
        {
          allowVue3Compat: false,
        },
      ],
      'vue/no-ref-object-reactivity-loss': ['error'],
      'vue/no-root-v-if': ['error'],
      'vue/prefer-define-options': ['error'],
      'vue/require-macro-variable-name': [
        'error',
        {
          defineProps: 'props',
          defineEmits: 'emit',
          defineSlots: 'slots',
          useSlots: 'slots',
          useAttrs: 'attrs',
        },
      ],
      'vue/require-name-property': 'off',
      'vue/require-typed-ref': ['error'],
      'vue/v-on-handler-style': ['error', ['method', 'inline']],
      'vue/valid-define-options': ['error'],
      'vue/multi-word-component-names': ['error'],
    },
  }
]