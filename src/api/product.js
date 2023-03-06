/**
 * 商品相關 api
 */

import axios from 'axios';

const urlAllProduct = `${process.env.REACT_APP_BASE_API_URL}/products`;
const urlSingelProduct = `${process.env.REACT_APP_BASE_API_URL}/product`;

/**
 * 取得所有商品資訊
 */
export function getDataProductsAll() {
  const url = `${urlAllProduct}/all`;
  try {
    return axios.get(url);
  } catch (err) {
    console.error(err);
    return err;
  }
}

/**
 * 取得單一商品細節
 * - 測試用商品 id: '-MPseqW11lTu_HkgXL2j' (男子 排汗短袖)
 */
export function getDataProductSingle(id) {
  const url = `${urlSingelProduct}/${id}`;
  try {
    return axios.get(url);
  } catch (err) {
    console.error(err);
    return err;
  }
}
