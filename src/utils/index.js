export const getStyle = function (ele, attr) {
  if (ele.currentStyle) {
    return ele.currentStyle[attr];
  } else {
    return getComputedStyle(ele)[attr];
  }
}
