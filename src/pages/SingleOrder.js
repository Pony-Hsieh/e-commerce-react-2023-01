/**
 * 單一訂單頁面
 * 
 * 此頁面必須要帶上 orderId 的 queryString
 */

import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { cloneDeep } from 'lodash-es';
import { getDataOrderSingle, payOrder } from '../api/order';
import {
  Grid,
  Stack,
  Box,
  Typography,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';

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
        <Typography component="h4"
          variant="h5"
          align="center"
          sx={(theme) => ({
            paddingTop: theme.spacing(4),
            paddingBottom: theme.spacing(0),
          })}
        >
          訂購商品資訊
        </Typography>

        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">圖片</TableCell>
                <TableCell align="center">名稱</TableCell>
                <TableCell align="center" sx={{
                  display: {
                    xs: "none",
                    sm: "table-cell",
                  }
                }}>單價</TableCell>
                <TableCell align="center">數量</TableCell>
                <TableCell align="center">小計</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                Object.keys(dataOrder.products).map((eachProduct) => {
                  return (
                    <TableRow key={dataOrder.products[eachProduct].id}>
                      <TableCell align="center">
                        <Box
                          component="img"
                          sx={{
                            maxWidth: {
                              xs: 50,
                              md: 100
                            },
                          }}
                          src={dataOrder.products[eachProduct].product.imageUrl}
                          alt={dataOrder.products[eachProduct].product.title}
                          draggable="false"
                        />
                      </TableCell>
                      <TableCell align="center">{dataOrder.products[eachProduct].product.title}</TableCell>
                      <TableCell align="center" sx={{
                        display: {
                          xs: "none",
                          sm: "table-cell",
                        }
                      }}>{dataOrder.products[eachProduct].product.price}</TableCell>
                      <TableCell align="center">{dataOrder.products[eachProduct].qty}</TableCell>
                      <TableCell align="center">{dataOrder.products[eachProduct].total}</TableCell>
                    </TableRow>
                  )
                })
              }
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  }

  useEffect(() => {
    getInfoSingleOrder(orderId);
  }, []);

  return (
    <>
      <Typography component="h2"
        variant="h3"
        align="center"
        sx={(theme) => ({
          paddingTop: theme.spacing(4)
        })}
      >
        訂單詳情
      </Typography>

      <Box component="main"
        sx={(theme) => ({
          paddingY: theme.spacing(2)
        })}
      >
        <Grid container spacing={{ xs: 0, md: 3 }}>
          <Grid item xs sm />
          <Grid item
            xs={10}
            sm={8}
            md={6}
            lg={4}
          >
            <TableContainer>
              <Table aria-label="simple table">
                <TableBody>
                  <TableRow>
                    <TableCell align="center">訂單 id</TableCell>
                    <TableCell align="center">{dataOrder.id}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center" >訂單成立時間</TableCell>
                    <TableCell align="center" >{orderTime}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">訂單金額</TableCell>
                    <TableCell align="center">{dataOrder.total}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center" sx={{
                      borderBottom: "none"
                    }}>付款狀態</TableCell>
                    <TableCell align="center" sx={{
                      borderBottom: "none"
                    }}>{dataOrder.is_paid ? '已付款' : '未付款'}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            {
              !dataOrder.is_paid ?
                <Button variant="contained"
                  size="large"
                  onClick={btnHandlerPayOrder}
                  // disabled={dataOrder.is_paid ? true : false}
                  sx={(theme) => ({
                    display: "block",
                    marginX: "auto",
                    marginTop: theme.spacing(1),
                    marginBottom: theme.spacing(3),
                  })}
                >
                  付款
                </Button>
                :
                null
            }
            <Stack spacing={2}>
              {/* 避免還沒拿到資料就讓 React 渲染，進而造成錯誤 */}
              {
                dataOrder.id ?
                  <OrderProductInfo />
                  : null
              }
            </Stack>
          </Grid>
          <Grid item xs sm />
        </Grid>
      </Box>
    </>
  );
};

export default SingleOrder;
