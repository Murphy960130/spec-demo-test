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
