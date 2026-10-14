# Agent 提交格式

## 提交 Agent 的条件

1. 从 [agent-template](https://github.com/ra2-agent/agent-template) 开始开发；首期接口为 Rust 进程内 Npc，协议为 ra-arena-full-info-v1。
2. 向 agents 仓库提交 agents/<id>/<version>/，包含 agent.json、README.md、LICENSE、src/lib.rs 和 checksums.json。
3. ID 使用小写字母、数字、连字符；版本使用 major.minor.patch。已有版本内容不可修改；任何策略、文档或依赖变化都提交新版本。
4. 使用有权公开的源码，标明作者、来源和 SPDX 许可。首期接受 Apache-2.0、MIT、BSD-3-Clause；其他许可先讨论。不要上传原版游戏资源、密钥、账号、第三方二进制或模型权重。
5. README 写明策略、接入步骤、预期资源需求、已知限制；不得以“待测”掩盖无法接入。首期不访问网络、文件系统、外部进程，不依赖墙钟或系统随机数。
6. 只通过 GameCommand 操作己方，reset 使用给定种子，每局创建新实例；不修改世界、不读对手私有内存、不识别或针对评测器作弊。
7. 通过静态检查并由 @kexinoh 审核合并。PR 不执行 Agent、不打比赛、不要求作者提交 Elo。合并仅代表已收录，参赛资格由维护者测试确认。
8. 正式结果由 @kexinoh 测试后提交 leaderboard。社区如有战绩异议，请开 Issue，附批次 ID 与证据，不直接改榜单。

## 文件与身份

每个 agents/<id>/<version>/ 是完整源码快照，不是指向浮动分支的链接。身份为 id@version；实际内容由 checksums.json 的所有文件 SHA-256 和清单本身 SHA-256 共同确定。checksums.json 包含除自身之外的全部文件（含 agent.json、README 和 LICENSE），路径按字典序。正式名单还固定 agents 仓库的完整提交 SHA。

允许的源码载荷为 .rs、.toml、.lock、.md、.txt、.json，每文件最多 2 MiB，每版本最多 20 MiB。拒绝符号链接、隐藏路径、路径穿越、build.rs、.cargo 配置和非文本文件。首期只使用标准库及引擎提供的 ra-arena / ra-engine；额外依赖先讨论，不自动下载或执行。

capabilities 为作者声明，不是隔离保证。源码审查不能被哈希或静态格式检查替代。作者不得把许可文件覆盖为其他作者无权授予的许可。模板代码为 Apache-2.0；衍生版本须保留相关声明。

## Rust 接口

实现 ra_arena::Npc::commands(&mut self, &BotContext) -> Vec<ra_engine::GameCommand>；可实现 reset(seed, player)。观测为借用的完整世界，只读；命令的玩家信封由评测器填写。每局新建实例，随机行为必须来自 reset 的 seed。

没有已发布的 JSON/stdin、Docker、Python、Wasm 或 HTTP 通用 Agent 接口。此清单是提交元数据，不能把它当作已实现的游戏通信协议。
