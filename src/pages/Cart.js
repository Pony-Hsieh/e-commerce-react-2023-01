/**
 * 購物車頁面
 * 
 * 基本上所有的操作都在 local storage cart
 * 只有最後要送出訂單的時候使用 server cart
 */

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, createSearchParams } from "react-router-dom";
import { cloneDeep } from 'lodash-es';
import {
  addProduct,
  modifyProductAmount,
  decreaseProductAmount,
  clearLocalStorageCart,
  selectLocalStorageCart
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
import {
  Container,
  Box,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  IconButton,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Stack,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import NavBar from "../components/NavBar";
import { flexCenter } from '../styles/muiCommonStyle';

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // 取得 local storage cart
  const arrLocalStorageCart = useSelector(selectLocalStorageCart);
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
  // 確認是否將產品移出購物車 modal 的顯示狀態
  const [deleteModalShowStatus, setDeleteModalShowStatus] = useState(false);
  // 移出購物車產品的資料
  const [dataProductToBeDeleted, setDataProductToBeDeleted] = useState({});

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
    // Step: 設置欲刪除商品資訊
    setDataProductToBeDeleted(dataProduct);
    // Step: 顯示刪除用 modal
    setDeleteModalShowStatus(true);
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

  function handleClose() {
    console.log('handleClose');
    setDeleteModalShowStatus(false);
  }

  function handleRemoveProductFromCart(dataProduct) {
    console.log('handleRemoveProductFromCart');
    dispatch(modifyProductAmount({
      dataProduct,
      qty: 0
    }));
    setDeleteModalShowStatus(false);
  }

  useEffect(() => {
    getCouponInfoFromLocalStorage();
  }, []);

  return (
    <>
      <NavBar />

      <Container component="main"
        sx={(theme) => ({
          paddingTop: theme.spacing(4),
          paddingBottom: theme.spacing(8),
        })}
      >
        <Stack spacing={2}
          sx={{
            ...flexCenter(),
          }}
        >

          {/* 頁面標題 */}
          <Typography component="h1"
            variant="h3"
            align="center"
          >
            購物車
          </Typography>

          {/* 商品 */}
          <Container>
            <Typography component="h3"
              variant="h4"
              align="center"
            >
              商品
            </Typography>
            <TableContainer>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    {/* <TableCell align="center">圖片</TableCell> */}
                    <TableCell align="center"
                      sx={{
                        minWidth: "100px"
                      }}
                    >商品</TableCell>
                    <TableCell align="center"
                      sx={{
                        display: {
                          xs: "none",
                          sm: "table-cell",
                        }
                      }}
                    >單價</TableCell>
                    <TableCell align="center"
                      sx={{
                        maxWidth: "100px"
                      }}
                    >數量</TableCell>
                    <TableCell align="center">小計</TableCell>
                    <TableCell align="center">刪除</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    arrLocalStorageCart
                      .map((eachProduct) => {
                        return (
                          <TableRow key={eachProduct.id}>
                            {/* 商品名稱 */}
                            <TableCell align="center">
                              {eachProduct.title}
                              <Box component="img"
                                src={eachProduct.imageUrl}
                                alt={eachProduct.title}
                                sx={{
                                  display: "block",
                                  margin: "0 auto",
                                  width: "100px",
                                }}
                              />
                            </TableCell>
                            {/* 商品單價(僅 PC 版) */}
                            <TableCell align="center"
                              sx={{
                                display: {
                                  xs: "none",
                                  sm: "table-cell",
                                },
                              }}
                            >
                              {Number(eachProduct.price) * (usingCoupon.percent / 100)}
                            </TableCell>
                            {/* 商品數量 */}
                            <TableCell align="center">
                              <Box sx={{
                                ...flexCenter(),
                                flexDirection: {
                                  xs: "column-reverse",
                                  sm: "row",
                                },
                                margin: "0 auto",
                                width: {
                                  xs: "64px",
                                  sm: "auto",
                                },
                                height: "100%",
                              }}>

                                {/* 減少 */}
                                <IconButton color="primary"
                                  onClick={() => { btnHandlerDecreaseProduct(eachProduct) }}
                                >
                                  <RemoveIcon />
                                </IconButton>
                                {/* 直接修改 */}
                                <TextField
                                  hiddenLabel
                                  type="number"
                                  size="small"
                                  value={eachProduct.qty}
                                  onChange={(event) => {
                                    btnHandlerModifyProductAmount(eachProduct, Number(event.target.value))
                                  }}
                                  sx={{
                                    width: "44px",
                                    height: "44px",
                                    input: {
                                      textAlign: "center",
                                      padding: "8.5px",
                                    },
                                  }}
                                />
                                {/* 增加 */}
                                <IconButton color="primary"
                                  onClick={() => { btnHandlerIecreaseProduct(eachProduct) }}
                                >
                                  <AddIcon />
                                </IconButton>
                              </Box>
                            </TableCell>
                            {/* 小計 */}
                            <TableCell align="center">
                              {Number(eachProduct.price) * (usingCoupon.percent / 100) * (eachProduct.qty)}
                            </TableCell>
                            {/* 刪除 */}
                            <TableCell align="center">
                              <IconButton color="error"
                                onClick={() => {
                                  btnHandlerDeleteProduct(eachProduct)
                                }}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        );
                      })
                      .reverse()
                  }
                </TableBody>
              </Table>
            </TableContainer>
          </Container>

          {/* Coupon 相關 */}
          <Container maxWidth="xs">
            <Card elevation={0}
              sx={{
                backgroundColor: "transparent",
              }}
            >
              {
                usingCoupon.code
                  ?
                  <>
                    <CardHeader
                      title="已套用 coupon"
                      align="center"
                    />
                    <CardContent sx={{
                      ...flexCenter(),
                      flexDirection: "column",
                    }}>
                      <Typography variant="body1" component="p">
                        名稱：{usingCoupon.title}
                      </Typography>
                      <Typography variant="body1" component="p">
                        優惠代碼：{usingCoupon.code}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button variant="outlined"
                        color="error"
                        onClick={cancelApplyCoupon}
                        disabled={usingCoupon.code ? false : true}
                        sx={{
                          display: "block",
                          margin: "0 auto",
                        }}
                      >取消套用此 coupon</Button>
                    </CardActions>
                  </>
                  :
                  <>
                    <CardHeader
                      title="套用 coupon"
                      align="center"
                    />
                    <CardContent sx={{
                      ...flexCenter(),
                    }}>
                      <TextField label="輸入優惠代碼"
                        value={inputCouponCode}
                        onChange={(event) => setInputCouponCode(event.target.value)}
                      />
                    </CardContent>
                    <CardActions>
                      <Button variant="outlined"
                        onClick={btnHandlerApplyCoupon}
                        disabled={inputCouponCode ? false : true}
                        sx={{
                          display: "block",
                          margin: "0 auto",
                        }}
                      >套用 coupon</Button>
                    </CardActions>
                  </>
              }
            </Card>
          </Container>

          {/* 收件資訊 */}
          <Container maxWidth="sm">
            <form>
              <Stack spacing={3}>
                <Typography component="h3"
                  variant="h4"
                  align="center"
                  sx={(theme) => ({
                    marginTop: theme.spacing(2)
                  })}
                >
                  收件資訊
                </Typography>
                {/* TODO: 待新增驗證邏輯 */}
                <TextField label="姓名"
                  required
                  value={recipientInfo.user.name}
                  onChange={(event) => updateForm(event, 'name')}
                />
                <TextField label="E-mail"
                  required
                  type="email"
                  value={recipientInfo.user.email}
                  onChange={(event) => updateForm(event, 'email')}
                />
                <TextField label="電話"
                  required
                  type="tel"
                  value={recipientInfo.user.tel}
                  onChange={(event) => updateForm(event, 'tel')}
                />
                <TextField label="地址"
                  required
                  value={recipientInfo.user.address}
                  onChange={(event) => updateForm(event, 'address')}
                />
                <TextField label="備註"
                  multiline
                  value={recipientInfo.message}
                  onChange={(event) => updateForm(event, 'message')}
                />
              </Stack>
            </form>
          </Container>
        </Stack>

        {/* 送出訂單 */}
        <Box sx={(theme) => ({
          ...flexCenter(),
          marginTop: theme.spacing(6),
        })}>
          <Button variant="contained"
            size="large"
            onClick={btnHandlerSubmitForm}
            sx={{
              display: "block",
              margin: "0 auto",
              width: "200px",
            }}
          >
            送出訂單
          </Button>
        </Box>
      </Container >

      {/* DeletModal */}
      <Box>
        <Dialog
          open={deleteModalShowStatus}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            確定要刪除嗎？
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              商品名稱： {dataProductToBeDeleted.title}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>取消</Button>
            <Button onClick={() => {
              handleRemoveProductFromCart(dataProductToBeDeleted)
            }} color="error">刪除</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}

export default Cart;
