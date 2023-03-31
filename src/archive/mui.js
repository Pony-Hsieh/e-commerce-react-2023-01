import {
  Paper,
  Box,
  Grid,
  Typography,
} from '@mui/material';

{
  Object.keys(dataOrder.products).map((eachProduct) => {
    return (
      <Paper elevation={1}
        sx={(theme) => ({
          marginY: theme.spacing(3),
          paddingX: {
            xs: theme.spacing(2),
            sm: theme.spacing(0),
          },
          paddingY: theme.spacing(2),
          width: "100%",
          height: "100%",
        })}
        key={dataOrder.products[eachProduct].product.id}
      >
        <Grid container>
          {/* 商品圖片 */}
          <Grid item xs={12} sm={6}>
            <Box sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
            }}>
              <Box
                component="img"
                sx={{
                  display: "block",
                  margin: "0 auto",
                  maxWidth: '200px',
                }}
                src={dataOrder.products[eachProduct].product.imageUrl}
                alt={dataOrder.products[eachProduct].product.title}
                draggable="false"
              />
            </Box>
          </Grid>
          {/* 其餘資訊 */}
          <Grid item xs={12} sm={6}>
            <Box sx={(theme) => ({
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: "100%",
              height: "100%",
              marginTop: {
                xs: theme.spacing(2),
                sm: theme.spacing(0)
              }
            })}>
              <Typography component="p" variant="body1">
                商品名稱：{dataOrder.products[eachProduct].product.title}
              </Typography>
              <Typography component="p" variant="body1">
                訂購數量：{dataOrder.products[eachProduct].qty}
              </Typography>
              <Typography component="p" variant="body1">
                小計：{dataOrder.products[eachProduct].total}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    )
  })
}


<List sx={{
  minWidth: "200px",
  display: "flex",
}}>
  <ListItem disablePadding>
    <ListItemButton component={Link}
      to="/"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      首頁
    </ListItemButton>
  </ListItem>
  <ListItem disablePadding
    sx={(theme) => ({
      borderLeft: "1px solid",
      // 引入自訂顏色
      borderLeftColor: theme.palette.primary["500"],
    })}>
    <ListItemButton component={Link}
      to="/shop"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      商城
    </ListItemButton>
  </ListItem>
</List>
