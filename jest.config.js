module.exports = {
  preset: "jest-preset-angular",
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.spec.json",
      stringifyContentPathRegex: "\\.html$",
      diagnostics: false,
    },
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupJest.ts"],
  moduleDirectories: ["node_modules", "src"],
  moduleNameMapper: {
    "@core/(.*)": "<rootDir>/src/app/core/$1",
    "@feature/(.*)": "<rootDir>/src/app/feature/$1",
    "@shared/(.*)": "<rootDir>/src/app/shared/$1",
    "@env/(.*)": "<rootDir>/src/environments/$1",
  },
};
