<script setup></script>

<template>
  <router-view />
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@500&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@700&display=swap");
* {
  margin: 0;
  padding: 0;
}
.card {
  margin-top: 30px;
  box-shadow: 0 0 35px 0 rgba(154, 161, 171, 0.15);
  border-radius: 0.8rem;
  background-color: #fff;
  background-clip: border-box;
  padding: 20px;
}
.card-title {
  text-align: center;
  font-size: 1.2rem;
  font-family: "Noto Serif SC", serif;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: #6c757d;
}
.header-title {
  text-align: center;
  font-size: 1.5rem;
  font-family: "Noto Serif SC", serif;
  font-weight: 700;
  color: #6c757d;
}
/* 整个滚动条 */
::-webkit-scrollbar {
  width: 12px; /* 滚动条的宽度 */
  height: 12px; /* 滚动条的高度（针对横向滚动条） */
}

/* 滚动条轨道 */
::-webkit-scrollbar-track {
  background: #f1f1f1; /* 轨道的背景颜色 */
  border-radius: 10px; /* 轨道的圆角 */
}

/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  background: #888; /* 滑块的背景颜色 */
  border-radius: 10px; /* 滑块的圆角 */
  border: 3px solid #f1f1f1; /* 滑块的边框 */
}

/* 滚动条滑块悬停效果 */
::-webkit-scrollbar-thumb:hover {
  background: #555; /* 滑块悬停时的背景颜色 */
}
</style>
