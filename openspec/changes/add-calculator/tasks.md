## 1. 测试先行（Red）

- [x] 1.1 创建 `calculator.test.js`，使用 `node --test`，import `add` from `./calculator.js`
- [x] 1.2 编写正常用例测试：`add(1, 2) === 3`、`add(0, 0) === 0`、`add(-1, 1) === 0`、`add(-3, -5) === -8`
- [x] 1.3 编写非数字输入测试：`Number.isNaN(add('abc', 1))`、`Number.isNaN(add(1, undefined))`、`Number.isNaN(add(null, null))`
- [x] 1.4 运行 `npm test`，确认全部失败（模块尚未实现，import 报错或断言失败）

## 2. 实现（Green）

- [x] 2.1 创建 `calculator.js`，命名导出 `add(a, b)`
- [x] 2.2 在 `add` 中用 `typeof` 校验两个入参，任一非 `number` 返回 `NaN`
- [x] 2.3 否则 `return a + b`
- [x] 2.4 运行 `npm test`，确认全部通过

## 3. 重构与收尾

- [ ] 3.1 审视 `add` 实现是否为纯函数、无副作用、可读（必要时重构，保持测试绿）
- [ ] 3.2 再次运行 `npm test` 确认通过
- [ ] 3.3 `git add . && git commit -m "feat: add calculator with tests"`
