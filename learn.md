# 習得知識


## 習得知識點
- useEffect
    - [【React.js入門 - 20】 useEffect - 在function component用生命週期](https://ithelp.ithome.com.tw/articles/10223344)
        > useEffect接收兩個參數，第一個是一個函式，定義componentDidMount或componentDidUpdate要做什麼事，此函式的回傳值也要是一個函式，表示componentWillUnmount 要做什麼事。  
        第二個是一個array，裡面是定義當哪些變數被改變時，這個useEffect要重新被觸發。有點像是過去我們在componentDidUpdate寫prevState!=this.state這種感覺。
    - 
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
    
    
## 參考文章
越上方越晚被加入

- [[javascript] 清空 array 的方法介紹與比較(new、pop 及 shift…等)](https://blog.camel2243.com/2017/06/12/javascript-%E6%B8%85%E7%A9%BA-array-%E7%9A%84%E6%96%B9%E6%B3%95%E4%BB%8B%E7%B4%B9%E8%88%87%E6%AF%94%E8%BC%83new%E3%80%81pop-%E5%8F%8A-shift-%E7%AD%89/)
- [Promise.all 和 Promise.allSettled 的區別](https://segmentfault.com/a/1190000023413699)
- [React 中 input 輸入自動失去焦點](https://juejin.cn/post/7081924043611308069)
- [React Input 框輸入一次就失焦](https://blog.csdn.net/qq_50825973/article/details/117435633)
- [開發不難，會 Debug 就好！如何靈活運用 Chrome DevTools 來開發網站](https://5xruby.tw/posts/how-to-use-chrome-devtools)
    - 如何用 clip-path 畫多邊形
- [你不知道的 console.log()](https://juejin.cn/post/7082018229559754789)
- [How to Set Dynamic Object Properties using Computed Property Names](https://www.freecodecamp.org/news/how-to-set-dynamic-object-properties-using-computed-property-names/)
- [ES6 語法-Computed property names (動態計算屬性名)介紹](https://snh90100.medium.com/es6-%E8%AA%9E%E6%B3%95-computed-property-names-%E5%8B%95%E6%85%8B%E8%A8%88%E7%AE%97%E5%B1%AC%E6%80%A7%E5%90%8D-%E4%BB%8B%E7%B4%B9-883ca789cda6)
- [React Forms 表單處理](https://www.fooish.com/reactjs/forms.html)
    > React 稱有設定 value 屬性的表單元件叫做 **受控元件 (Controlled Components)**，受控元件的欄位內容值是使用者無法自由更動的，只能由你主動監聽 onChange 來改變 value 然後顯示回畫面，所以會叫做受控元件，通常有設定 value 的元件也會自己維護相對應的 state。
- [教你用 React createPortal](https://juejin.cn/post/7036380015365193735)
- [[ES6-重點紀錄] Module System 模組系統](https://ithelp.ithome.com.tw/articles/10196230)
    ```javascript
    // 使用萬用字元 *
    // 使用 'as' 重新命名變數名稱
    import * as module from './myModule.js';
    console.log(module.str); 
    console.log(module.obj);
    ```
- [使用 @reduxjs/toolkit 简化 redux 代码](https://www.jianshu.com/p/77fa764dec69)
    > A non-serializable value was detected in an action, in the path: payload  
    这个是因为 immer 只能处理可序列化的简单对象，不能处理类的实例，如果你的 action.payload 是一个类的实例，就会出现这个警告。  
    这里就需要对 action.payload 进行浅拷贝将它转化为一个简单对象。我们业务中的 action.payload 实际情况比较复杂，所以先关掉了 serializableCheck 检查，后面再优化这里的逻辑
- [redux-toolkit 报无法序列化 Warning A non-serializable value was detected in an action](https://blog.csdn.net/m0_48474585/article/details/121462589)