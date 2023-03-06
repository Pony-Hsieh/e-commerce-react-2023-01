/**
 * 訂單相關 api
 */

import axios from 'axios';
import {
  getServerCart,
  addToServerCart
} from '../api/serverCart';

const urlOrder = `${process.env.REACT_APP_BASE_API_URL}/order`;
const urlCoupon = `${process.env.REACT_APP_BASE_API_URL}/coupon`;
const urlPay = `${process.env.REACT_APP_BASE_API_URL}/pay`;

/**
 * 套用 coupon
 * @param {string} couponCode - coupon code
 * - [API 文檔](https://github.com/hexschool/vue3-course-api-wiki/wiki/%E5%AE%A2%E6%88%B6%E8%B3%BC%E7%89%A9-%5B%E5%85%8D%E9%A9%97%E8%AD%89%5D#%E5%A5%97%E7%94%A8%E5%84%AA%E6%83%A0%E5%88%B8)
 * 資料格式
 * {
    "data": {
      "code": "ALL_20_OFF"
    }
  }
 * 可用 coupon
 * ALL_20_OFF: 全館 8 折 coupon
 * 0_OFF: 取消套用 coupon 用
 */
export function applyCoupon(couponCode) {
  const postData = {
    data: {
      code: couponCode
    }
  }
  try {
    return axios.post(urlCoupon, postData);
  } catch (err) {
    console.error(err);
    return err;
  }
}

/**
 * 確認 coupon 是否可用
 * @param {string} couponCode - coupon code
 * @return {boolean}
 * 
 * 不用 export
 */
async function checkCouponIsValid(couponCode) {
  const fakeCartInfo = {
    product_id: "-MPseqW11lTu_HkgXL2j", // 男子 排汗短袖
    qty: 1,
  };

  // Step: 發送虛假購物車請求，確保 server cart 目前有東西可供 coupon apply
  try {
    const resAddToServerCart = await addToServerCart(fakeCartInfo);
    if (resAddToServerCart.data.success === false) {
      console.error('資料取得失敗，請刷新頁面後再試');
      return false;
    }
  } catch (err) {
    console.error(err);
    return err;
  }

  // Step: 套用 coupon 至 server cart
  try {
    const resApplyCoupon = await applyCoupon(couponCode);
    if (resApplyCoupon.data.success === false) {
      console.error('無法套用此優惠券!');
      return false;
    }
  } catch (err) {
    console.error(err);
    return err;
  }

  return true;
}

/**
 * 取得 coupon 資訊
 * @param {string} couponCode - coupon code
 * @return {Object} coupon 相關資訊
 */
export async function getCouponInfo(couponCode) {
  // VS Code 會提示 "'await' 對此運算式的類型沒有作用"，不要理他
  const couponIsValid = await checkCouponIsValid(couponCode);
  if (couponIsValid === false) {
    return null;
  }
  const serverCart = await getServerCart();
  return serverCart.data.data.carts[0].coupon;
}

/**
 * 建立訂單
 * @param {Object} customerInfo - 用戶相關資料
 * 測試用訂單 id: '-NMS9mA92reVh8YIA_Eq'
 * - [API 文檔](https://github.com/hexschool/vue3-course-api-wiki/wiki/%E5%AE%A2%E6%88%B6%E8%B3%BC%E7%89%A9-%5B%E5%85%8D%E9%A9%97%E8%AD%89%5D#%E7%B5%90%E5%B8%B3%E9%A0%81%E9%9D%A2)
 * 資料格式
 * {
    "data": {
      "user": {
        "name": "test",
        "email": "test@gmail.com",
        "tel": "0912346768",
        "address": "kaohsiung"
      },
      "message": "這是留言"
    }
  }
 */
export function createOrder(customerInfo) {
  try {
    return axios.post(urlOrder, customerInfo);
  } catch (err) {
    console.error(err);
    return err;
  }
}

/**
 * 取得特定訂單資訊
 * @param {string} orderId - 訂單 id
 * 測試用訂單 id: '-NMS9mA92reVh8YIA_Eq'
 * - [API 文檔](https://github.com/hexschool/vue3-course-api-wiki/wiki/%E5%AE%A2%E6%88%B6%E8%B3%BC%E7%89%A9-%5B%E5%85%8D%E9%A9%97%E8%AD%89%5D#%E5%8F%96%E5%BE%97%E6%9F%90%E4%B8%80%E7%AD%86%E8%A8%82%E5%96%AE)
 */
export function getDataOrderSingle(orderId) {
  if (orderId === undefined) {
    console.error('請傳入正確的訂單 id');
    return;
  }
  const url = `${urlOrder}/${orderId}`;
  try {
    return axios.get(url);
  } catch (err) {
    console.error(err);
    return err;
  }
}

/**
 * 訂單付款
 * @param {string} orderId - 訂單 id
 * 測試用訂單 id: '-NMS9mA92reVh8YIA_Eq'
 * - [API 文檔](https://github.com/hexschool/vue3-course-api-wiki/wiki/%E5%AE%A2%E6%88%B6%E8%B3%BC%E7%89%A9-%5B%E5%85%8D%E9%A9%97%E8%AD%89%5D#%E7%B5%90%E5%B8%B3%E4%BB%98%E6%AC%BE)
 */
export function payOrder(orderId) {
  if (orderId === undefined) {
    console.error('請傳入正確的訂單 id');
    return;
  }
  const url = `${urlPay}/${orderId}`;
  try {
    return axios.post(url);
  } catch (err) {
    console.error(err);
    return err;
  }
}
