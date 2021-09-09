# Readme Stats

**[English](./README.md)** [简体中文](./docs/README-CN.md)

> Show dynamically generated stats on your readmes!

Show dynamic statistics with remote svg resource, you can re-use it in everywhere, Github Profile Readme, Homepage, Resume, Mail, etc.

👀 More Cards 🎈 Easy to Create New Card 🌈 Theme System

## 👀 Supported Card

- [LeetCode](#leetcode)

🚀 You can preview and combine various card effects in [Readme Editor](), no need to remember complicated configurations. [Readme Editor]() also support other popular readme components like github-readme-stats, github-readme-streak-stats and so on.

### LeetCode

> Support leetcode.com and leetcode-cn.com, set by region parameter, e.g. `region=en` and `region=cn`

[![](https://readme-stats-curly210102.vercel.app/api/leetcode?username=neal_wu)](https://readme-stats-curly210102.vercel.app/api/leetcode?username=neal_wu)

🔗 [https://readme-stats-curly210102.vercel.app/api/leetcode?username=neal_wu](https://readme-stats-curly210102.vercel.app/api/leetcode?username=neal_wu)

[![](https://readme-stats-curly210102.vercel.app/api/leetcode?username=neal_wu&layout=progress)](https://readme-stats-curly210102.vercel.app/api/leetcode?username=neal_wu&layout=progress)

🔗 [https://readme-stats-curly210102.vercel.app/api/leetcode?username=neal_wu&layout=progress](https://readme-stats-curly210102.vercel.app/api/leetcode?username=neal_wu&layout=progress)

## 🎈 Create your own Card

Based on **SVG Components**, you can build out the Card you wanted

1. Fork this repo.
2. Run `git clone` to local, `npm install` install dependencies.
3. Log in [vercel.com](https://vercel.com/) with Github
4. Goto [Vercel dashboard](https://vercel.com/dashboard), import git repository to Vercel.
5. Run `npm install -g vercel`, install vercel globally.
6. Run `vercel dev`, start developing.
7. Run `npm run create [cardName]`, e.g. `npm run create leetcode`, to create new card directory under the src/cards. Add route to `src/router.ts`.
8. Finish local development, push the code to remote.
9. Goto [Vercel dashboard](https://vercel.com/dashboard), Preview then deploy to production

## 🌈 Theme System

Follow the awesome theme system created by [anuraghazra/github-readme-stats](https://github.com/anuraghazra/github-readme-stats), you can use the exist themes or configure with parameters.

## 👏🏻 Contribute

Welcome to contribute 🤗, it's wonderful to

- Ask questions or share ideas in Discussion
- Open an issue with bugs or unexpected behaviors
- PRs to improve this project, check plan and to-do list in [Project](https://github.com/curly210102/readme-stats/projects)
- Help to answer questions, resolve issue

Little contribution can make the project stronger, Thx a lot.

## ❤️ Thanks

This project is inspired by

- [anuraghazra/github-readme-stats](https://github.com/anuraghazra/github-readme-stats).
- [JacobLinCool/LeetCode-Stats-Card](https://github.com/JacobLinCool/LeetCode-Stats-Card)

![](./powered-by-vercel.svg)
