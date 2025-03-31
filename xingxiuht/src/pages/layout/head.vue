<template>
  <div
    style="
      background-color: #313a46;
      height: 70px;

      display: flex;
      align-items: center;
      padding: 0 80px;
      justify-content: space-between;
    "
  >
    <div class="topnav-logo-lg">楠木宝库后台管理</div>
    <div style="display: flex; align-items: center">
      <el-icon color="#CAD4DA" :size="25"><Setting /></el-icon>
      <div
        style="
          background-color: #3c4655;
          height: 70px;
          display: flex;
          align-items: center;
          margin: 0 20px;
          padding: 0 20px;
        "
      >
        <el-avatar
          :size="32"
          src="https://q1.qlogo.cn/g?b=qq&nk=157884200&s=640"
        />
        <text
          style="
            color: #ced4da;
            margin-left: 10px;
            font-family: 'Noto Serif SC', serif;
          "
        >
          楠木
        </text>
      </div>
      <!-- <Setting style="width: 25px; height: 25px; color: #cad4da" /> -->
    </div>
  </div>
</template>
<script setup></script>
<style>
.topnav-logo-lg {
  font-family: Nunito, sans-serif;
  font-weight: 400;
  color: #fff;
}
</style>
