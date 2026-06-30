## Context

项目处于零代码状态，`package.json` 已声明 `type: "module"` 与 `node --test`。CLAUDE.md 规定：函数优先纯函数、错误处理优先返回结果而非抛异常、所有公开函数必须有测试。本变更是首个业务模块，需为后续模块建立可复用的实现范式。

## Goals / Non-Goals

**Goals:**
- 提供 `add(a, b)` 纯函数，语义为 `a + b`
- 非法输入（非 number）返回 `NaN`，不抛异常
- 建立模块 + 测试的文件布局与命名约定，供后续 capability 复用

**Non-Goals:**
- 不支持字符串数字（如 `"1"`）自动转换
- 不处理 BigInt / 大数溢出
- 不实现 sub/mul/div 等其他运算（留给后续变更）
- 不做 CLI 入口

## Decisions

**决策 1：用 ESM 默认导出 `add`，而非命名导出**
- 选择：`export function add(a, b) { ... }` 命名导出
- 备选 A：`export default add` —— 后续模块加函数时 default 语义会变模糊，不利于 tree-shaking 与 IDE 自动补全
- 备选 B：导出对象 `{ add }` —— 多一层包装，无收益
- 理由：capability 后续会扩展更多运算（sub/mul/div），命名导出最稳

**决策 2：非法输入直接 `a + b` 让 JS 产出 `NaN`，而非先 `typeof` 校验**
- 选择：显式 `typeof` 校验，非 number 返回 `NaN`
- 备选：直接 `return a + b` —— `'a' + 1` 会得到 `'a1'` 字符串而非 `NaN`，违反规格
- 理由：JS 的 `+` 对字符串会做拼接，必须显式拦截；用 `typeof a !== 'number' || typeof b !== 'number'` 后 `return NaN` 行为可预测

**决策 3：单一 capability `arithmetic` 而非 `addition`**
- 选择：capability 名为 `arithmetic`，本变更仅交付 `add`
- 备选：capability 名为 `addition` —— 之后加 sub/mul 会爆炸成一堆 capability
- 理由：算术是一个内聚的能力域，add 是其中一个 requirement

## Risks / Trade-offs

- [Risk] `NaN` 是 falsy 且不等于自身（`NaN !== NaN`），测试需用 `Number.isNaN()` 而非 `=== NaN` → 测试断言统一用 `Number.isNaN(result)`
- [Risk] 后续若要支持 BigInt，`typeof` 校验需要扩展为 `typeof x === 'number' || typeof x === 'bigint'`，且 number+bigint 混用会抛 TypeError → 留待后续变更处理，本变更 Non-Goal
- [Trade-off] 用 `NaN` 而非 Result 对象（`{ ok: false }`）—— 与项目"少抛异常"规范一致，但调用方需主动用 `Number.isNaN` 判断，容易漏。可接受，因为语义和 JS 原生一致
