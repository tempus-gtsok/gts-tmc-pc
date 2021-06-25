// 飞机航司名称
export function company(ie,K) {
    for (let s in K) {
      if (ie == s) {
        ie = K[s];
        return ie;
      }
    }
  }
export function formatDate(value) {
    //时间转换
    if (value != null && value != "") {
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      return y + "-" + MM + "-" + d;
    } else {
      return value;
    }
  }
