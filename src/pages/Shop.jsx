import { useState, useEffect } from 'react';
import { cloneDeep } from 'lodash-es';
import { getDataProductsAll } from '../api/product';
import {
  Container,
  Box,
  Grid,
  Stack,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Card,
  CardContent,
  Button,
  TextField,
} from '@mui/material';
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import SingleProductCard from '../components/SingleProductCard';


function Shop() {
  const priceMin = "0";
  const priceMax = "10000";
  // 所有產品
  const [allProduct, setAllProduct] = useState([]);
  // 要渲染出來的產品
  const [showProduct, setShowProduct] = useState([]);
  // 選擇的類別
  const [selectedProductCategory, setSelectedProductCategory] = useState({
    "運動": true,
    "男士": true,
    "女士": true,
    "鞋類": true,
  });
  // 價格區間帶
  const [priceRange, setPriceRange] = useState([priceMin, priceMax]);

  /**
   * 取得所有商品，並執行初始的條件判斷
   */
  async function getAllProduct() {
    const res = await getDataProductsAll();
    setAllProduct(res.data.products);
  }

  /**
   * 更新選擇的產品類別
   * @param {Object} event - 自帶的事件
   */
  function updateSelectedCategory(event) {
    const cloneObj = cloneDeep(selectedProductCategory);
    cloneObj[event.target.value] = event.target.checked;
    setSelectedProductCategory(cloneObj);
  }

  /**
   * 更新價格區間帶
   * @param {Object} event - 自帶的事件
   * @param {"min"|"max"} field - 欄位
   */
  function updatePriceRange(event, field) {
    const clonePriceRange = cloneDeep(priceRange);
    const numPriceMin = parseInt(priceMin, 10);
    const numPriceMax = parseInt(priceMax, 10);
    let inputValue = event.target.value;
    switch (field) {
      case 'min': {
        if (inputValue === "") {
          clonePriceRange[0] = inputValue;
          setPriceRange(clonePriceRange);
          return;
        }
        if (parseInt(inputValue, 10) < numPriceMin) {
          inputValue = priceMin;
        }
        clonePriceRange[0] = inputValue;
        setPriceRange(clonePriceRange);
        break;
      }
      case 'max': {
        if (inputValue === "") {
          clonePriceRange[1] = inputValue;
          setPriceRange(clonePriceRange);
          return;
        }
        if (parseInt(inputValue, 10) > numPriceMax) {
          inputValue = priceMax;
        }
        clonePriceRange[1] = inputValue;
        setPriceRange(clonePriceRange);
        break;
      }
    }
    console.log('priceRange', priceRange);
  }

  /**
   * test
   * @param {Object} event - 自帶的事件
   * @param {"min"|"max"} field - 欄位
   */
  function priceRangeBlurHandler(event, field) {
    const clonePriceRange = cloneDeep(priceRange);
    const inputValue = event.target.value;
    switch (field) {
      case 'min': {
        if (inputValue === "") {
          clonePriceRange[0] = priceMin;
          setPriceRange(clonePriceRange);
          return;
        }
      }
      case 'max': {
        if (inputValue === "") {
          clonePriceRange[1] = priceMax;
          setPriceRange(clonePriceRange);
          return;
        }
      }
    }
  }

  /**
   * 檢查是否要渲染此商品
   * @param {Object} eachProduct - 單一產品資訊
   */
  function checkShowProductCondition(eachProduct) {
    console.log('applyFilterCondition');
    // Step: 檢查 目前是否有提供
    if (eachProduct.is_enabled === 0) {
      return false;
    }
    // Step: 檢查 是否屬於套用的類別
    if (selectedProductCategory[eachProduct.category] === false) {
      return false;
    }
    // Step: 檢查 是否在套用的價格區間範圍
    if ((eachProduct.price >= parseInt(priceRange[0], 10) && eachProduct.price <= parseInt(priceRange[1], 10)) === false) {
      return false;
    }
    return true;
  }

  /**
   * 套用篩選條件
   */
  function applyFilterCondition() {
    console.log('applyFilterCondition');
    console.log(allProduct);
    // Step: 檢查目前資料是否載入完成
    if (allProduct.length === 0) {
      const loading = (
        <Grid item xs={12} key={new Date().getTime()}>
          <Typography variant="h4" align="center" component="p">
            資料載入中...
          </Typography>
        </Grid>
      );
      setShowProduct([loading]);
      return;
    }
    // Step: 套用相關的 filter
    const res = allProduct
      .map((eachProduct) => {
        if (checkShowProductCondition(eachProduct)) {
          return (
            <Grid item xs={12} sm={6} lg={4} key={eachProduct.id}>
              <SingleProductCard dataProduct={eachProduct} />
            </Grid>
          )
        }
        return null;
      });
    // Step: 檢查是否至少有一項產品可供顯示
    if (res.every(item => item === null)) {
      const noCorrespondProduct = (
        <Grid item xs={12} key={new Date().getTime()}>
          <Typography variant="h4" align="center" component="p">
            目前沒有符合篩選條件的產品
          </Typography>
        </Grid>
      );
      setShowProduct([noCorrespondProduct]);
      return;
    }
    setShowProduct(res);
  }

  // 頁面初始渲染
  useEffect(() => {
    getAllProduct();
  }, []);

  // 首次取得所有產品之後渲染所有產品
  useEffect(() => {
    applyFilterCondition();
  }, [allProduct]);

  return (
    <>
      <NavBar />
      <Box component="main" sx={(theme) => ({
        padding: theme.spacing(4),
      })}>
        <Typography component="h1"
          variant="h3"
          align="center"
          sx={(theme) => ({
            marginBottom: theme.spacing(4),
            paddingTop: theme.spacing(4),
          })}
        >
          商城
        </Typography>
        <Grid container
          rowSpacing={3}
        >
          <Grid item xs={12} lg={3}>
            {/* 篩選條件 */}
            <Container maxWidth="sm">
              <Card>
                <CardContent>
                  <Stack spacing={2}>
                    <Typography component="h5"
                      variant="h5"
                      align="center"
                    >
                      篩選條件
                    </Typography>
                    {/* 類別 */}
                    <Box>
                      <Typography component="h6"
                        variant="h6"
                      >
                        類別
                      </Typography>
                      <FormGroup>
                        <FormControlLabel
                          control={<Checkbox value="運動" color="primary" />}
                          label={<Typography>運動</Typography>}
                          checked={selectedProductCategory["運動"]}
                          onChange={(event) => updateSelectedCategory(event)}
                        />
                        <FormControlLabel
                          control={<Checkbox value="男士" color="primary" />}
                          label={<Typography>男士</Typography>}
                          checked={selectedProductCategory["男士"]}
                          onChange={(event) => updateSelectedCategory(event)}
                        />
                        <FormControlLabel
                          control={<Checkbox value="女士" color="primary" />}
                          label={<Typography>女士</Typography>}
                          checked={selectedProductCategory["女士"]}
                          onChange={(event) => updateSelectedCategory(event)}
                        />
                        <FormControlLabel
                          control={<Checkbox value="鞋類" color="primary" />}
                          label={<Typography>鞋類</Typography>}
                          checked={selectedProductCategory["鞋類"]}
                          onChange={(event) => updateSelectedCategory(event)}
                        />
                      </FormGroup>
                    </Box>
                    {/* 價格 */}
                    <Box>
                      <Typography component="h6"
                        variant="h6"
                      >
                        價格
                      </Typography>
                      <Box sx={(theme) => ({
                        marginTop: theme.spacing(2),
                        display: "flex",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                      })}>
                        <TextField label="價格下限"
                          type="number"
                          size="small"
                          value={priceRange[0]}
                          InputProps={{
                            inputProps: {
                              min: priceMin,
                              max: priceMax,
                            }
                          }}
                          sx={{
                            width: "40%"
                          }}
                          onChange={(event) => { updatePriceRange(event, 'min') }}
                          onBlur={(event) => { priceRangeBlurHandler(event, 'min') }}
                        />
                        <TextField label="價格上限"
                          type="number"
                          size="small"
                          InputProps={{
                            inputProps: {
                              min: priceMin,
                              max: priceMax,
                            }
                          }}
                          sx={{
                            width: "40%"
                          }}
                          value={priceRange[1]}
                          onChange={(event) => { updatePriceRange(event, 'max') }}
                          onBlur={(event) => { priceRangeBlurHandler(event, 'max') }}
                        />
                      </Box>
                    </Box>
                  </Stack>
                  <Button variant="contained"
                    onClick={applyFilterCondition}
                    sx={(theme) => ({
                      display: "block",
                      margin: "0 auto",
                      marginTop: theme.spacing(3),
                      width: "50%",
                    })}
                  >套用篩選條件</Button>
                </CardContent>
              </Card>
            </Container>
          </Grid>
          <Grid item xs={12} lg={9}>
            {/* 商品列表 */}
            <Grid container
              rowSpacing={{
                xs: 1,
                lg: 3,
              }}
              columnSpacing={{
                xs: 1,
                sm: 2,
                lg: 3
              }}
              sx={(theme) => ({
                paddingX: theme.spacing(3)
              })}
            >
              {showProduct}
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Footer/>
    </>
  );
}

export default Shop;
