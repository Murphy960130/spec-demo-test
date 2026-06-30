import test from 'node:test';
import assert from 'node:assert/strict';
import { add } from './calculator.js';

// --- 保留：原 number 用例（spec 仍要求） ---
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

// --- 保留：原非数字 NaN 用例（spec 仍要求） ---
test('add 非数字字符串返回 NaN', () => {
  assert.ok(Number.isNaN(add('abc', 1)));
});

test('add undefined 返回 NaN', () => {
  assert.ok(Number.isNaN(add(1, undefined)));
});

test('add null 返回 NaN', () => {
  assert.ok(Number.isNaN(add(null, null)));
});

// --- 新增：字符串成功用例（spec 新增 scenario） ---
test("add('1', '2') === 3 (字符串同类型相加)", () => {
  assert.strictEqual(add('1', '2'), 3);
});

test("add('-3', '-5') === -8 (负数字符串相加)", () => {
  assert.strictEqual(add('-3', '-5'), -8);
});

// --- 新增：类型混用 / 非纯数字字符串 NaN 用例（spec 收紧后边界） ---
test('add(1, "2") 类型混用返回 NaN', () => {
  assert.ok(Number.isNaN(add(1, '2')));
});

test('add 非纯数字字符串（含小数点）返回 NaN', () => {
  assert.ok(Number.isNaN(add('1.5', '2')));
});

test('add 空字符串返回 NaN', () => {
  assert.ok(Number.isNaN(add('', '')));
});
