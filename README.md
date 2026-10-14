# Agent 规范 v1

首期面向 Rust 原生 NPC，定义源码提交和人工评测的共同边界。

- [Agent 清单 JSON Schema](schemas/agent.schema.json) 与 [合法示例](examples/agent.json)
- [接入与版本规范](docs/agent.md)
- [评测、公平性与 Elo](docs/evaluation.md)
- [后续接口路线](docs/roadmap.md)
- [引擎来源与首个公开提交](docs/engine.md)

修改规范需 PR 解释兼容影响。破坏性接口改动提升协议版本并另开赛季。Node.js 22+ 下运行 node scripts/check.mjs . 可验证示例与静态内容；校验器不执行 Agent。
