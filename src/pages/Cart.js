/**
 * 購物車頁面
 * 
 * 基本上所有的操作都在 local storage cart
 * 只有最後要送出訂單的時候使用 server cart
 */

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, createSearchParams } from "react-router-dom";
import { cloneDeep } from 'lodash-es';
import {
  addProduct,
  modifyProductAmount,
  decreaseProductAmount,
  clearLocalStorageCart
} from '../slices/localStorageCartSlice';
import {
  createOrder,
  getCouponInfo,
  applyCoupon
} from '../api/order';
import {
  addToServerCart,
  deleteAllServerCart,
} from '../api/serverCart';

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // 取得 local storage cart
  const arrLocalStorageCart = JSON.parse(localStorage.getItem("arrLocalStorageCart")) || [];
  const [recipientInfo, setRecipientInfo] = useState({
    user: {
      name: '',
      email: '',
      tel: '',
      address: '',
    },
    message: '',
  });
  // 使用者輸入的 coupon code
  const [inputCouponCode, setInputCouponCode] = useState('');
  const [usingCoupon, setUsingCoupon] = useState({
    title: '', // coupon 名稱
    code: '', // 優惠碼
    percent: 100, // 折數，80 代表 8折
  });

  /**
   * 商品 + 1
   */
  function btnHandlerIecreaseProduct(productInfo) {
    const dataProduct = cloneDeep(productInfo);
    dispatch(addProduct({
      dataProduct,
      qty: 1
    }));
  }

  /**
   * 商品 - 1
   */
  function btnHandlerDecreaseProduct(productInfo) {
    const dataProduct = cloneDeep(productInfo);
    dispatch(decreaseProductAmount({ dataProduct }));
  }

  /**
   * 修改商品數量
   * @param {Object} productInfo - 商品資訊
   * @param {number} qty - 商品數量
   */
  function btnHandlerModifyProductAmount(productInfo, qty) {
    const dataProduct = cloneDeep(productInfo);
    let convertedQty = qty;
    if (convertedQty <= 0) {
      console.log('幫你改成 1');
      convertedQty = 1;
    }
    dispatch(modifyProductAmount({
      dataProduct,
      qty: convertedQty
    }));
  }

  /**
   * 刪除商品
   */
  function btnHandlerDeleteProduct(productInfo) {
    const dataProduct = cloneDeep(productInfo);
    dispatch(modifyProductAmount({
      dataProduct,
      qty: 0
    }));
  }

  /**
   * 送出訂單
   */
  async function btnHandlerSubmitForm() {
    // Step: 確認 local storage cart 是否為空
    if (arrLocalStorageCart.length === 0) {
      return;
    }

    // Step: 檢查收件資料是否符合規範
    switch (checkRecipientInfo()) {
      case 'name': {
        alert('請填寫收件人名稱');
        return;
      }
      case 'email': {
        alert('請填寫 E-mail');
        return;
      }
      case 'tel': {
        alert('請填寫收件人電話');
        return;
      }
      case 'address': {
        alert('請填寫收件人地址');
        return;
      }
    }

    // Step: 清空 server cart
    try {
      await deleteAllServerCart();
    } catch (err) {
      console.error(err);
    }

    // Step: 將 local storage cart 加入至 server cart
    const requestArr = [];
    arrLocalStorageCart.forEach((eachProduct) => {
      const dataProduct = {
        product_id: eachProduct.id,
        qty: eachProduct.qty,
      }
      requestArr.push(addToServerCart(dataProduct));
    });
    try {
      // TODO: 如果發生沒有將 local storage cart 全部加入 server cart 的狀況，要怎麼處理？
      // const res = await Promise.allSettled(requestArr);
      await Promise.allSettled(requestArr);
    } catch (err) {
      console.error(err);
    }

    // Step: 套用 coupon
    try {
      await applyCoupon(usingCoupon.code);
    } catch (err) {
      console.error(err);
    }

    // Step: 送出訂單
    let orderId = '';
    try {
      const res = await createOrder({ data: recipientInfo });
      console.log('res createOrder', res);
      if (res.data.success) {
        orderId = res.data.orderId;
      }
    } catch (err) {
      alert('訂單送出失敗，請重新整理頁面後再試');
      console.error(err);
    }

    // Step: 清空 local storage cart
    dispatch(clearLocalStorageCart());

    // Step: 清空 local storage coupon
    localStorage.removeItem('objectLocalStorageCoupon');
    setUsingCoupon({
      title: '',
      code: '',
      percent: 100,
    });

    // Step: 跳轉到 singleOrder 頁面
    const params = { orderId: orderId };
    navigate({
      pathname: '/singleOrder',
      search: `?${createSearchParams(params)}`,
    });
    // return;
  }

  /**
   * 更新收件人、訂單資訊
   * @param {Object} event - event
   * @param {string} field - 欄位
   */
  function updateForm(event, field) {
    const cloneRecipientInfo = cloneDeep(recipientInfo);
    switch (field) {
      case 'name': {
        cloneRecipientInfo.user.name = event.target.value;
        break;
      }
      case 'email': {
        cloneRecipientInfo.user.email = event.target.value;
        break;
      }
      case 'tel': {
        cloneRecipientInfo.user.tel = event.target.value;
        break;
      }
      case 'address': {
        cloneRecipientInfo.user.address = event.target.value;
        break;
      }
      case 'message': {
        cloneRecipientInfo.message = event.target.value;
        break;
      }
      default: {
        console.error('未傳入正確的欄位！');
        return;
      }
    }
    setRecipientInfo(cloneRecipientInfo);
  }

  /**
   * 檢查表單是否都有正確填寫
   */
  function checkRecipientInfo() {
    if (recipientInfo.user.name === '') {
      return 'name';
    }
    if (recipientInfo.user.email === '') {
      return 'email';
    }
    if (recipientInfo.user.tel === '') {
      return 'tel';
    }
    if (recipientInfo.user.address === '') {
      return 'address';
    }
    return true;
  }

  /**
   * 從 local storage 取得 coupon 資訊 
   */
  function getCouponInfoFromLocalStorage() {
    const localStorageCoupon = JSON.parse(localStorage.getItem('objectLocalStorageCoupon'));
    if (localStorageCoupon === null) {
      return;
    }
    if (localStorageCoupon.code !== '') {
      setUsingCoupon({
        title: localStorageCoupon.title,
        code: localStorageCoupon.code,
        percent: localStorageCoupon.percent,
      });
    }
  }

  /**
   * 套用 coupon
   * 
   * 實際行為只有將 coupon 資料存入 objectLocalStorageCoupon 中
   * 套用新 coupon 的話，所有的都會套用，舊有的也會被覆蓋掉，所以只要取第一項產品的 coupon 資料即可
   */
  async function btnHandlerApplyCoupon() {
    if (inputCouponCode === '') {
      alert('請輸入 coupon code');
      // 如果值為空，該 button 也會 disable，使用者無法點擊
      return;
    }
    try {
      const couponInfo = await getCouponInfo(inputCouponCode);
      localStorage.setItem('objectLocalStorageCoupon', JSON.stringify(couponInfo));
      setUsingCoupon({
        title: couponInfo.title,
        code: couponInfo.code,
        percent: couponInfo.percent,
      });
      setInputCouponCode('');
      alert(`成功套用 ${couponInfo.code}！`);
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * 取消套用 coupon
   */
  function cancelApplyCoupon() {
    localStorage.removeItem("objectLocalStorageCoupon");
    setUsingCoupon({
      title: '',
      code: '',
      percent: 100,
    });
    alert('已取消套用 coupon');
  }

  /**
   * 測試用按鈕
   */
  async function btnHandlerTest() {
    dispatch(clearLocalStorageCart());
  }

  useEffect(() => {
    getCouponInfoFromLocalStorage();
  }, []);

  const productList = arrLocalStorageCart
    .map((eachProduct) => {
      return (
        <li key={eachProduct.id} style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          {/* 商品名稱 */}
          <div>{eachProduct.title}</div>
          {/* 商品圖片 */}
          <img src={eachProduct.imageUrl} alt={eachProduct.title} style={{
            maxWidth: '100px',
            justifyContent: 'space-between',
          }} />
          {/* 商品單價(僅 PC 版) */}
          <div>{Number(eachProduct.price) * (usingCoupon.percent / 100)}</div>
          {/* 商品小計 */}
          <div>{Number(eachProduct.price) * (usingCoupon.percent / 100) * (eachProduct.qty)}</div>
          {/* 商品數量 */}
          <input type="number" value={eachProduct.qty} onChange={(event) => {
            btnHandlerModifyProductAmount(eachProduct, Number(event.target.value))
          }} />
          {/* 減少 */}
          <button type='button' onClick={() => {
            btnHandlerDecreaseProduct(eachProduct)
          }}>-</button>
          {/* 刪除 */}
          <button type='button' onClick={() => {
            btnHandlerDeleteProduct(eachProduct)
          }}>刪除</button>
          {/* 增加 */}
          <button type='button' onClick={() => { btnHandlerIecreaseProduct(eachProduct) }}>+</button>
        </li >
      );
    })
    .reverse()
    ;

  return (
    <>
      <button type='button' onClick={btnHandlerTest}>測試</button>
      <h1>Cart Page</h1>
      <div>{productList}</div>
      <div>
        <h3>coupon</h3>
        {
          usingCoupon.code
            ?
            <div>
              <h4>已套用的 coupon</h4>
              <div>名稱：{usingCoupon.title}</div>
              <div>優惠代碼：{usingCoupon.code}</div>
              <button type='button' onClick={cancelApplyCoupon} disabled={usingCoupon.code ? false : true}>取消套用此 coupon</button>
            </div>
            :
            null
        }
        <label>
          輸入優惠代碼：
          <input type='text' value={inputCouponCode} onChange={(event) => setInputCouponCode(event.target.value)} />
        </label>
        <br />
        <button type='button' onClick={btnHandlerApplyCoupon} disabled={inputCouponCode ? false : true}>套用 coupon</button>
      </div>
      <form>
        <h3>收件資訊</h3>
        <label>
          姓名：
          <input name='name' type='text' required value={recipientInfo.user.name} onChange={(event) => updateForm(event, 'name')} />
        </label>
        <br />
        <label>
          E-mail:
          <input name='email' type='email' required value={recipientInfo.user.email} onChange={(event) => updateForm(event, 'email')} />
        </label>
        <br />
        <label>
          tel:
          <input name='tel' type='tel' required value={recipientInfo.user.tel} onChange={(event) => updateForm(event, 'tel')} />
        </label>
        <br />
        <label>
          地址：
          <input name='address' type='text' required value={recipientInfo.user.address} onChange={(event) => updateForm(event, 'address')} />
        </label>
        <br />
        <label>
          備註：
          <textarea name='message' value={recipientInfo.message} onChange={(event) => updateForm(event, 'message')}></textarea>
        </label>
        <br />
        <button type='button' onClick={btnHandlerSubmitForm}>送出訂單</button>
      </form>
    </>
  );
}

export default Cart;
