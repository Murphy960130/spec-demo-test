## Context

当前 `add(a, b)` 仅接受 `number`，靠 `typeof a !== 'number' || typeof b !== 'number'` 校验。本变更扩展输入至纯数字字符串，且强制两参同类型。`calculator.js` 仅 4 行，重构后仍保持纯函数 + 不抛异常的约定。

## Goals / Non-Goals

**Goals:**
- 让 `add` 接受 `(number, number)` 与 `(string, string)` 两种同类型组合
- 类型混用、非纯数字字符串、非 number/string 类型一律返回 `NaN`
- 维持纯函数、无副作用、不抛异常

**Non-Goals:**
- 不支持浮点数字符串（如 `'1.5'`）—— 留待后续变更
- 不支持进制前缀（`'0x10'`）
- 不做 BigInt
- 不引入 TypeScript（虽然本变更适合加 TS 类型）
- 不实现 sub/mul/div 等其他运算

## Decisions

### 决策 1：用正则 `/^-?\d+$/` 判定纯数字字符串
- 选择：`const isNumericString = (x) => typeof x === 'string' && /^-?\d+$/.test(x)`
- 备选 A：`Number.isFinite(Number(x))` —— 会接受 `'1.5'`、`''`（`Number('')===0`）、`'  1  '`（trim 后合法）、`'0x10'`（16），违反 Non-Goal 和 spec
- 备选 B：`Number.isInteger(Number(x)) && typeof x === 'string'` —— 同样接受 `'1.5'` 因 `Number.isInteger(1.5)===false` 但对 `''`（→0）会误判为合法
- 备选 C：`parseInt(x, 10) === x` —— 类型不符（parseInt 返回 number），且对 `'01'` 返回 1 不等于字符串 `'01'`
- 理由：正则最直白，范围可控，与 spec「纯数字字符串」语义一一对应

### 决策 2：分类后再相加，路径分两种
- 选择：
  ```js
  const numA = typeof a === 'number';
  const numB = typeof b === 'number';
  const strA = isNumericString(a);
  const strB = isNumericString(b);
  if (numA && numB) return a + b;
  if (strA && strB) return Number(a) + Number(b);
  return NaN;
  ```
- 备选 A：统一转 `Number(a) + Number(b)` —— 对 `Number(1) + Number(2) === 3` 没问题，但 `Number` 对 `null`（→0）、`''`（→0）、`' '`（→0）会产生静默错误
- 备选 B：先 `String(a)` 再判定 —— 给 number 强转字符串徒增开销且语义不直观
- 理由：分支判定让合法路径显式（合法即 number+number 或 string+string 数值），其他全落 NaN，最稳

### 决策 3：number+string 混用返回 NaN，而非尝试转换
- 选择：`add(1, '2')` 返回 `NaN`
- 备选 A：自动 `Number()` 统一 —— 违反用户明确的"不可混用"约束
- 备选 B：抛 TypeError —— 违反 CLAUDE.md "错误处理优先返回结果"规范
- 理由：spec 已定 mixed → NaN；CLAUDE.md 已定不抛异常

## Risks / Trade-offs

- [Risk] 正则 `/^-?\d+$/` 不接受 `'+1'`（带正号），可能与某些 CLI 输入期望不符 → spec 未要求支持正号，明确 Non-Goal
- [Risk] `Number('-3')` 对极长字符串可能丢精度（如 `Number('999999999999999999999')`）→ JS `Number` 本就是 64 位浮点，超出 `MAX_SAFE_INTEGER` 行为与原 number 输入一致，本变更不引入新问题
- [Risk] 既有调用 `add('1', '2')` 期望 NaN 的会被破坏 → 这是本变更的 BREAKING 本质，已在 proposal Impact 标注；不提供迁移（demanded by spec）
- [Trade-off] 用正则而非更严格的自实现解析器 —— 正则简单可读，对纯数字字符串足够；若后续支持浮点字符串需扩展正则或换解析策略
- [Trade-off] 用 `Number()` 转换字符串而非 `parseInt` —— `Number('007') === 7`，`parseInt('007', 10) === 7`，行为一致；选 `Number()` 因为更贴近 `+x` 隐式转换语义且无 radix 误用风险
