
/**
 * @description: 将经纬度坐标转换为直角坐标，采用WGS84坐标系 https://blog.csdn.net/abanchao/article/details/128304152
 * @param {*} L：经度
 * @param {*} B：纬度
 * @param {*} H：高程
 * @return {*} 直角坐标
 */
const LBHtoXYZ = (longitude, latitude, H) => {
  const L = longitude * (Math.PI / 180);
  const B = latitude * (Math.PI / 180);
  const a = 6378137; // 长半轴
  const b = 6356752.3142451793; // 短半轴
  const e = Math.sqrt(Math.pow(a, 2) - Math.pow(b, 2), 2) / a; // 椭球偏心率
  const N = a / Math.sqrt(1 - Math.pow(e, 2) * Math.sin(B)); // 椭球曲率半径
  const x = (N + H) * Math.cos(B) * Math.cos(L); 
  const y = (N + H) * Math.cos(B) * Math.sin(L); 
  const z = [N * (1 - Math.pow(e, 2)) + H] * Math.sin(B);
  return {x,y,z}
}
console.log(LBHtoXYZ(116.6146668813105,40.032535468848963,0.5));