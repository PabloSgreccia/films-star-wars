export default {
	moduleNameMapper: {
		'^src/(.*)$': '<rootDir>/src/$1',
	},
	rootDir: './',
	moduleDirectories: ['node_modules', 'src'],
	moduleFileExtensions: ['js', 'json', 'ts'],
	testRegex: '.*\\.spec\\.ts$',
	transform: {
		'^.+\\.(t|j)s$': 'ts-jest',
	},
	collectCoverageFrom: ['**/*.(t|j)s'],
	coverageDirectory: '../coverage',
	testEnvironment: 'node',
};
