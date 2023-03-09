/**
 * 透過網頁寬度判斷裝置
 * 
 * 參考 mui v5 的 Breakpoints
 * https://mui.com/material-ui/customization/breakpoints/
 */
export function judgeDeviceByInnerWidth() {
  if (window.innerWidth > 1200) {
    return "PC";
  }
  if (window.innerWidth > 600) {
    return "tablet";
  }
  return "mobile";
}
