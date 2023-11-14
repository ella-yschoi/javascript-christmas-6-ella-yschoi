export default {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
    'prettier'
  ],
  overrides: [
    {
      // 테스트 파일에는 규칙 비활성화
      files: ['tests/**/*.js'],
      rules: {
        'max-lines-per-function': 'off',
        'no-new': 'off',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
		sourceType: 'module',
  },
  rules: {
    // 들여쓰기 깊이 제한
    'max-depth': ['error', 2],
    // 함수의 매개변수 개수 제한
    'max-params': ['error', 3],
    // 함수의 길이 제한
    'max-lines-per-function': ['error', { max: 15 }],
    // eslint-import/extensions 규칙 비활성화
    'import/extensions': 'off',
  },
};
