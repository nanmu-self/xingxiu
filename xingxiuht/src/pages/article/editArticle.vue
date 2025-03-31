<template>
  <div class="card">
    <el-form :model="form" label-width="auto" style="max-width: 600px">
      <el-form-item label="文章标题">
        <el-input v-model="form.articleTitle" />
      </el-form-item>

      <el-form-item label="文章头图">
        <div style="display: flex; flex-direction: column">
          <el-upload
            class="avatar-uploader"
            :http-request="httpRequest"
            :show-file-list="false"
            :limit="1"
          >
            <img
              v-if="form.articleHeaderImageUrl"
              :src="form.articleHeaderImageUrl"
              class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
          <el-progress
            v-if="uploadPercentage > 0"
            style="width: 180px; margin-top: 5px"
            :show-text="false"
            :percentage="uploadPercentage"
            :stroke-width="5"
            striped
          />
        </div>
      </el-form-item>
      <el-form-item label="阅读方式">
        <el-radio-group v-model="form.reatType">
          <el-radio
            v-for="(item, i) in readType"
            :key="i"
            :value="item.value"
            size="large"
            >{{ item.name }}</el-radio
          >
        </el-radio-group>
      </el-form-item>
      <el-form-item label="分类">
        <el-checkbox-group v-model="form.articleClass">
          <el-checkbox
            border
            v-for="(item, i) in classArr"
            :key="item._id"
            :value="item._id"
            >{{ item.name }}</el-checkbox
          >
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="标签">
        <el-checkbox-group v-model="form.articleLabel">
          <el-checkbox
            style="margin-top: 10px"
            border
            v-for="(item, i) in labelArr"
            :key="item._id"
            :value="item._id"
            >{{ item.name }}</el-checkbox
          >
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="红包url" v-if="form.reatType === 6">
        <el-input v-model="form.hbUrl" />
      </el-form-item>
      <el-form-item label="公众号url" v-if="form.reatType === 1">
        <el-input v-model="form.gzhUrl" />
      </el-form-item>
      <el-form-item label="文章公告弹窗">
        <el-input v-model="form.notice" />
      </el-form-item>
      <el-form-item label="文章置顶">
        <el-switch
          v-model="form.set_top"
          inline-prompt
          :active-icon="Check"
          :inactive-icon="Close"
        />
      </el-form-item>
      <el-form-item label="激励视频阅读">
        <el-switch
          v-model="form.videpIf"
          inline-prompt
          :active-icon="Check"
          :inactive-icon="Close"
        />
      </el-form-item>
      <el-form-item label="激励视频下载">
        <el-switch
          v-model="form.recDownVideo"
          inline-prompt
          :active-icon="Check"
          :inactive-icon="Close"
        />
      </el-form-item>
      <el-form-item label="资源名称">
        <el-input v-model="form.downTitle" />
      </el-form-item>
      <el-form-item label="网盘地址">
        <el-input v-model="form.downUrl" />
      </el-form-item>
      <el-form-item label="提取码">
        <el-input v-model="form.downKey" />
      </el-form-item>
      <el-form-item label="视频号id" v-if="form.reatType == 3">
        <el-input v-model="form.wxvideoId" />
      </el-form-item>
      <el-form-item label="视频号feedId" v-if="form.reatType == 3">
        <el-input v-model="form.wxvideoFeedid" />
      </el-form-item>
      <el-form-item label="B站视频av号" v-if="form.reatType == 4">
        <el-input v-model="form.blblAv" />
      </el-form-item>
    </el-form>
    <BasicEditor v-model="form.content"></BasicEditor>
    <div style="margin-top: 30px; text-align: right">
      <el-button type="primary" @click="publish">{{
        form._id ? "更新" : "发布"
      }}</el-button>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
