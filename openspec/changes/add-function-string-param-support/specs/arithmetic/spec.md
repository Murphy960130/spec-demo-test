## MODIFIED Requirements

### Requirement: 加法运算
系统 SHALL 提供 `add(a, b)` 函数，接收两个**同类型**入参（均为 `number` 或均为纯数字字符串），返回两数之和（`number` 类型）。两个参数类型不一致时按「非数字输入处理」requirement 返回 `NaN`。

纯数字字符串定义：仅包含可选负号 + 数字字符的字符串，如 `'1'`、`'-3'`、`'0'`；`'1.5'`、`'abc'`、`''`、`' ' `、`'0x10'` 均不算纯数字字符串（本项目 Non-Goal 不支持浮点字符串与进制前缀）。

#### Scenario: 两个正数相加
- **WHEN** 调用 `add(1, 2)`
- **THEN** 返回 `3`

#### Scenario: 零值相加
- **WHEN** 调用 `add(0, 0)`
- **THEN** 返回 `0`

#### Scenario: 负数与正数相加
- **WHEN** 调用 `add(-1, 1)`
- **THEN** 返回 `0`

#### Scenario: 两个负数相加
- **WHEN** 调用 `add(-3, -5)`
- **THEN** 返回 `-8`

#### Scenario: 两个纯数字字符串相加
- **WHEN** 调用 `add('1', '2')`
- **THEN** 返回 `3`（`number` 类型）

#### Scenario: 两个负数字符串相加
- **WHEN** 调用 `add('-3', '-5')`
- **THEN** 返回 `-8`（`number` 类型）

### Requirement: 非数字输入处理
当入参不满足「两参均为 `number`」或「两参均为纯数字字符串」任一条件时，`add` SHALL 返回 `NaN`，且 MUST NOT 抛出异常。具体涵盖：任一入参为非纯数字字符串、非字符串非数字类型（`null`/`undefined`/`boolean`/`object` 等）、或两参类型不一致（一 `number` 一 `string`）。

#### Scenario: 第一个参数为非数字字符串
- **WHEN** 调用 `add('abc', 1)`
- **THEN** 返回 `NaN`

#### Scenario: 第二个参数为 undefined
- **WHEN** 调用 `add(1, undefined)`
- **THEN** 返回 `NaN`

#### Scenario: 两个参数均为 null
- **WHEN** 调用 `add(null, null)`
- **THEN** 返回 `NaN`

#### Scenario: 类型混用（number + string 数字）
- **WHEN** 调用 `add(1, '2')`
- **THEN** 返回 `NaN`

#### Scenario: 非纯数字字符串（含小数点）
- **WHEN** 调用 `add('1.5', '2')`
- **THEN** 返回 `NaN`

#### Scenario: 空字符串
- **WHEN** 调用 `add('', '')`
- **THEN** 返回 `NaN`
