import { FileUriParser } from "../file";
import { HttpUriParser, HttpsUriParser } from "../http";
import { CommandUriParser } from "../command";
import { DatabaseUriParser } from "../database";
import { GitUriParser } from "../git";
import { MemFsUriParser } from "../memfs";
import { SpaceUriParser } from "../space";

describe('URI Parsers', () => {
  // File URI Tests
  describe('FileUriParser', () => {
    const parser = new FileUriParser();

    test('should parse local file path', () => {
      const uri = 'file:///path/to/file.txt';
      expect(parser.parse(uri)).toEqual({
        scheme: 'file',
        authority: '',
        path: '/path/to/file.txt',
        query: '',
        fragment: ''
      });
    });

    test('should parse network share path', () => {
      const uri = 'file://server/share/file.txt';
      expect(parser.parse(uri)).toEqual({
        scheme: 'file',
        authority: 'server',
        path: '/share/file.txt',
        query: '',
        fragment: ''
      });
    });

    test('should throw error for invalid format', () => {
      expect(() => parser.parse('file:/invalid')).toThrow();
    });
  });

  // HTTP/HTTPS URI Tests
  describe('HttpUriParser', () => {
    const parser = new HttpUriParser();

    test('should parse basic URL', () => {
      const uri = 'http://example.com';
      expect(parser.parse(uri)).toEqual({
        scheme: 'http',
        authority: 'example.com',
        path: '/',
        query: '',
        fragment: ''
      });
    });

    test('should parse URL with all components', () => {
      const uri = 'http://user:pass@example.com:8080/path?query=1#hash';
      expect(parser.parse(uri)).toEqual({
        scheme: 'http',
        authority: 'user:pass@example.com:8080',
        path: '/path',
        query: 'query=1',
        fragment: 'hash'
      });
    });

    test('should handle special characters in query', () => {
      const uri = 'http://api.example.com/search?q=test+space&filter=a%20b';
      expect(parser.parse(uri).query).toBe('q=test+space&filter=a%20b');
    });
  });

  // Command URI Tests
  describe('CommandUriParser', () => {
    const parser = new CommandUriParser();

    test('should parse basic command', () => {
      const uri = 'command:workbench.action.files.newFile';
      expect(parser.parse(uri)).toEqual({
        scheme: 'command',
        authority: '',
        path: 'workbench.action.files.newFile',
        query: '',
        fragment: ''
      });
    });

    test('should parse command with simple args', () => {
      const uri = 'command:git.checkout?branch=main';
      expect(parser.parse(uri)).toEqual({
        scheme: 'command',
        authority: '',
        path: 'git.checkout',
        query: 'branch=main',
        fragment: ''
      });
    });

    test('should parse command with JSON args', () => {
      const uri = 'command:git.commit?{"message":"fix","amend":true}';
      expect(parser.parse(uri)).toEqual({
        scheme: 'command',
        authority: '',
        path: 'git.commit',
        query: '{"message":"fix","amend":true}',
        fragment: ''
      });
    });
  });

  // Database URI Tests
  describe('DatabaseUriParser', () => {
    const parser = new DatabaseUriParser();

    test('should parse MySQL connection', () => {
      const uri = 'db://user:pass@localhost:3306/mydatabase';
      expect(parser.parse(uri)).toEqual({
        scheme: 'db',
        authority: 'user:pass@localhost:3306',
        path: '/mydatabase',
        query: '',
        fragment: ''
      });
    });

    test('should parse MongoDB connection with options', () => {
      const uri = 'db://admin:pass@mongo.example.com/app?authSource=admin';
      expect(parser.parse(uri)).toEqual({
        scheme: 'db',
        authority: 'admin:pass@mongo.example.com',
        path: '/app',
        query: 'authSource=admin',
        fragment: ''
      });
    });

    test('should parse connection with multiple options', () => {
      const uri = 'db://user:pass@host/db?ssl=true&pool=true';
      expect(parser.parse(uri).query).toBe('ssl=true&pool=true');
    });
  });

  // Git URI Tests
  describe('GitUriParser', () => {
    const parser = new GitUriParser();

    test('should parse basic repository', () => {
      const uri = 'git://github.com/owner/repo';
      expect(parser.parse(uri)).toEqual({
        scheme: 'git',
        authority: 'github.com',
        path: '/owner/repo',
        query: '',
        fragment: ''
      });
    });

    test('should parse repository with branch', () => {
      const uri = 'git://github.com/owner/repo#main';
      expect(parser.parse(uri)).toEqual({
        scheme: 'git',
        authority: 'github.com',
        path: '/owner/repo',
        query: '',
        fragment: 'main'
      });
    });

    test('should parse repository with file path', () => {
      const uri = 'git://github.com/owner/repo/path/to/file.ts#develop';
      expect(parser.parse(uri)).toEqual({
        scheme: 'git',
        authority: 'github.com',
        path: '/owner/repo/path/to/file.ts',
        query: '',
        fragment: 'develop'
      });
    });
  });

  // Memory FileSystem URI Tests
  describe('MemFsUriParser', () => {
    const parser = new MemFsUriParser();

    test('should parse basic file path', () => {
      const uri = 'memfs:///file.txt';
      expect(parser.parse(uri)).toEqual({
        scheme: 'memfs',
        authority: '',
        path: '/file.txt',
        query: '',
        fragment: ''
      });
    });

    test('should parse nested path', () => {
      const uri = 'memfs:///workspace/project/src/file.ts';
      expect(parser.parse(uri)).toEqual({
        scheme: 'memfs',
        authority: '',
        path: '/workspace/project/src/file.ts',
        query: '',
        fragment: ''
      });
    });

    test('should handle special characters in path', () => {
      const uri = 'memfs:///path/with spaces/and#special@chars.txt';
      expect(parser.parse(uri).path).toBe('/path/with spaces/and#special@chars.txt');
    });
  });

  // Space URI Tests
  describe('SpaceUriParser', () => {
    const parser = new SpaceUriParser();

    test('should parse basic space path', () => {
      const uri = 'space://myspace/file.txt';
      expect(parser.parse(uri)).toEqual({
        scheme: 'space',
        authority: 'myspace',
        path: '/file.txt',
        query: '',
        fragment: ''
      });
    });

    test('should parse path with branch', () => {
      const uri = 'space://myspace/src/main.ts#develop';
      expect(parser.parse(uri)).toEqual({
        scheme: 'space',
        authority: 'myspace',
        path: '/src/main.ts',
        query: '',
        fragment: 'develop'
      });
    });

    test('should parse path with version query', () => {
      const uri = 'space://myspace/doc.md?version=latest';
      expect(parser.parse(uri)).toEqual({
        scheme: 'space',
        authority: 'myspace',
        path: '/doc.md',
        query: 'version=latest',
        fragment: ''
      });
    });

    test('should parse complete URI', () => {
      const uri = 'space://myspace/project/src/file.ts?version=2#main';
      expect(parser.parse(uri)).toEqual({
        scheme: 'space',
        authority: 'myspace',
        path: '/project/src/file.ts',
        query: 'version=2',
        fragment: 'main'
      });
    });

    test('should handle special characters in path', () => {
      const uri = 'space://myspace/path%20with%20spaces/file.txt';
      expect(parser.parse(uri).path).toBe('/path with spaces/file.txt');
    });

    test('should throw error for missing spaceId', () => {
      expect(() => parser.parse('space:///file.txt')).toThrow();
    });
  });

  // Edge Cases and Error Handling
  describe('Edge Cases', () => {
    test('should handle empty components', () => {
      const httpParser = new HttpUriParser();
      expect(httpParser.parse('http://example.com')).toEqual({
        scheme: 'http',
        authority: 'example.com',
        path: '/',
        query: '',
        fragment: ''
      });
    });

    test('should validate scheme', () => {
      const parsers = [
        new FileUriParser(),
        new HttpUriParser(),
        new CommandUriParser(),
        new DatabaseUriParser(),
        new GitUriParser(),
        new MemFsUriParser()
      ];

      parsers.forEach(parser => {
        expect(() => parser.parse(`invalid:${parser.scheme}://test`)).toThrow();
      });
    });

    test('should handle URI encoding', () => {
      const httpParser = new HttpUriParser();
      const uri = 'http://example.com/path%20with%20spaces?q=test%20value';
      const result = httpParser.parse(uri);
      expect(result.path).toBe('/path%20with%20spaces');
      expect(result.query).toBe('q=test%20value');
    });
  });
}); 