import { ElMessage } from "element-plus";
import axios from "axios";
import { getClass, getLabel } from "@/api/labelClass";
import { addArticle, getArticleDetail, updateArticle } from "@/api/article";
import { Check, Close } from "@element-plus/icons-vue";
import BasicEditor from "./BasicEditor.vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const form = ref({
  reatType: 0,
  articleHeaderImageUrl: "",
  articleTitle: "",
  articleClass: [],
  articleLabel: [],
  hbUrl: "",
  gzhUrl: "",
  notice: "",
  videpIf: false,
  downTitle: "",
  downUrl: "",
  downKey: "",
  wxvideoId: "",
  blblAv: "",
  wxvideoFeedid: "",
  wxvideoId: "",
  content: "",
  recDownVideo: false,
  set_top: false,
});
const originalForm = ref({}); // 用于保存原始数据
const classArr = ref([]);
const labelArr = ref([]);
onMounted(async () => {
  console.log(route.query);
  let id = route.query.id;
  if (id) {
    getArticleDetail(id).then((res) => {
      console.log(res);
      form.value = res.data;
      originalForm.value = { ...res.data };
    });
  }
  init();
});
const init = async () => {
  // 获取分类
  let res = await getClass();
  classArr.value = res.data.list;
  //获取标签
  let res1 = await getLabel();
  labelArr.value = res1.data.list;
};
const publish = async () => {
  let changes = { _id: originalForm.value._id }; // 用于保存变化的字段
  // 比较当前表单数据和原始数据，找出变化的字段

  for (let key in form.value) {
    if (form.value[key] != originalForm.value[key]) {
      changes[key] = form.value[key];
    }
  }
  console.log(changes);
  // 如果没有变化，直接返回
  if (Object.keys(changes).length < 2) {
    return ElMessage.warning("没有检测到任何更改");
  }
  let res;
  if (form.value._id) {
    res = await updateArticle(changes);
  } else {
    res = await addArticle(form.value);
  }

  if (res.errCode !== 0) {
    return ElMessage.error(res.message);
  }
  ElMessage.success(res.message);
  router.push("/article");
};

const uploadPercentage = ref(0); //进度条
const httpRequest = (options) => {
  let tokenUrl = "http://xingxiu.nanmu.cool/img/getUploadFileOptions";
  axios({
    method: "GET",
    url: tokenUrl,
    params: {
      domain: "unicdn.n-m.top", // TODO 改成你七牛绑定的域名
      cloudPath: `media/${Date.now() + options.file.name}`, // 文件路径（可自己定义文件名规则）
    },
  })
    .then((res) => {
      let uploadFileOptionsRes = res.data;
      console.log("then-uploadFileOptionsRes: ", uploadFileOptionsRes);
      let url = uploadFileOptionsRes.uploadFileOptions.url; // 上传地址
      let name = uploadFileOptionsRes.uploadFileOptions.name; // 上传文件名
      let token = uploadFileOptionsRes.uploadFileOptions.formData.token; // 上传token
      let key = uploadFileOptionsRes.uploadFileOptions.formData.key; // 上传key

      // 创建一个 FormData 对象
      const formData = new FormData();
      formData.append("file", options.file);
      formData.append("token", token);
      formData.append("key", key);
      // 发送请求
      axios
        .post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            let percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            uploadPercentage.value = percentCompleted;
            console.log(`上传进度：${percentCompleted}%`);
          },
        })
        .then((uploadRes) => {
          // 处理成功情况
          const res = {
            cloudPath: uploadFileOptionsRes.cloudPath, // 文件云端路径
            fileID: uploadFileOptionsRes.fileID, // 文件ID
            fileURL: uploadFileOptionsRes.fileURL, // 文件URL（如果是私有权限，则此URL是无法直接访问的）
            fileInfo:
              typeof uploadRes.data === "string"
                ? JSON.parse(uploadRes.data)
                : uploadRes.data,
          };
          // 数据库里可直接保存 fileURL 或 fileID
          console.log("上传成功", res);
          form.value.articleHeaderImageUrl = res.fileURL;
          uploadPercentage.value = 0;
          console.log("fileURL", res.fileURL);
          console.log("fileID", res.fileID);
        })
        .catch((err) => {
          // 处理错误情况
          console.log("上传失败", err);
        });
    })
    .catch((err) => {
      console.log("catch", err);
    });
};

let readType = [
  {
    name: "正常阅读",
    value: 0,
  },
  {
    name: "跳转公众号",
    value: 1,
  },
  {
    name: "跳转资源下载",
    value: 2,
  },
  {
    name: "跳转视频号",
    value: 3,
  },
  {
    name: "跳转b站",
    value: 4,
  },
  {
    name: "壁纸",
    value: 5,
  },
  {
    name: "红包封面",
    value: 6,
  },
];
</script>
<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
