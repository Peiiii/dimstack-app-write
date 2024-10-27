export default {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["src", "packages"],
  testMatch: ["**/*.spec.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};
