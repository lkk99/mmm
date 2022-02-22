export default function getNowDate(time) {
    //转化成时间戳
    let date = new Date(time);
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    let d = date.getDate();
    let H = date.getHours();
    let mm = date.getMinutes();
    let s=date.getSeconds()
          m = m < 10 ? "0" + m : m;
          d = d < 10 ? "0" + d : d;
          H = H < 10 ? "0" + H : H;
        //   return y + "-" + m + "-" + d + " " + H + ":" + mm+":"+s;
          return y + "-" + m + "-" + d + " " + H + ":" + mm;
		//    return y + "-" + m + "-" + d ;
}