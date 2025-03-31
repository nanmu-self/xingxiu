<template>
  <div class="common-layout">
    <el-container>
      <el-header height="70px">
        <Head />
      </el-header>
      <el-container>
        <el-aside width="350px">
          <Menu />
        </el-aside>
        <el-main>
          <div class="main">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup>
import Head from "./layout/head.vue";
import Menu from "./layout/menu.vue";
</script>
<style scoped>
:deep(.el-header) {
  padding: 0;
}
.main {
  max-height: 80vh;
}
</style>
