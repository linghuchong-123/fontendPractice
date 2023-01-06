/* 泛型函数 */
const funParam = <Param, Id = unknown>(param: Param, id?: Id) => {
  console.log(param);
};

funParam<number>(123);
