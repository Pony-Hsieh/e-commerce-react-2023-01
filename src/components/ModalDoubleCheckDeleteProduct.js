import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { cloneDeep } from 'lodash-es';
import { modifyProductAmount } from '../slices/localStorageCartSlice';

/**
 * TODO: 要記錄哪些資料？
 * 可以全部都記，到時候要運用資料的時候會有比較高的彈性
 */
function ModalDoubleCheckDeleteProduct(props) {
  const dispatch = useDispatch();
  const [statusShow, setStatusShow] = useState(false);
  const { dataProduct } = props;
  const dataProductToBeDeleted = cloneDeep(dataProduct);

  function btnHandlerDeleteProduct() {
    console.log("dataProductToBeDeleted", dataProductToBeDeleted);
    dispatch(modifyProductAmount({
      dataProduct: dataProductToBeDeleted,
      qty: 0
    }));
    console.error("test");
    setStatusShow(() => false);
    return;
  }
  function btnHandlerHidePop() {
    console.log('btnHandlerHidePop');
    setStatusShow(() => false);
  }
  function btnHandlerShowModal() {
    console.log('btnHandlerShowModal');
    setStatusShow(() => true);
  }

  return (
    <>
      <button type='button' onClick={btnHandlerShowModal}>顯示 modal</button>
      {
        statusShow ?
          <div className="wrapper-modal-check-delete-single-product">
            <h3>是否刪除該產品？{dataProduct.title}</h3>
            <button type='button' onClick={btnHandlerDeleteProduct}>是</button>
            <button type='button' onClick={btnHandlerHidePop}>否</button>
          </div>
          :
          null
      }
    </>
  );
}

export default ModalDoubleCheckDeleteProduct;
