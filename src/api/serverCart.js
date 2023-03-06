/**
 * server cart 相關 api
 */

import axios from 'axios';

const urlCart = `${process.env.REACT_APP_BASE_API_URL}/cart`;

/**
 * 取得 server cart 內容
 */
export function getServerCart() {
  try {
    return axios.get(urlCart);
  } catch (err) {
    console.error(err);
    return err;
  }
}

/**
 * 加入商品至 server cart
 * @param {Object} dataProduct - 產品資訊
 * {
    product_id: "",
    qty: 0,
  }
 * - [API 文檔](https://github.com/hexschool/vue3-course-api-wiki/wiki/%E5%AE%A2%E6%88%B6%E8%B3%BC%E7%89%A9-%5B%E5%85%8D%E9%A9%97%E8%AD%89%5D#%E5%8A%A0%E5%85%A5%E8%B3%BC%E7%89%A9%E8%BB%8A)
 */
export function addToServerCart(dataProduct) {
  const postData = {
    data: dataProduct
  };
  try {
    return axios.post(urlCart, postData);
  } catch (err) {
    return err;
  }
}

/**
 * 刪除 server cart - 單筆購物車紀錄
 * @param {string} singleCartId - 訂單 id
 * - [API 文檔](https://github.com/hexschool/vue3-course-api-wiki/wiki/%E5%AE%A2%E6%88%B6%E8%B3%BC%E7%89%A9-%5B%E5%85%8D%E9%A9%97%E8%AD%89%5D#%E5%88%AA%E9%99%A4%E6%9F%90%E4%B8%80%E7%AD%86%E8%B3%BC%E7%89%A9%E8%BB%8A%E8%B3%87%E6%96%99)
 */
export function deleteSingleServerCart(singleCartId) {
  const url = `${urlCart}/${singleCartId}`;
  try {
    return axios.delete(url);
  } catch (err) {
    return err;
  }
}

/**
 * 清空 server cart
 */
export async function deleteAllServerCart() {
  // Step: 取得 server cart 內容
  const resGetServerCart = await getServerCart();
  const nowServerCart = resGetServerCart.data.data.carts;
  // 上面這兩行測試之後不能合併，會造成無法成功取回資料
  // 原因可以再想一下

  if (nowServerCart.length === 0) {
    return;
  }

  // Step: 將購物車 id 全部加入至 arrDeleteCartId
  const arrDeleteCartId = [];
  nowServerCart.forEach((eachCartItem) => {
    arrDeleteCartId.push(eachCartItem.id);
  });

  // Step: 透過 deleteSingleServerCart 逐一刪除
  // forEach 內無法使用 await，故使用傳統迴圈
  let counterDeleteRes = 0;
  for (let i = 0; i < arrDeleteCartId.length; i++) {
    try {
      const res = await deleteSingleServerCart(arrDeleteCartId[i]);
      if (res.data.success) {
        counterDeleteRes++;
      }
    } catch (err) {
      console.error(err);
      return err;
    }
  }
  if (counterDeleteRes === arrDeleteCartId.length) {
    console.log('刪乾淨了');
  } else {
    console.warn('目前還沒刪乾淨');
    deleteAllServerCart();
  }
}
