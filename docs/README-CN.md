# Readme Stats

[English](./README.md) **[简体中文](./docs/README-CN.md)**

> 在 Readme 里展示动态统计信息

通过远程 SVG 资源展示统计数据，排除环境限制在任何场景都可以应用，比如 Github 个人主页、个人站点介绍页、简历、邮件等等。

👀 支持更多卡片 🎈 易于创建新卡片 🌈 主题系统

## 👀 支持的卡片

- [LeetCode](#leetcode)

🚀 可以在 [Readme Editor]() 预览和尝试多种卡片效果，无需记住复杂的配置项。[Readme Editor]() 还支持其他流行的 readme 组件，比如 github-readme-stats, github-readme-streak-stats 等等。

### LeetCode

> 支持国际站 leetcode.com 和中国站 leetcode-cn.com，通过 URL 中的 region 参数设置，例如，`region=en` 和 `region=cn`

[![](https://readme-stats-curly210102.vercel.app/api/leetcode?username=neal_wu)](https://readme-stats-curly210102.vercel.app/api/leetcode?username=neal_wu)

🔗 [https://readme-stats-curly210102.vercel.app/api/leetcode?username=neal_wu](https://readme-stats-curly210102.vercel.app/api/leetcode?username=neal_wu)

[![](https://readme-stats-curly210102.vercel.app/api/leetcode?username=neal_wu&layout=progress)](https://readme-stats-curly210102.vercel.app/api/leetcode?username=neal_wu&layout=progress)

🔗 [https://readme-stats-curly210102.vercel.app/api/leetcode?username=neal_wu&layout=progress](https://readme-stats-curly210102.vercel.app/api/leetcode?username=neal_wu&layout=progress)

## 🎈 创建你的卡片

在内置的 SVG 组件基础上，你可以自行搭建想要的卡片，步骤如下：

1. Fork 这个仓库
2. 在本地运行 `git clone`， `npm install` 按照依赖
3. 使用 Github 账号登录 [vercel.com](https://vercel.com/)
4. 导入 Github 项目到 Vercel
5. 运行 `npm install -g vercel` 全局安装 vercel
6. 运行 `vercel dev`，开始开发
7. 运行 `npm run create [cardName]`，例如，`npm run create leetcode`，这个命令会在 src/cards 目录下创建新的卡片目录。在 `src/router.ts` 中配置路由
8. 完成本地开发后，更新远程代码
9. 进入 [Vercel 控制台](https://vercel.com/dashboard), 预览并发布

## 🌈 主题系统

项目沿用了 [anuraghazra/github-readme-stats](https://github.com/anuraghazra/github-readme-stats) 的主题系统, 可以使用已存在主题或者通过 URL 参数设置。

## 👏🏻 贡献

欢迎贡献 🤗，最佳贡献途径：

- 在 Discussion 区提出疑问或分享想法
- 当遇到 bug 或者与期望不一致的现象，开一个 issue
- 提交 PR 来帮助项目发展，可在 [Project](https://github.com/curly210102/readme-stats/projects) 中确定项目规划和待办事项
- 在 Discussion 或 issue 中帮助他人解答问题

你的一点力量都可以帮助项目成长，非常感谢。

## ❤️ Thanks

这个项目受到以下前辈项目启发：

- [anuraghazra/github-readme-stats](https://github.com/anuraghazra/github-readme-stats).
- [JacobLinCool/LeetCode-Stats-Card](https://github.com/JacobLinCool/LeetCode-Stats-Card)

![](./powered-by-vercel.svg)
