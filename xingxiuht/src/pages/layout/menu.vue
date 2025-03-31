<template>
  <div
    style="
      background-color: #f6f7fb;
      display: flex;
      justify-content: center;
      margin-top: 30px;
    "
  >
    <div
      style="
        background-color: #ffffff;
        width: 250px;
        box-shadow: 0 0 35px 0 rgba(154, 161, 171, 0.15);
        border-radius: 10px;
      "
    >
      <div class="leftbar-user">
        <img
          style="width: 42px; height: 42px; border-radius: 50%"
          src="https://q1.qlogo.cn/g?b=qq&nk=157884200&s=640"
          alt=""
        />
        <div class="leftbar-user-name">楠木宝库</div>
      </div>
      <div
        class="menuItem"
        v-for="(item, index) in menus"
        :key="index"
        :style="{ color: selectIndex === item.path ? '#409eff' : '' }"
        @click="jump(item.path)"
      >
        <component
          :is="item.icon"
          style="width: 20px; height: 20px; margin-right: 30px"
        />
        <text style="font-size: 15px">{{ item.name }}</text>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
const selectIndex = ref("/");
selectIndex.value = route.path;

const menus = [
  {
    name: "系统设置",
    icon: "Setting",
    path: "/",
  },
  {
    name: "金刚区域",
    icon: "Edit",
    path: "/jingang",
  },
  {
    name: "文章",
    icon: "Notebook",
    path: "/article",
  },
  {
    name: "标签列表",
    icon: "Collection",
    path: "/labellist",
  },
  {
    name: "分类列表",
    icon: "Tickets",
    path: "/classList",
  },
];
const jump = (index) => {
  selectIndex.value = index;
  router.push(index);
};
</script>

<style>
.leftbar-user {
  background: url(@/assets/waves.png) no-repeat;
  padding: 20px 20px;
  text-align: center;
}
.leftbar-user-name {
  font-weight: 700;
  color: #313a46;
  margin-top: 8px;
  font-family: Nunito, sans-serif;
  font-size: 0.875rem;
}
.menuItem {
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  width: 150px;
  padding: 20px 0;
  margin: 0 auto;
}
</style>
