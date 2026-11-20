# Hello Extension

最簡單的 Chrome 擴充功能（Manifest V3，無建置步驟）：點工具列圖示打開 popup，按鈕點擊次數存在 `chrome.storage.local`。

## 檢查更新

擴充功能每 6 小時查一次本 repo 的最新 GitHub Release（popup 也可以手動按「檢查更新」）。有新版時圖示會出現紅色 `NEW`，popup 提供下載按鈕。

Chrome 不允許「載入未封裝項目」的擴充功能自己覆蓋檔案，所以下載後要手動：解壓、覆蓋原資料夾，再到 `chrome://extensions` 按重新整理。

## 本機安裝

1. 打開 `chrome://extensions`，右上角開啟「開發人員模式」
2. 點「載入未封裝項目」，選擇 `src/` 資料夾

## 發版

1. 修改 `src/manifest.json` 的 `version`（例如 `0.2.1`）並 commit
2. 打 tag 並推上去：

   ```bash
   git tag -a v0.2.1 -m v0.2.1
   git push origin main v0.2.1
   ```

3. GitHub Actions 會打包 `src/` 成 zip，附在該版本的 Release 上
