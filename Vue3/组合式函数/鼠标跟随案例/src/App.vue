<script setup lang="ts">
import { mouse } from "./mouse.js";

const { x, y } = mouse();
console.log(x.value, y.value); // 只在setup生命周期内执行一次；模板中的ref是响应式的，会随着鼠标移动一直变化
</script>

<template>Mouse position is at: {{ x }}, {{ y }}</template>
