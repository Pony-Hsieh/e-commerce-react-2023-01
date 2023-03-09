/**
 * 單一產品頁面
 * 
 * 此頁面必須要帶上 productId 的 queryString
 */

import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getDataProductSingle } from '../api/product';
import { addProduct } from '../slices/localStorageCartSlice';
import {
  Grid,
  Box,
  Typography,
  Button,
  IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import '../styles/singleProduct.css'

function SingleProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [dataProduct, setDataProduct] = useState({
    category: "",
    description: "",
    id: "", // e.g., "-MPseqW11lTu_HkgXL2j"
    imageUrl: "",
    is_enabled: 0,
    num: 0,
    origin_price: "",
    price: "",
    title: "", // e.g., "男子 排汗短袖"
    unit: ""
  });
  const [numAddProduct, setNumAddProduct] = useState(1);

  // 正式版
  const productId = searchParams.get('productId');
  // 測試用
  // 男子 排汗短袖
  // const productId = searchParams.get('productId') || '-MPseqW11lTu_HkgXL2j';
  // 男子 保暖帽T
  // const productId = searchParams.get('productId') || '-MQfy1oYhE8j1LHtdwL1';

  /**
   * 查無此產品資料
   */
  function haveNoProduct() {
    // TODO: 待製作彈出訊息提示使用者
    console.error('查無此產品資料');
    // Step: 回到上一頁
    setTimeout(() => {
      navigate(-1);
    }, 3000);
  }

  /**
   * 增加欲加入的商品數量
   * OK
   */
  function handlerIncreaseNumAddProduct() {
    if (dataProduct.id === '') {
      console.warn('目前資料還沒撈回來');
      return;
    }
    if (dataProduct.is_enabled === 0) {
      // TODO: 待製作彈出訊息提示使用者
      console.warn('目前無法提供此商品');
      return;
    }
    if (numAddProduct >= dataProduct.num) {
      // TODO: 待製作彈出訊息提示使用者
      console.warn('超出商品庫存上限，系統為您將加入數量調整為商品庫存上限');
      return;
      // 
    }
    setNumAddProduct((prevNum) => prevNum + 1);
  }

  /**
   * 減少欲加入的商品數量
   * OK
   */
  function handlerDecreaseNumAddProduct() {
    if (dataProduct.id === '') {
      console.warn('目前資料還沒撈回來');
      return;
    }
    if (dataProduct.is_enabled === 0) {
      // TODO: 待製作彈出訊息提示使用者
      console.warn('目前無法提供此商品');
      return;
    }
    if (numAddProduct <= 1) {
      console.warn('目前已達數量下限');
      return;
    }
    setNumAddProduct((prevNum) => prevNum - 1);
  }

  /**
   * 將商品加入 local storage cart
   */
  function handlerAddProduct() {
    if (dataProduct.is_enabled === 0) {
      // TODO: 待製作彈出訊息提示使用者
      console.warn('目前無法提供此商品');
      return;
    }
    if (numAddProduct > dataProduct.num) {
      // TODO: 待製作彈出訊息提示使用者
      console.warn('超出商品庫存上限，系統為您將加入數量調整為商品庫存上限');
      setNumAddProduct(() => dataProduct.num);
    }
    dispatch(addProduct({
      dataProduct,
      qty: numAddProduct
    }));
  }

  useEffect(() => {
    if (!productId) {
      haveNoProduct();
      return;
    }
    // 目前沒有資料
    if (dataProduct.title === '') {
      // TODO: 那如果是直接跳轉到另外一個 單一商品頁的話，這樣的邏輯會不會導致無法重新抓取單一商品資料？
      getDataProductSingle(productId)
        .then((res) => {
          const resProductInfo = res.data.product;
          setDataProduct(() => {
            return {
              category: resProductInfo.category,
              description: resProductInfo.description,
              id: resProductInfo.id,
              imageUrl: resProductInfo.imageUrl,
              is_enabled: resProductInfo.is_enabled,
              num: resProductInfo.num,
              origin_price: resProductInfo.origin_price,
              price: resProductInfo.price,
              title: resProductInfo.title,
              unit: resProductInfo.unit,
            };
          });
        })
        .catch((err) => {
          console.error(err);
          // TODO:
          // Step: 跳出提示訊息：查無此產品
          // Step: 幾秒後跳轉回商品頁
        });
    }
  }, []);

  return (
    <Box>
      <Grid container spacing={{ xs: 0, md: 3 }} >
        <Grid item xs sm />
        <Grid item
          xs={10}
          sm={8}
        >
          <Box sx={(theme) => ({
            paddingTop: {
              sm: theme.spacing(6)
            },
          })}>
            <Grid container spacing={4}>
              <Grid item
                xs={12}
                sm={6}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <img
                    src={dataProduct.imageUrl}
                    className="w-full object-fit-contain"
                    alt={dataProduct.title}
                  />
                </Box>
              </Grid>
              <Grid item
                xs={12}
                sm={6}
              >
                <Box
                  sx={(theme) => ({
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    paddingX: {
                      lg: theme.spacing(5)
                    },
                    width: "100%",
                    height: "100%",
                  })}
                >
                  <Typography variant="body1" component="p" gutterBottom>
                    商品名稱：{dataProduct.title}
                  </Typography>
                  <Typography variant="body1" component="p" gutterBottom>
                    商品販售價格：$ {dataProduct.price}
                  </Typography>
                  <Typography variant="body1" component="p" gutterBottom>
                    商品庫存：{dataProduct.num}
                  </Typography>
                  <Typography variant="body1" component="p" gutterBottom>
                    商品描述：
                  </Typography>
                  <Typography variant="body1" component="p" gutterBottom dangerouslySetInnerHTML={{ __html: dataProduct.description }} />
                  <Box
                    sx={(theme) => ({
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: theme.spacing(2)
                    })}
                  >
                    {
                      dataProduct.is_enabled ?
                        <>
                          <Box sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                          }}
                          >
                            <IconButton component="button"
                              type="button"
                              color="primary"
                              aria-label="減少數量"
                              onClick={handlerDecreaseNumAddProduct}
                            >
                              <RemoveIcon />
                            </IconButton>
                            <Button variant="outlined"
                              sx={{ cursor: "default" }}
                            >
                              {numAddProduct}
                            </Button>
                            <IconButton component="button"
                              type="button"
                              color="primary"
                              aria-label="增加數量"
                              onClick={handlerIncreaseNumAddProduct}
                            >
                              <AddIcon />
                            </IconButton>
                          </Box>
                          <Button variant="outlined"
                            startIcon={<AddShoppingCartIcon />}
                            sx={(theme) => ({
                              marginTop: theme.spacing(2)
                            })}
                            onClick={handlerAddProduct}>
                            加入購物車
                          </Button>
                        </>
                        :
                        <Typography variant="body1" component="p">
                          未上架
                        </Typography>
                    }
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box >
        </Grid >
        <Grid item xs sm />
      </Grid >
    </Box >
  );
}

export default SingleProduct;
