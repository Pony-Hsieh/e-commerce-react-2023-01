## 難度分級
難度分為 1、2、3、5、8、13、21…
<hr />



## 新的 feature
      
### 難度 1
- [ ] 調整 favicon
- [ ] 調整 NavBar logo
- [ ] 調整 lang、title
### 難度 2
### 難度 3
- [ ] 更新 聯繫我們
- [ ] 製作 footer
- [ ] 完善提示訊息
- [x] 如果目前的頁面與 NavBar 被點擊的是相同的頁面，則關閉 drawer
- [x] 顯示所有商品
- [x] 測試在執行特定行為後跳轉至特定頁面(例如首頁)
- [x] 在 Cart 頁面顯示 local storage cart 內容
    - [x] 將商品加入 local storage cart
### 難度 5
- [x] 如果是首頁的話，則 Nav 的字體為白色
- [x] hover 的時候變更卡片的 elevation(SingleProductCard)
- [x] 製作首頁
- [ ] 製作商品頁
    - [ ] 新增價格升降序排列的 filter
- [x] 製作 navbar
- [x] 套用 material ui
- [ ] 送出訂單
    - [x] 檢查填寫欄位
        - [ ] 優化錯誤提示
    - 送出訂單後
        - 成功送出訂單
            - [x] 清空 local storage cart
            - [x] 清空 coupon
            - [x] 送出訂單後跳轉至 /singleOrder
        - 送出訂單失敗
- [x] 更新購物車頁面樣式
- [x] 製作 single order 頁面
    - 送出訂單後會跳轉到這個頁面，供客戶付款
    - [x] 串接取得單筆訂單資訊 api
    - [x] 串接付款 api
    - [x] 測試付款流程
    - [x] 顯示該筆訂單商品
    - [x] 更新頁面樣式
- [x] 取得 coupon
    - [x] 驗證使用者填寫的 coupon 是否有效
### 難度 8
- [ ] 保存商城頁面的狀態，不會一切換回來就整個不見
- [ ] 完善收件資訊驗證邏輯
- [ ] 測試結帳流程
    - [x] 有套用 coupon
        - [x] 結帳完成後會跳轉至 singleOrder 頁面
        - [x] 點擊 "付款" 需要可以付款，並更新頁面上相對應的資料
    - [x] 沒有套用 coupon
        - [x] 結帳完成後會跳轉至 singleOrder 頁面，使用者需要可以付款
        - [x] 點擊 "付款" 需要可以付款，並更新頁面上相對應的資料
    - [ ] 如果發生沒有將 local storage cart 全部加入 server cart 的狀況，要怎麼處理？
- [x] 移除 input number 的上下鍵頭
- [x] 測試 cart 頁面能否正常的運作
    - [x] 增加、減少 購物車內商品數量
    - [x] 移除 購物車內商品
### 難度 13
- [ ] 使用 ESLint Prettier 統一代碼風格
- [ ] 使用 Husky 在 git commit 之前就測試程式碼品質
<hr />


## 優化
### 難度 8
- [ ] 點選 "刪除" 按鈕，跳出 確認刪除 modal
    - [ ] 使用 `ReactDOM.createPortal` 實作 modal
          此功能已完成，但還不確定是不是用 ReactDOM.createPortal 這個方法製作完成
- [x] 製作提示訊息取代 alert

      