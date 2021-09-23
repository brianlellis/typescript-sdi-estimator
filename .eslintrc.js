module.exports = {
    'env': {
        'browser': true,
        'commonjs': true,
        'es2021': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    'overrides': [
        {
            'files': ['*.ts', '*.tsx'], // Your TypeScript files extension
            'parserOptions': {
                'project': ['./tsconfig.json'], // Specify it only for TypeScript files
            },
        }
    ],
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaVersion': 12
    },
    'plugins': [
        '@typescript-eslint'
    ],
    'rules': {
        'indent': [
            'error',
            2
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ],
        '@typescript-eslint/no-inferrable-types':   'off',  // Intentionally turned off
        'non-var':                                  'off',  // Intentionally turned off
        'prefer-const':                             'off',  // Intentionally turned off
        'no-unused-vars':       'error',
        'no-global-assign':     'error',
        '@typescript-eslint/naming-convention': [
            'error',
            {
                selector:           ['variable', 'parameter'],
                types:              ['boolean', 'string', 'number', 'array'],
                format:             ['snake_case'],
                leadingUnderscore:  'allow',
                trailingUnderscore: 'allow',

            },
            {
                selector:           'variable',
                types:              ['boolean', 'string', 'number', 'array'],
                modifiers:          ['const'],
                format:             ['UPPER_CASE'],
                leadingUnderscore:  'allow',
                trailingUnderscore: 'allow'
            },
            {
                selector:           'function',
                format:             ['strictCamelCase']
            },
            {
                selector:           'variable',
                types:              ['function'],
                format:             ['strictCamelCase']
            }
        ]
    }
};
