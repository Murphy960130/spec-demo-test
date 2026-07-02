## 1. 测试套件对齐 spec delta（Red 准备）

- [x] 1.1 保留原 `add(1,2)===3`、`add(0,0)===0`、`add(-1,1)===0`、`add(-3,-5)===-8` 四个 number 用例（这些 spec 仍要求）
- [x] 1.2 保留原 `add('abc',1)`、`add(1,undefined)`、`add(null,null)` 返回 NaN 三个用例（spec 仍要求）
- [x] 1.3 新增字符串成功用例：`add('1','2')===3`、`add('-3','-5')===-8`（对应 spec 新增 scenario）
- [x] 1.4 新增"类型混用"用例：`Number.isNaN(add(1,'2'))`（spec 新增的混用 scenario）
- [x] 1.5 新增"非纯数字字符串"用例：`Number.isNaN(add('1.5','2'))`、`Number.isNaN(add('',''))`（spec 收紧纯数字定义后的边界）
- [x] 1.6 跑 `npm test` 看 Red：新字符串用例应该失败（旧实现 typeof 校验直接返回 NaN），原 number/原 NaN 用例应继续通过

## 2. 实现 add 函数体重写（Green）

- [x] 2.1 在 `calculator.js` 加 `isNumericString` helper（正则 `/^-?\d+$/`）
- [x] 2.2 重写 `add`：分支判定 `(number,number) → a+b` / `(string,string) → Number(a)+Number(b)` / 其他 → `NaN`
- [x] 2.3 跑 `npm test` 看全绿
- [x] 2.4 用 REPL 人肉验一遍：`add('1','2')===3`、`add(1,'2')` 返回 NaN、`add('1.5','2')` 返回 NaN

## 3. 重构与归档准备

- [x] 3.1 审视 `add` 与 `isNumericString`：纯函数？可读？是否过度抽象？保持测试绿前提下重构（如无必要不动）
- [x] 3.2 复跑 `npm test` 确认仍全绿
- [x] 3.3 `git add . && git commit -m "feat!: support string params in add with same-type constraint"`
