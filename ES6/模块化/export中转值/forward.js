/*
 * @Description:这个文件只是负责转发的作用,把testModule2.js的导出信息转发到test.js
 * @Version: 2.0
 * @Author: yangsen
 * @Date: 2022-07-25 21:10:14
 * @LastEditors: yangsen
 * @LastEditTime: 2022-07-26 10:12:49
 */

export * from './testModule2.js';
export const e = {
  height: '181cm',
};

export default {
  weight: '70kg',
};
