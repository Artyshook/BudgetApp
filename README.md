# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

# ERD diagram:
[![](https://mermaid.ink/img/pako:eNqdlG1vgjAQx79K09f6BXjHhBmyKcvQJSYkS6UnNoHWXNstRv3uK8rmA8iIfcP17t-7X3pHdzRTHKhHAQPBcmRlKolbz_4kel2Q_X44VDsyT8J34pE1023Rp3kwDmeX8aO-jr7Fo5dwNomn4cJJEDIQX9Cii6ajeBLG81n1uZcs8T-i6Xgc-6-Jk2gwTnOFtDvtqiVtuQQkgp9d2qCQOZGshH-c9eGl5TmYs_tkHX6LHtF6lbQasLXshmn9rbB5AlXR5FmxUhTbKLjhqDvQTRIwAy45Q_PJnXkTAMlv3HUKViorTV-Sy25349xJ_yBldb8NmOuR6tWnzCXPFW4bAQ46Q7ExQskesN131wp7OdoPNrLW5ooVfnvlzCKCNLfRpXLDxiQR2s-M-z27iemAloAlE9y9G0fUlJo1uOGmnjM5rJgtTEpTWUmZNSrZyox6Bi0MqN1U0PVjQ70VK_SfN-TCKKydhx-BXmCC?type=png)](https://mermaid.live/edit#pako:eNqdlG1vgjAQx79K09f6BXjHhBmyKcvQJSYkS6UnNoHWXNstRv3uK8rmA8iIfcP17t-7X3pHdzRTHKhHAQPBcmRlKolbz_4kel2Q_X44VDsyT8J34pE1023Rp3kwDmeX8aO-jr7Fo5dwNomn4cJJEDIQX9Cii6ajeBLG81n1uZcs8T-i6Xgc-6-Jk2gwTnOFtDvtqiVtuQQkgp9d2qCQOZGshH-c9eGl5TmYs_tkHX6LHtF6lbQasLXshmn9rbB5AlXR5FmxUhTbKLjhqDvQTRIwAy45Q_PJnXkTAMlv3HUKViorTV-Sy25349xJ_yBldb8NmOuR6tWnzCXPFW4bAQ46Q7ExQskesN131wp7OdoPNrLW5ooVfnvlzCKCNLfRpXLDxiQR2s-M-z27iemAloAlE9y9G0fUlJo1uOGmnjM5rJgtTEpTWUmZNSrZyox6Bi0MqN1U0PVjQ70VK_SfN-TCKKydhx-BXmCC)