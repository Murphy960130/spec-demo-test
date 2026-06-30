## Why

实际场景中 `add` 的输入常来自配置文件、URL 参数、CLI argv 等天然为字符串的来源，调用方需手动 `Number()` 转换。本变更让 `add` 直接接受纯数字字符串，免去转换样板代码，同时保持原 number 入参兼容。

## What Changes

- **BREAKING**：`add` 的输入语义从「仅 `number`」扩展为「`number` 或纯数字字符串」，但两个参数**必须同类型**。`add('1', '2')` 从返回 `NaN` 改为返回 `3`（`number` 类型）
- **BREAKING**：「非数字输入处理」requirement 的判定逻辑收紧——原本只看 `typeof !== 'number'`，现改为：入参非 `number` 且非纯数字字符串、或两参类型不一致时，返回 `NaN`。混用类型 `add(1, '2')` 继续返回 `NaN`，但走的是"类型一致性校验"路径而非"`typeof` 单参拦截"
- 维持原有错误处理策略：非法输入返回 `NaN`，不抛异常
- 测试用例同步扩展：新增字符串入参成功用例，调整既有"非数字"用例的语义边界

## Capabilities

### New Capabilities
<!-- 无新增 capability，仅修改既有 arithmetic -->

### Modified Capabilities
- `arithmetic`：扩展「加法运算」requirement 的输入类型至纯数字字符串（同类型约束），并收紧「非数字输入处理」requirement 的判定逻辑

## Impact

- **既有调用方影响**：任何依赖 `add(string, string) === NaN` 或 `add(string, number) === NaN` 的调用，前者行为变为返回数字，后者行为不变但实现路径不同
- **代码文件**：`calculator.js` 的 `add` 函数体重写；`calculator.test.js` 新增字符串用例并调整非数字用例
- **类型签名**：本项目无 TypeScript，但若引入 TS，签名应改为 `add(a: number | string, b: number | string): number | NaN` 并在 JSDoc 中约束"同类型"
- **依赖**：无新增
- **错误处理**：保持返回 `NaN` 不抛异常，符合 CLAUDE.md 规范
