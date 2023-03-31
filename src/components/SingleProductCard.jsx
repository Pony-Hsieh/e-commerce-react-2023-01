import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
} from '@mui/material';
import { flexCenter } from '../styles/muiCommonStyle';


function SingleProductCard(props) {
  const { dataProduct } = props;
  const navigate = useNavigate();

  /**
   * 卡片被點擊後要做的事
   * @param {string} productId - 商品 id
   */
  function cardClickHandler(productId) {
    navigate(`/SingleProduct?productId=${productId}`);
  }

  return (
    <Card elevation={1}
      sx={{
        "&:hover": {
          cursor: "pointer",
        },
      }}
      onClick={() => { cardClickHandler(dataProduct.id) }}
    >
      <CardContent >
        <Stack spacing={2}
          sx={{
            ...flexCenter(),
            flexDirection: "column",
          }}>
          {/* 圖片 */}
          <Box component="img"
            src={dataProduct.imageUrl}
            alt={dataProduct.title}
            style={{ maxWidth: "75%" }}
          />
          {/* 名稱 */}
          <Typography variant="h6">
            {dataProduct.title}
          </Typography>
          {/* 價格 */}
          <Stack direction="row" spacing={0.5}>
            <Typography>
              售價： $
            </Typography>
            {
              dataProduct.origin_price > dataProduct.price ?
                <Typography sx={{
                  textDecoration: "line-through",
                }}>
                  {dataProduct.origin_price}
                </Typography>
                :
                null
            }
            <Typography>
              {dataProduct.price}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card >
  );
}

export default SingleProductCard;
