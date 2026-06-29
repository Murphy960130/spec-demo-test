# OpenSpec + Superpowers 开发工作流 SOP

> 目标：建立一套 Spec-Driven Development（SDD）+ Test-Driven Development（TDD）的 AI 辅助开发流程，让 Claude Code 在写代码前先对齐需求、按纪律执行。

---

## 目录

1. [核心概念](#核心概念)
2. [为什么组合使用](#为什么组合使用)
3. [工具定位对比](#工具定位对比)
4. [安装与环境准备](#安装与环境准备)
5. [项目初始化](#项目初始化)
6. [标准工作流](#标准工作流)
7. [Demo：实现一个加法计算器](#demo实现一个加法计算器)
8. [常见问题](#常见问题)
9. [官方资源与参考链接](#官方资源与参考链接)

---

## 核心概念

### 1.1 OpenSpec

OpenSpec 是一个 **Spec-driven development（SDD）框架**，专门为 AI 编程助手设计。

它的核心理念是：**在 AI 写代码之前，先让 AI 和人就在需求、范围、方案上达成一致。** 把模糊的自然语言需求，转换成结构化、可审查、可追踪的规格文档。

每个变更（Change）在仓库中对应一个独立目录 `changes/<change-name>/`，包含四类文档：

| 文件/目录 | 作用 | 说明 |
|---|---|---|
| `proposal.md` | 变更提案 | 为什么要做这个变更，解决什么问题 |
| `specs/` | 需求规格 | 具体要做什么，边界条件，验收标准 |
| `design.md` | 设计方案 | 技术实现思路、架构决策 |
| `tasks.md` | 任务拆分 | 把实现拆成 2-5 分钟可执行的小任务 |

OpenSpec 通过斜杠命令与 Claude Code 等工具集成：

| 命令 | 作用 |
|---|---|
| `/opsx:explore` | 需求探索，把模糊想法变成初步方案 |
| `/opsx:propose <change-name>` | 基于需求生成完整变更提案 |
| `/opsx:ff <change-name>` | Fast-forward，自动生成 specs/design/tasks |
| `/opsx:apply` | 按 tasks.md 执行任务 |
| `/opsx:verify <change-name>` | 验证实现是否满足规格 |
| `/opsx:archive <change-name>` | 归档已完成的变更 |
| `/opsx:continue <change-name>` | 继续未完成的变更 |

### 1.2 Superpowers

Superpowers 是一个 **Agentic skills framework + 软件开发方法论**，由 Jesse Vincent 和 Prime Radiant 团队开发。

它的核心理念是：**别让 AI 一上来就写代码**，而是强制它像资深工程师一样工作：先澄清需求、再设计方案、拆分任务、按 TDD 执行、并行审查。

Superpowers 的默认工作流：

```
brainstorm（头脑风暴/澄清需求）
    ↓
write-plan（写执行计划）
    ↓
execute-plan（执行计划）
    ↓
TDD（测试驱动开发：red → green → refactor）
    ↓
review（代码审查）
```

Superpowers 通过一组 `SKILL.md` 文件实现，这些技能文件会被 Claude Code 自动读取并遵循。核心原则包括：

- **TDD**：先写测试，再写实现
- **YAGNI**：只做必要的事
- **DRY**：避免重复
- **隔离工作区**：用 Git worktree 创建独立分支
- **子代理并行执行**：每个小任务交给独立的子 agent 完成，避免上下文漂移

### 1.3 OpenSpec + Superpowers 的组合

单独使用的问题：

- **只用 OpenSpec**：规格写得很清楚，但 AI 执行时可能跳过测试、乱改代码。
- **只用 Superpowers**：AI 会按纪律执行，但需求源头可能还是模糊的，容易出现"做了但不是用户想要的"。

组合后的优势：

```
OpenSpec（定规格） → Superpowers（严执行） → 高质量、可追踪的代码
```

常见组合方式：

1. 用 OpenSpec 的 `/opsx:propose` 或 `/opsx:ff` 产出 `proposal.md` / `specs/` / `design.md` / `tasks.md`
2. 关闭 OpenSpec 的 `apply` 工作流（让 Superpowers 负责执行）
3. 把 `tasks.md` 作为 Superpowers `write-plan` / `execute-plan` 的输入
4. Superpowers 按 TDD 和子代理流程落地代码

---

## 为什么组合使用

| 维度 | 传统 Vibe Coding | OpenSpec + Superpowers |
|---|---|---|
| 需求对齐 | 口头/临时 prompt | 结构化规格文档 |
| 变更追踪 | 散落在对话历史里 | 每个变更独立归档在 `changes/` |
| 代码质量 | 依赖模型自觉 | 强制 TDD + 双重审查 |
| 上下文管理 | 长会话容易漂移 | 子代理独立执行小任务 |
| 可审计性 | 差 | 从 idea → spec → code 完全可追溯 |

---

## 工具定位对比

| 工具 | 解决的问题 | 核心产出 | 使用阶段 |
|---|---|---|---|
| **Claude Code** | AI 编程助手 | 代码、解释、命令执行 | 全程 |
| **OpenSpec** | 需求规格化 | `proposal.md` / `specs/` / `design.md` / `tasks.md` | 规划阶段 |
| **Superpowers** | 执行纪律 | 按 TDD 实现的代码、测试、审查 | 执行阶段 |

一句话记忆：

> **OpenSpec 管"写什么"，Superpowers 管"怎么写"。**

---

## 安装与环境准备

### 前置条件

```bash
# Node.js ≥ 20
node --version

# Git ≥ 2.30
git --version

# Claude Code 已安装
claude --version
```

### 1. 安装 OpenSpec CLI

```bash
npm install -g @fission-ai/openspec@latest

# 验证
openspec --version
```

### 2. 安装 Superpowers 插件

在 Claude Code 会话中执行：

```text
/plugin marketplace add obra/superpowers-marketplace
/plugin install superpowers@superpowers-marketplace
```

安装完成后，**必须退出 Claude Code 并重新启动**，插件才能生效。

### 3. 验证安装

重新进入 Claude Code 后：

```text
/help
```

确认出现以下命令：

- `brainstorm`
- `write-plan`
- `execute-plan`
- `tdd`

同时可以测试 OpenSpec：

```text
/opsx:help
```

---

## 项目初始化

### 1. 创建项目目录

```bash
mkdir openspec-demo
cd openspec-demo
git init
```

### 2. 初始化 OpenSpec

```bash
openspec init
```

按向导操作：

- **集成工具**：选择 `Claude Code`（空格选中，回车确认）
- 其他选项默认即可

初始化后会生成类似结构：

```
openspec-demo/
├── AGENTS.md                 # AI 助手行为规范
├── openspec.json             # OpenSpec 配置
├── openspec/                 # OpenSpec 内部资源
│   ├── commands/
│   ├── prompts/
│   └── schemas/
├── changes/                  # 变更目录（初始为空）
└── ...
```

### 3. 配置项目级 CLAUDE.md

在项目根目录创建 `CLAUDE.md`，写入项目规范：

```markdown
# 项目上下文

## 工作流规范
本项目采用 SDD（Spec-driven Development）+ TDD（Test-driven Development）：
- 所有功能变更先通过 OpenSpec 生成规格文档
- 代码实现由 Superpowers 按 TDD 纪律执行
- 每个任务完成后必须提交 Git

## 技术栈
- 语言：Node.js（LTS 版本）
- 测试框架：Node.js 内置 `node --test`
- 模块系统：ES Modules（`type: "module"`）

## 代码规范
- 函数优先使用纯函数
- 所有公开函数必须有对应测试
- 测试文件命名：`<module>.test.js`
- 错误处理优先返回结果，少抛异常

## 变更流程
1. `/opsx:propose <change-name>` 创建变更
2. 审查并确认 `changes/<change-name>/` 下的文档
3. `/opsx:ff <change-name>` 生成完整任务
4. 提示 Superpowers 按 TDD 执行 tasks
5. `/opsx:verify <change-name>` 验证实现
6. `/opsx:archive <change-name>` 归档变更
```

### 4. 初始化 package.json

```bash
npm init -y
```

编辑 `package.json`，添加：

```json
{
  "type": "module",
  "scripts": {
    "test": "node --test"
  }
}
```

### 5. 提交初始骨架

```bash
git add .
git commit -m "chore: init openspec + superpowers skeleton"
```

---

## 标准工作流

### 阶段一：需求规划（OpenSpec）

```text
/opsx:propose add-feature
```

输入需求描述，例如：

> 实现一个用户注册功能，要求：
> 1. 接收 username、email、password
> 2. 校验 email 格式
> 3. password 至少 8 位
> 4. 返回成功或失败信息

OpenSpec 会生成：

```
changes/add-feature/
├── proposal.md
├── specs/
│   └── 001-user-registration.md
├── design.md
└── tasks.md
```

### 阶段二：审查规格

人工检查 `proposal.md`、`specs/`、`design.md`、`tasks.md`，确认：

- 需求边界是否清晰
- 验收标准是否可测试
- 技术方案是否合理
- 任务拆分是否足够细

### 阶段三：生成完整规划

```text
/opsx:ff add-feature
```

Fast-forward 会基于 proposal 补全或细化 tasks。

### 阶段四：执行实现（Superpowers）

在 Claude Code 中提示：

```text
Please implement the tasks in changes/add-feature/tasks.md following Superpowers workflow and strict TDD discipline. Create tests first, make them fail, then implement the code.
```

Superpowers 会：

1. 创建 Git worktree / 分支
2. 按 tasks.md 拆分 micro-tasks
3. 每个 task：写测试 → 看失败 → 写实现 → 看通过 → 重构
4. 子代理并行执行
5. 提交代码

### 阶段五：验证

```text
/opsx:verify add-feature
```

同时手动运行测试：

```bash
npm test
```

### 阶段六：归档

```text
/opsx:archive add-feature
```

---

## Demo：实现一个加法计算器

### 目标

实现一个 `calculator.js`，包含 `add(a, b)` 函数，并附带单元测试。

### 步骤

#### 1. 创建变更

```text
/opsx:propose add-calculator
```

需求描述：

> 创建一个 calculator 模块，包含 add(a, b) 函数，返回两数之和。需要有一个测试文件验证 add(1, 2) === 3，以及边界情况如 add(0, 0) 和 add(-1, 1)。

#### 2. 审查生成的文档

检查 `changes/add-calculator/` 下的：

- `proposal.md`
- `specs/001-add-function.md`
- `design.md`
- `tasks.md`

#### 3. Fast-forward

```text
/opsx:ff add-calculator
```

#### 4. 让 Superpowers 执行

```text
Implement the tasks in changes/add-calculator/tasks.md using Superpowers. Follow TDD strictly: write tests first, watch them fail, then implement add(a, b), then watch tests pass.
```

预期产出：

```
openspec-demo/
├── calculator.js
├── calculator.test.js
├── package.json
└── changes/
    └── add-calculator/
        ├── proposal.md
        ├── specs/
        ├── design.md
        └── tasks.md
```

#### 5. 验证

```bash
npm test
```

预期输出：

```
✓ add(1, 2) should return 3
✓ add(0, 0) should return 0
✓ add(-1, 1) should return 0
```

#### 6. 提交并归档

```bash
git add .
git commit -m "feat: add calculator with tests"
```

```text
/opsx:archive add-calculator
```

---

## 常见问题

### Q1：OpenSpec 和 Superpowers 会不会重复生成文档？

会有一点重叠。推荐做法：

- 用 OpenSpec 做"规划期"的文档
- 关闭 OpenSpec 的 `apply` 工作流，让 Superpowers 负责执行

关闭 apply：

```text
openspec config profile
```

取消勾选 `Apply tasks`。

### Q2：Superpowers 执行太慢怎么办？

Superpowers 的完整流程（brainstorm + plan + TDD + review）确实比直接写代码慢。适合：

- 复杂功能
- 需要长期维护的代码
- 多人协作项目

不适合：

- 一两行的 bug fix
- 临时探索性代码

### Q3：能不能只用 OpenSpec 不用 Superpowers？

可以。OpenSpec 自己有 `apply` 工作流，可以直接让 Claude Code 按 tasks 执行。但代码质量纪律不如 Superpowers 严格。

### Q4：能不能只用 Superpowers 不用 OpenSpec？

可以。Superpowers 自己有 `brainstorm` 和 `write-plan` 阶段，可以替代 OpenSpec 的规划功能。但 OpenSpec 的规格文档更适合长期维护和团队协作。

### Q5：Claude Code 里没有 `/opsx:` 命令？

确认：

1. `openspec init` 已成功执行
2. `AGENTS.md` 已生成
3. 当前目录是项目根目录
4. Claude Code 已重新启动

---

## 官方资源与参考链接

### OpenSpec

- **GitHub**: https://github.com/Fission-AI/OpenSpec
- **官网**: https://openspec.dev
- **npm 包**: https://www.npmjs.com/package/@fission-ai/openspec

### Superpowers

- **GitHub**: https://github.com/obra/superpowers
- **官方技能库**: https://github.com/obra/superpowers-skills
- **Prime Radiant**: https://primeradiant.ai

### 组合实践参考

- **SuperSpec（OpenSpec + Superpowers 集成方案）**: https://github.com/danielhanold/superspec
- **OpenSpec + Superpowers 工作流详解**: https://www.lixueduan.com/posts/ai/21-openspec+superpowers/
- **OpenSpec 与 Superpowers 入门教程**: https://gitcode.csdn.net/6a2acbc6662f9a54cb7d423f.html
- **OpenSpec 到 Superpowers：AI 编码从说清到做对**: https://juejin.cn/post/7641149062688211007

### Claude Code 官方

- **Claude Code 文档**: https://docs.anthropic.com/en/docs/claude-code
- **Claude Code 插件**: https://docs.anthropic.com/en/docs/claude-code/plugins

---

## 版本记录

| 版本 | 日期 | 说明 |
|---|---|---|
| v1.0 | 2026-06-25 | 初版 SOP |
