<template>
  <div class="card" v-loading="loading">
    <div class="card-title">系统设置</div>
    <el-form :model="setSystem" label-width="auto" label-position="top">
      <el-form-item label="公告">
        <el-input v-model="setSystem.notice" />
      </el-form-item>
      <el-form-item label="弹窗">
        <el-input v-model="setSystem.popupMsg" />
      </el-form-item>
      <el-form-item label="小程序logo">
        <el-input v-model="setSystem.nmLogo" />
      </el-form-item>

      <el-form-item label="首页图文样式">
        <el-radio-group v-model="setSystem.indexStyle">
          <el-radio
            :value="item.value"
            v-for="item in indexStyleArr"
            :key="item.value"
            >{{ item.name }}</el-radio
          >
        </el-radio-group>
      </el-form-item>

      <el-form-item label="小程序分享标题">
        <el-input v-model="setSystem.share_title" />
      </el-form-item>
      <el-form-item label="小程序分享图片">
        <el-input
          v-model="setSystem.share_image"
          placeholder="请输入http协议图片"
        />
      </el-form-item>
      <el-form-item label="公众号名">
        <el-input v-model="setSystem.public_name" />
      </el-form-item>
      <el-form-item label="公众号logo">
        <el-input v-model="setSystem.public_logo" />
      </el-form-item>
      <el-form-item label="公众号二维码">
        <el-input v-model="setSystem.public_follow" />
      </el-form-item>
      <el-form-item label="插屏广告">
        <el-input v-model="setSystem.wx_chaping" />
      </el-form-item>
      <el-form-item label="激励广告">
        <el-input v-model="setSystem.wx_jili_video" />
      </el-form-item>
      <el-form-item label="视频广告">
        <el-input v-model="setSystem.wx_video" />
      </el-form-item>
    </el-form>
    <div style="display: flex; justify-content: flex-end">
      <el-button type="primary" @click="saveConfigbtn">设置</el-button>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref, onMounted } from "vue";
import { saveConfig, getConfig } from "@/api/wxconfig";
import { ElMessage } from "element-plus";

const loading = ref(true);

const setSystem = ref({
  notice: "",
  popupMsg: "",
  nmLogo: "",
  indexStyle: 1,
  share_title: "",
  share_image: "",
  public_name: "",
  public_logo: "",
  public_follow: "",
  wx_chaping: "",
  wx_jili_video: "",
  wx_video: "",
});
const originalForm = ref({});
onMounted(() => {
  getConfig().then((res) => {
    console.log(res);
    setSystem.value = res.data;
    originalForm.value = { ...res.data };
    loading.value = false;
  });
});
const saveConfigbtn = async () => {
  let changes = { _id: originalForm.value._id }; // 用于保存变化的字段
  // 比较当前表单数据和原始数据，找出变化的字段

  for (let key in setSystem.value) {
    if (setSystem.value[key] != originalForm.value[key]) {
      changes[key] = setSystem.value[key];
    }
  }

  // 如果没有变化，直接返回
  if (Object.keys(changes).length < 2) {
    return ElMessage.warning("没有检测到任何更改");
  }
  let res = await saveConfig(changes);
  if (res.errCode !== 0) {
    return ElMessage.error(res.error);
  }
  ElMessage.success(res.message);
};

let indexStyleArr = [
  {
    name: "扁平图标",
    value: 1,
  },
  {
    name: "大图模式",
    value: 2,
  },
  {
    name: "双排列表",
    value: 3,
  },
];
</script>
<style></style>
