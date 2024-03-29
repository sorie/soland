module.exports = {
    root: true,
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module'
    },
    plugins: [
        'vue'
    ],
    extends: [
        'plugin:vue/recommended',
        'plugin:vue/vue3-recommended',
        'plugin:vue/vue3-strongly-recommended',
        'plugin:vue/strongly-recommended',
        'plugin:vue/vue3-essential',
        'plugin:vue/essential'
    ],
    env: {
        browser: true,
        commonjs: true,
        es6: true
    },
    rules: {
        "no-mixed-spaces-and-tabs": ["off", "smart-tabs"],
        "no-unused-vars": ["off"],
        "no-useless-escape": ["off"],
        "no-console":["off"],
        "no-triple-curlies": ["off"],
        "vue/html-indent": ["off"],  // enforce tabs in template
        "indent": ["off"]    ,
        "vue/singleline-html-element-content-newline": ["off"]
    },
    globals:{
        "CONST": true,
        "GLOBAL": true,
        "ucEngine":  true,
        "ucEngineWeb": true,
        "fileManager": true,
        "LOCALE": true,
        "CryptoJS": true,
        "GLOBAL_MODULE": true,
        'jstz': true,
        'fabric': true,
        "adapter": true,
        "gapi": true,
        "YT": true,
        "opr": true,
        "InstallTrigger": true
    },
    overrides: [
        // node files
        {
            files: [
                '.template-lintrc.js',
                'testem.js',
                'blueprints/*/index.js',
                'config/**/*.js',
                'lib/*/index.js'
            ],
            parserOptions: {
                sourceType: 'script',
                ecmaVersion: 2015
            },
            parser: '@babel/eslint-parser',
            env: {
                browser: false,
                node: true
            }
        }
    ]
};
