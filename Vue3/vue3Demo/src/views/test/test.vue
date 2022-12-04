<template>
  <div class="scroll-table" ref="scrollTableRef">
    <el-table
      :data="tableData"
      style="width: 100%"
      :max-height="400"
      class="scroll_table"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        v-if="showSelection"
        type="selection"
        align="center"
        width="60"
      ></el-table-column>
      <el-table-column
        v-if="showIndex"
        type="index"
        label="序号"
        align="center"
        width="80"
      ></el-table-column>
      <el-table-column
        v-for="item in tableConfigs"
        :prop="item.prop"
        :label="item.name"
        :width="item.width"
        :key="item.prop"
      >
        <template #default="scope">
          <slot :name="item.prop" :row="scope.row">{{
            scope.row[item.prop]
          }}</slot>
        </template>
      </el-table-column>
    </el-table>
    <!-- 加载动画节点   -->
    <div class="loading-row" id="loading" v-show="false">
      <el-icon class="is-loading">
        <loading />
      </el-icon>
      加载中...
    </div>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, onMounted, ref, watch } from "vue";
const props = defineProps({
  showIndex: {
    type: Boolean,
    default: false,
  },
  showSelection: {
    type: Boolean,
    default: false,
  },
  tableConfigs: {
    type: Array,
    default: () => [],
  },
  tableData: {
    type: Array,
    default: () => [],
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["selectionChange", "load"]);

function handleSelectionChange(event) {
  emit("selectionChange", event);
}

// 防抖开关
let toggle = ref(true);

function setLoading() {
  // 防抖
  if (toggle.value) {
    appendLoading();
    // 触发请求事件
    emit("load");
  }
}

// 关闭loading动画
watch(
  () => props.isLoading,
  (val) => {
    if (!val) {
      removeLoading();
    }
  }
);

// loading动画节点缓存
let loadingTemp: any = null;
// table dom element
const scrollTableRef = ref();

// 添加加载图标
function appendLoading() {
  toggle.value = false;
  console.log("append");
  // 使用加载缓存，不需要每次加载都重新克隆一次
  if (!loadingTemp) {
    // 克隆动画节点
    let loading: any = document.querySelector("#loading");
    loadingTemp = loading.cloneNode(true);
  }
  nextTick(() => {
    loadingTemp.style.display = "flex";
    // 加载动画的节点宽度设置为表格宽度相等
    loadingTemp.style.width = scrollTableRef.value.clientWidth + "px";
    table.appendChild(loadingTemp);
    // 出现加载动画的时候将滚动条滚动到最底部，完整呈现加载动画
    dom.scrollTop = dom.scrollHeight;
  });
}

// 移除加载图标
function removeLoading() {
  toggle.value = true;
  table.removeChild(loadingTemp);
}

// 表格中需要滚动的节点缓存
let dom: any = null;
// 需要添加动画节点的dom元素缓存
let table: any = null;
onMounted(() => {
  // 需要给改table加一个标识类，不然会选择到同一页面中的其他表格 class="scroll_table"
  dom = document.querySelector(".scroll_table .el-table__body-wrapper");
  table = document.querySelector(".scroll_table .el-table__body tbody");
  // 添加监听事件
  dom.addEventListener("scroll", (v) => {
    const scrollDistance = dom.scrollHeight - dom.scrollTop - dom.clientHeight;
    if (scrollDistance <= 1) {
      console.log("end...");
      // 添加动画
      setLoading();
    }
  });
});
</script>

<style scoped lang="scss">
.scroll-table {
  .loading-row {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 45px;
    color: rgba(102, 109, 128, 1);
    .is-loading {
      margin-right: 2px;
    }
  }
  ::-webkit-scrollbar {
    width: 6px;
    height: 100%;
    background-color: #fff;
  }
  ::-webkit-scrollbar-thumb {
    width: 6px;
    background-color: rgba(153, 153, 153, 1);
    border-radius: 3px;
  }
}
</style>
