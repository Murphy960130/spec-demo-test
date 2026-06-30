## Why

项目目前没有任何业务代码，需要一个最小可运行的模块作为 SDD+TDD 工作流的首次落地样本，验证 OpenSpec 规划产物能否被 Superpowers 严纪律执行。选择加法函数是因为它的语义足够简单，能把注意力放在流程而非领域复杂度上。

## What Changes

- 新增 `calculator.js` 模块，导出纯函数 `add(a, b)`
- `add` 仅接受 `number` 类型入参，返回两数之和
- 入参非 number 时返回 `NaN`（不抛异常，符合项目"错误处理优先返回结果"规范）
- 新增 `calculator.test.js`，使用 `node --test` 覆盖正常值、边界值、非数字三类用例

## Capabilities

### New Capabilities
- `arithmetic`: 基础算术运算能力，首期覆盖加法；入参为数字，非法输入返回 `NaN` 而非抛异常

### Modified Capabilities
<!-- openspec/specs/ 当前为空，无既有 capability 需要修改 -->

## Impact

- 新增代码：`calculator.js`、`calculator.test.js`
- 新增依赖：无（仅用 Node.js 内置 `node --test`）
- 影响 API：导出 `add(a, b) -> number | NaN`
- 无破坏性变更（项目尚无既有代码）
