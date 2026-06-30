import test from 'node:test';
import assert from 'node:assert/strict';
import { add } from './calculator.js';

test('add(1, 2) === 3', () => {
  assert.strictEqual(add(1, 2), 3);
});

test('add(0, 0) === 0', () => {
  assert.strictEqual(add(0, 0), 0);
});

test('add(-1, 1) === 0', () => {
  assert.strictEqual(add(-1, 1), 0);
});

test('add(-3, -5) === -8', () => {
  assert.strictEqual(add(-3, -5), -8);
});

test('add 非数字字符串返回 NaN', () => {
  assert.ok(Number.isNaN(add('abc', 1)));
});

test('add undefined 返回 NaN', () => {
  assert.ok(Number.isNaN(add(1, undefined)));
});

test('add null 返回 NaN', () => {
  assert.ok(Number.isNaN(add(null, null)));
});
