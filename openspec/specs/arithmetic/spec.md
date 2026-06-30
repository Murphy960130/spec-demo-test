# arithmetic Specification

## Purpose
arithmetic capability 提供基础算术运算函数。当前覆盖加法 `add(a, b)`，接收两个 `number` 入参返回两数之和；任一入参非 `number` 时返回 `NaN`，不抛异常。后续按需扩展 sub/mul/div 等运算，均遵循纯函数 + 非法输入返回结果（NaN）的约定。
## Requirements
### Requirement: 加法运算
系统 SHALL 提供 `add(a, b)` 函数，接收两个 `number` 类型参数，返回两数之和。

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

### Requirement: 非数字输入处理
当任一入参不是 `number` 类型时，`add` SHALL 返回 `NaN`，且 MUST NOT 抛出异常。

#### Scenario: 第一个参数为字符串
- **WHEN** 调用 `add('abc', 1)`
- **THEN** 返回 `NaN`

#### Scenario: 第二个参数为 undefined
- **WHEN** 调用 `add(1, undefined)`
- **THEN** 返回 `NaN`

#### Scenario: 两个参数均为 null
- **WHEN** 调用 `add(null, null)`
- **THEN** 返回 `NaN`

