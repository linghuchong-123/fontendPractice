<template>
  <scroll-table
    :table-configs="configs"
    :table-data="tableData"
    :is-loading="isLoading"
    @load="getTableData"
  ></scroll-table>
</template>

<script lang="ts" setup>
import ScrollTable from "../../components/ScrollTable.vue";

//表格配置
const configs = [
  {
    name: "ID",
    prop: "id",
  },
  {
    name: "名称",
    prop: "name",
  },
  {
    name: "描述",
    prop: "event",
  },
  {
    name: "成员",
    prop: "user",
  },
  {
    name: "状态",
    prop: "status",
  },
];
// 表格初始数据
const tableData = ref([
  {
    id: "1",
    name: "22",
    event: "xx",
    user: "cet",
    status: "启动",
  },
  {
    id: "2",
    name: "322",
    event: "2xx",
    user: "cet343",
    status: "关闭",
  },
  {
    id: "2",
    name: "322",
    event: "2xx",
    user: "cet343",
    status: "关闭",
  },
  {
    id: "2",
    name: "322",
    event: "2xx",
    user: "cet343",
    status: "关闭",
  },
  {
    id: "2",
    name: "322",
    event: "2xx",
    user: "cet343",
    status: "关闭",
  },
  {
    id: "2",
    name: "322",
    event: "2xx",
    user: "cet343",
    status: "关闭",
  },
  {
    id: "2",
    name: "322",
    event: "2xx",
    user: "cet343",
    status: "关闭",
  },
  {
    id: "2",
    name: "322",
    event: "2xx",
    user: "cet343",
    status: "关闭",
  },
  {
    id: "2",
    name: "322",
    event: "2xx",
    user: "cet343",
    status: "关闭",
  },
  {
    id: "2",
    name: "322",
    event: "2xx",
    user: "cet343",
    status: "关闭",
  },
]);

// 加载动画展示开关
const isLoading = ref(true);

// 接口请求
function getTableData() {
  // 开启加载动画
  isLoading.value = true;
  // 模拟接口请求
  setTimeout(() => {
    tableData.value.push({
      id: "3",
      name: "322",
      event: "2xx",
      user: "cet343",
      status: "关闭",
    });
    // 关闭加载动画
    isLoading.value = false;
  }, 2000);
}
</script>
