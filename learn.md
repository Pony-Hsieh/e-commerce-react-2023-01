# 習得知識


## 習得知識點
- useEffect
    - [【React.js入門 - 20】 useEffect - 在function component用生命週期](https://ithelp.ithome.com.tw/articles/10223344)
        > useEffect接收兩個參數，第一個是一個函式，定義componentDidMount或componentDidUpdate要做什麼事，此函式的回傳值也要是一個函式，表示componentWillUnmount 要做什麼事。  
        第二個是一個array，裡面是定義當哪些變數被改變時，這個useEffect要重新被觸發。有點像是過去我們在componentDidUpdate寫prevState!=this.state這種感覺。
- useRef
    > 可以當作是產生一個「被改變後不會觸發re-render」變數的hook
- [useDispatch() Redux 官方文件](https://react-redux.js.org/api/hooks#usedispatch)
    > This hook returns a reference to the dispatch function from the Redux store. You may use it to dispatch actions as needed.
- react router v6  
  跳轉至特定頁面
  ```javascript
    import { useNavigate } from "react-router-dom";
    const navigate = useNavigate();
    navigate('/Cart');
  ```
- import
    1. import test123 from './test1.js'
       如果 test1.js 有 `export default` 的話，這樣寫 ok
       然後 test123 是可以被隨意命名的(但不建議這麼做就是了)
    2. import { test2 } from './test2.js'
       引入 ./test2.js 內的 test2
       可以是 function、變數 等等的
    - 一個模組中只能有一組 export default，而 export 的數量則不限
- 如果只用 local storage 控制的話，即使資料變動，也無法及時更新畫面，需要重新整理後才會渲染最新的資料
- linter 與 formatter 的差異
    - linter 擅長改善語法、抓出潛在的語法錯誤  
      例如，它會叫你用 let/const 取代 var、=== 取代 ==
        - ESLint
    - formatter 擅長修改 coding style  
      例如，它不在乎你用 var 還是 let/const，但會禁止你使用 ""(semi: true)
        - Prettier
    - linter 和 formatter 都會使用抽象語法樹(Abstract Syntax Tree, AST)，但 linter 多了一步靜態分析，因此才能改善語法，比 formatter 慢也是這個原因
- mui
    - `<Box>` component="p"


## 參考文章
越上方越晚被加入

- 錯誤訊息：`React Hook useEffect has missing dependencies: 'dataProduct.title', 'haveNoProduct', and 'productId'. Either include them or remove the dependency array`
  - [missing dependency：Either include it or remove the dependency array：解決 React Hook 中 useEffect 缺少依賴項的警告信息](https://blog.csdn.net/weixin_58576761/article/details/125693780)
  - [[Day 20 - 即時天氣] 在 useEffect 中使用呼叫需被覆用的函式 - useCallback 的使用](https://ithelp.ithome.com.tw/articles/10225504)
- Material Design
    - [UI / UX 設計白皮書 - Material Design 導讀 系列](https://ithelp.ithome.com.tw/users/20124956/ironman/2945)
    - [介紹| Google Material Design 正體中文版 - wcc723](https://wcc723.gitbooks.io/google_design_translate/content/material-design-introduction.html)
    - [Material Design 引領的設計趨勢](https://www.inside.com.tw/article/3914-material-design-trend)
- MUI
    - [React 如何封装消息提示组件message--Material-UI](https://blog.csdn.net/u012885136/article/details/122490041)
    - [React & MUI 封装 Alert 消息组件](https://juejin.cn/post/7144547629672693767)
- ESlint Prettier 相關
    - [如何整合ESlint, Prettier, VSCode？](https://hackmd.io/@Vin27/Skg8ytPGP)
    - [不以規矩，不能成方圓-徹底搞懂 ESLint 和 Prettier](https://rileycai.com/%E4%B8%8D%E4%BB%A5%E8%A7%84%E7%9F%A9%EF%BC%8C%E4%B8%8D%E8%83%BD%E6%88%90%E6%96%B9%E5%9C%86-%E5%BD%BB%E5%BA%95%E6%90%9E%E6%87%82-eslint-%E5%92%8C-prettier/)
    - [如何讓prettier和eslint更好的一起工作？](https://juejin.cn/post/7003888857372426248)
        > eslint-config-prettier 這個插件是利用 prettier 中的相關配置去覆蓋 .eslintrc.json 中的配置達成避免衝突

        > eslintrc.json 中的 extends 的順序，優先級高的放後面(後面的配置會覆蓋掉前面的配置)

        > 運行兩個命令來 lint 和格式化我們的文件其實不是很方便。  
          為了解決這個問題，我們透過添加 eslint-plugin-prettier 插件來集成 Prettier 和 ESLint。  
          也就是使用一個命令完成我們所需要的 lint 和格式化的操作。
    - [變成rule的形狀(3) - Prettier + ESLint](https://tempura-good-good.coderbridge.io/2022/06/11/prettier-+-eslint/)
        > eslint-config-prettier  
          關掉所有會和 Prettier 產生衝突的 ESLint rule，也會關掉一些已經被廢棄的 rule  

        > eslint-plugin-prettier  
          關掉 ESLint 有關 formatting 的 rule，只留下偵測 bug 的 rule

        > 另外雖然可以透過 .eslintrc. 設定 Prettier，但不推薦，因為有些 VS Code extensions(ex: prettier-vscode) 只讀 .prettierrc
    - [Day 28 - 為什麼要用 ESLint & Prettier](https://ithelp.ithome.com.tw/articles/10307991)
- JS 相關
    - [淺談新手在學習 SPA 時的常見問題：以 Router 為例](https://blog.huli.tw/2019/09/18/spa-common-problem-about-router/)
    - [Uncaught SyntaxError: Failed to execute 'querySelector' on 'Document'](https://stackoverflow.com/questions/37270787/uncaught-syntaxerror-failed-to-execute-queryselector-on-document)
        > `querySelector` method uses CSS3 selectors for querying the DOM and CSS3 doesn't support ID selectors that start with a digit
    - [[javascript] 清空 array 的方法介紹與比較(new、pop 及 shift…等)](https://blog.camel2243.com/2017/06/12/javascript-%E6%B8%85%E7%A9%BA-array-%E7%9A%84%E6%96%B9%E6%B3%95%E4%BB%8B%E7%B4%B9%E8%88%87%E6%AF%94%E8%BC%83new%E3%80%81pop-%E5%8F%8A-shift-%E7%AD%89/)
    - [Promise.all 和 Promise.allSettled 的區別](https://segmentfault.com/a/1190000023413699)
    - [React Forms 表單處理](https://www.fooish.com/reactjs/forms.html)
        > React 稱有設定 value 屬性的表單元件叫做 **受控元件 (Controlled Components)**，受控元件的欄位內容值是使用者無法自由更動的，只能由你主動監聽 onChange 來改變 value 然後顯示回畫面，所以會叫做受控元件，通常有設定 value 的元件也會自己維護相對應的 state。
    - [ES6 語法-Computed property names (動態計算屬性名)介紹](https://snh90100.medium.com/es6-%E8%AA%9E%E6%B3%95-computed-property-names-%E5%8B%95%E6%85%8B%E8%A8%88%E7%AE%97%E5%B1%AC%E6%80%A7%E5%90%8D-%E4%BB%8B%E7%B4%B9-883ca789cda6)
    - [[ES6-重點紀錄] Module System 模組系統](https://ithelp.ithome.com.tw/articles/10196230)
        ```javascript
        // 使用萬用字元 *
        // 使用 'as' 重新命名變數名稱
        import * as module from './myModule.js';
        console.log(module.str); 
        console.log(module.obj);
        ```
    - [How to Set Dynamic Object Properties using Computed Property Names](https://www.freecodecamp.org/news/how-to-set-dynamic-object-properties-using-computed-property-names/)
- HTML 相關
    - [為什麼要使用 rel="noreferrer noopener"，談 target="_blank" 的安全性風險](https://pjchender.blogspot.com/2020/05/relnoreferrer-targetblank.html)
    - input 相關
        - [mui v5 text field](https://mui.com/material-ui/react-text-field/#type-quot-number-quot)
        - [HTML5 input 中的 pattern 屬性](https://yuugou727.github.io/blog/2018/02/20/html5-pattern/)
        - [用 inputmode 決定你的鍵盤](https://medium.com/@debbyji/%E7%94%A8-inputmode-%E6%B1%BA%E5%AE%9A%E4%BD%A0%E7%9A%84%E9%8D%B5%E7%9B%A4-f9452e72abdd)
- React 相關
    - [教你用 React createPortal](https://juejin.cn/post/7036380015365193735)
    - [React 中 input 輸入自動失去焦點](https://juejin.cn/post/7081924043611308069)
    - [React Input 框輸入一次就失焦](https://blog.csdn.net/qq_50825973/article/details/117435633)
    - [使用 @reduxjs/toolkit 简化 redux 代码](https://www.jianshu.com/p/77fa764dec69)
        > A non-serializable value was detected in an action, in the path: payload  
        这个是因为 immer 只能处理可序列化的简单对象，不能处理类的实例，如果你的 action.payload 是一个类的实例，就会出现这个警告。  
        这里就需要对 action.payload 进行浅拷贝将它转化为一个简单对象。我们业务中的 action.payload 实际情况比较复杂，所以先关掉了 serializableCheck 检查，后面再优化这里的逻辑
    - [redux-toolkit 报无法序列化 Warning A non-serializable value was detected in an action](https://blog.csdn.net/m0_48474585/article/details/121462589)
- Github Pages 部屬相關
    - [在 github page 部署 react — 簡述為何重新整理出現 404 feat.解決方案](https://ithelp.ithome.com.tw/articles/10297281)
    - [github page 重新整理 404 — 解決方案](https://github.com/rafgraph/spa-github-pages#how-it-works)
    - [將專案部署到 GitHub Pages](https://pjchender.dev/react-bootcamp/docs/bootcamp/week5/deployment)
    - [create react app 官方文件](https://create-react-app.dev/docs/deployment#github-pages)
- 其他
    - [你不知道的 console.log()](https://juejin.cn/post/7082018229559754789)
    - [開發不難，會 Debug 就好！如何靈活運用 Chrome DevTools 來開發網站](https://5xruby.tw/posts/how-to-use-chrome-devtools)
        - 如何用 clip-path 畫多邊形
