# Hello Extension

最簡單的 Chrome 擴充功能（Manifest V3，無建置步驟）：點工具列圖示打開 popup，按鈕點擊次數存在 `chrome.storage.local`。

## 本機安裝

1. 打開 `chrome://extensions`，右上角開啟「開發人員模式」
2. 點「載入未封裝項目」，選擇 `src/` 資料夾

## 發版

1. 修改 `src/manifest.json` 的 `version`（例如 `0.1.1`）並 commit
2. 打 tag 並推上去：

   ```bash
   git tag v0.1.1
   git push origin main --tags
   ```

3. GitHub Actions 會打包 `src/` 成 zip，附在該版本的 Release 上
