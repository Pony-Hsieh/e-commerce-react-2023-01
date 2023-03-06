/**
 * 單一訂單頁面
 * 
 * 此頁面必須要帶上 orderId 的 queryString
 */

import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { cloneDeep } from 'lodash-es';
import { getDataOrderSingle, payOrder } from '../api/order';

function SingleOrder() {
  const [searchParams] = useSearchParams();
  const [dataOrder, setDataOrder] = useState({});
  const [orderTime, setOrderTime] = useState("");

  // 正式版
  const orderId = searchParams.get('orderId');
  // 測試用
  // const orderId = searchParams.get('orderId') || '-NMSP3W56UfyPyWwqBRU';

  /**
   * 取得單一訂單資料
   */
  async function getInfoSingleOrder(orderId) {
    if (!orderId) {
      console.error('請傳入正確的 orderId');
      return;
    }
    try {
      const res = await getDataOrderSingle(orderId);
      if (res.data.success) {
        setDataOrder(cloneDeep(res.data.order));
      }
      setOrderTime(convertUnixTimeStamp(res.data.order.create_at));
    } catch (err) {
      console.error(err);
      return;
    }
  }

  /**
   * 轉換 unix time stamp
   */
  function convertUnixTimeStamp(unixTimeStamp) {
    const dates = new Date(unixTimeStamp * 1000);
    const year = dates.getFullYear();
    const month = dates.getMonth() + 1;
    const date = dates.getDate();
    const hours = dates.getHours();
    const minutes = dates.getMinutes();

    return `${year}/${month.toString().padStart(2, '0')}/${date.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }

  /**
   * 付款
   */
  async function btnHandlerPayOrder() {
    if (!orderId) {
      console.error('請傳入正確的 orderId');
      return;
    }
    try {
      const res = await payOrder(orderId);
      if (res.data.success) {
        console.log('付款成功！');
        // 重新撈取訂單資料
        getInfoSingleOrder(orderId);
      }
    } catch (err) {
      console.error(err);
    }
  }

  function OrderProductInfo() {
    return (
      <>
        <h4>訂單商品資訊</h4>
        {
          Object.keys(dataOrder.products).map((eachProduct) => {
            return (
              <div key={dataOrder.products[eachProduct].product.id}>
                <div>商品名稱：{dataOrder.products[eachProduct].product.title}</div>
                <div>訂購數量：{dataOrder.products[eachProduct].qty}</div>
                <div>小計：{dataOrder.products[eachProduct].total}</div>
                <img src={dataOrder.products[eachProduct].product.imageUrl} alt={dataOrder.products[eachProduct].product.title} style={{ width: '100px' }} />
              </div>
            )
          })
        }
      </>
    );
  }

  useEffect(() => {
    getInfoSingleOrder(orderId);
  }, []);

  return (
    <>
      <h2>Single Order</h2>
      <div>訂單 id：{dataOrder.id}</div>
      <div>付款狀態：{dataOrder.is_paid ? '已付款' : '未付款'}</div>
      <div>訂單金額：{dataOrder.total}</div>
      <div>訂單成立時間：{orderTime}</div>
      {/* 避免還沒拿到資料就讓 React 渲染，進而造成錯誤 */}
      {
        dataOrder.id ?
          <OrderProductInfo />
          : null
      }
      <button
        type='button'
        onClick={btnHandlerPayOrder}
        disabled={dataOrder.is_paid ? true : false}
      >
        {dataOrder.is_paid ? '已付款' : '付款'}
      </button>
    </>
  );
};

export default SingleOrder;
