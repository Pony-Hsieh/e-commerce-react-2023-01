import { createSlice, current } from '@reduxjs/toolkit';
import { cloneDeep } from 'lodash-es';

const initialState = JSON.parse(localStorage.getItem('arrLocalStorageCart')) || [];

/**
 * 取得特定產品在 state 中的 index
 * @param {Object} state - state
 * @param {string} id - 產品 id
 * @return {number|null} - 該產品在 state 中的 index；若無，則回傳 null
 */
function getIndexSameProduct(state, id) {
  let indexSameProduct = null;
  for (let i = 0; i < state.length; i++) {
    if (state[i].id === id) {
      indexSameProduct = i;
      break;
    }
  }
  return indexSameProduct;
}

export const localStorageCartSlice = createSlice({
  name: 'localStorageCart',
  initialState,
  reducers: {
    /**
     * 新增、增加商品至 local storage cart
     * @param {Object} dataProduct - 商品資料
     * @param {number} qty - 欲多增加的數量
     */
    addProduct: (state, action) => {
      const convertedDataProduct = cloneDeep(action.payload.dataProduct);
      const qty = action.payload.qty;
      const indexSameProduct = getIndexSameProduct(state, convertedDataProduct.id);
      convertedDataProduct.qty = qty;
      console.log('convertedDataProduct', convertedDataProduct);
      if (convertedDataProduct.id === '') {
        console.error('沒有傳入正確的商品資料');
        return;
      }
      // 防呆
      if (convertedDataProduct.qty <= 0) {
        console.error('請輸入正確的數字');
        return;
      }
      if (indexSameProduct === null) {
        state.push(convertedDataProduct);
        localStorage.setItem('arrLocalStorageCart', JSON.stringify(current(state)));
        // TODO: 跳出彈出訊息提示使用者已經將商品加入購物車
      } else {
        localStorageCartSlice.caseReducers.mergeProductAmount(state, action);
      }
    },

    /**
     * 合併商品數量
     * @param {Object} dataProduct - 商品資料
     * @param {number} qty - 欲合併進原有數量的數量
     */
    mergeProductAmount: (state, action) => {
      const convertedDataProduct = cloneDeep(action.payload.dataProduct);
      const qty = action.payload.qty;
      const indexSameProduct = getIndexSameProduct(state, convertedDataProduct.id);
      convertedDataProduct.qty = qty;
      // 防呆
      if (convertedDataProduct.qty <= 0) {
        console.error('請輸入正確的數字');
        return;
      }
      if (state[indexSameProduct].qty === state[indexSameProduct].num) {
        // TODO: 跳出彈出訊息提示使用者
        console.warn('已達商品庫存上限，無法再增加更多');
        return;
      }
      if (convertedDataProduct.qty > 0) {
        // 合併商品數量
        convertedDataProduct.qty = state[indexSameProduct].qty + convertedDataProduct.qty;
        if (convertedDataProduct.qty > convertedDataProduct.num) {
          convertedDataProduct.qty = convertedDataProduct.num;
        }
        state.splice(indexSameProduct, 1, convertedDataProduct);
        localStorage.setItem('arrLocalStorageCart', JSON.stringify(current(state)));
        // TODO: 跳出彈出訊息提示使用者已更新購物車內該商品的數量
        console.warn(`已更新購物車內 ${convertedDataProduct.title} 的數量為 ${convertedDataProduct.qty} ${convertedDataProduct.unit}`);
      }
    },

    /**
     * 更新 local storage cart 商品數量
     * - local storage cart 內一定有此產品
     * @param {Object} dataProduct - 商品資料
     * @param {number} qty - 欲新增的數量
     */
    modifyProductAmount: (state, action) => {
      const convertedDataProduct = cloneDeep(action.payload.dataProduct);
      const qty = action.payload.qty;
      const indexSameProduct = getIndexSameProduct(state, convertedDataProduct.id);
      convertedDataProduct.qty = qty;
      // 防呆
      if (convertedDataProduct.qty < 0) {
        console.error('請輸入正確的數字');
        return;
      }
      if (convertedDataProduct.qty === 0) {
        // TODO: 跳出彈出訊息詢問使用者是否要刪除產品？
        console.warn('是否刪除該產品？');
        return;
        const convertedAction = cloneDeep(action);
        convertedAction.payload = convertedDataProduct.id;
        localStorageCartSlice.caseReducers.deleteProductAmount(state, convertedAction);
        return;
      }
      if (qty > convertedDataProduct.num) {
        convertedDataProduct.qty = convertedDataProduct.num;
        state.splice(indexSameProduct, 1, convertedDataProduct);
        localStorage.setItem('arrLocalStorageCart', JSON.stringify(current(state)));
        // TODO: 跳出彈出訊息提示使用者
        console.warn(`輸入的數量超過庫存上限，已為您將 ${convertedDataProduct.title} 的數量更新為庫存上限： ${convertedDataProduct.num} ${convertedDataProduct.unit}`);
        return;
      }
      if (convertedDataProduct.qty > 0) {
        state.splice(indexSameProduct, 1, convertedDataProduct);
        localStorage.setItem('arrLocalStorageCart', JSON.stringify(current(state)));
        // TODO: 跳出彈出訊息提示使用者已更新購物車內該商品的數量
        console.warn(`已更新購物車內 ${convertedDataProduct.title} 的數量為 ${convertedDataProduct.qty} ${convertedDataProduct.unit}`);
        return;
      }
    },

    /**
     * 減少 local storage cart 內的商品
     * 在購物車頁面點擊 '減少' 按鈕
     * @param {Object} dataProduct - 商品資料
     */
    decreaseProductAmount: (state, action) => {
      const convertedDataProduct = cloneDeep(action.payload.dataProduct);
      const indexSameProduct = getIndexSameProduct(state, convertedDataProduct.id);
      if (state.length === 0) {
        console.error('目前 LS Cart 內沒有商品');
        return;
      }
      if (state[indexSameProduct].qty > 1) {
        convertedDataProduct.qty = state[indexSameProduct].qty - 1;
        state.splice(indexSameProduct, 1, convertedDataProduct);
        localStorage.setItem('arrLocalStorageCart', JSON.stringify(current(state)));
        return;
      }
      if (state[indexSameProduct].qty === 1) {
        // TODO: 跳出彈窗，詢問使用者是否真的要移除商品
        console.warn('是否刪除該產品？');
        // const convertedAction = cloneDeep(action);
        // convertedAction.payload = convertedDataProduct.id;
        // localStorageCartSlice.caseReducers.deleteProductAmount(state, convertedAction);
        return;
      }
    },

    /**
     * 移除 local storage cart 內的商品
     * @param {string} id - 商品 id
     */
    deleteProductAmount: (state, action) => {
      const id = action.payload;
      const indexSameProduct = getIndexSameProduct(state, id);
      let dataProductToBeDeleted = {};
      if (state.length === 0) {
        console.error('目前 LS Cart 內沒有商品');
        return;
      }
      dataProductToBeDeleted = cloneDeep(state[indexSameProduct]);
      state.splice(indexSameProduct, 1);
      localStorage.setItem('arrLocalStorageCart', JSON.stringify(current(state)));
      // TODO: 跳出彈出訊息提示使用者
      // console.warn(`已將 ${dataProductToBeDeleted.title} 移出購物車`);
    },

    /**
     * 清空 local storage cart
     */
    clearLocalStorageCart: (state) => {
      // 清空 state 這個 array
      while (state.length > 0) {
        state.pop();
      }
      localStorage.setItem('arrLocalStorageCart', JSON.stringify(current(state)));
    },
  },
});

export const {
  addProduct,
  modifyProductAmount,
  decreaseProductAmount,
  deleteProductAmount,
  clearLocalStorageCart
} = localStorageCartSlice.actions;

export const selectLocalStorageCart = (state) => {
  // console.log('state', state); // test to know what state mean here
  return state.localStorageCart; // 這裡的 state 指得是全域的 redux 
};

export default localStorageCartSlice.reducer;
