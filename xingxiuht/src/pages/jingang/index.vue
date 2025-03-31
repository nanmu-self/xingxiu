<template>
  <div class="card">
    <div style="display: flex; justify-content: center; align-items: center">
      <div class="header-title" style="margin-right: 10px">金刚位</div>
      <el-button @click="addBtn(0)" icon="Edit" type="success" round
        >新增</el-button
      >
    </div>

    <el-table :data="jgtableData" style="width: 100%">
      <el-table-column
        header-align="center"
        align="center"
        prop="wzType"
        label="类型"
      >
        <template #default="{ row }">
          {{ getWzTypeLabel(row.wzType) }}
        </template>
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="title"
        label="标题"
      />
      <el-table-column
        header-align="center"
        align="center"
        prop="appid"
        label="appid"
      />
      <el-table-column
        header-align="center"
        align="center"
        prop="route"
        label="跳转路径"
      />
      <el-table-column header-align="center" align="center" label="图标">
        <template #default="{ row }">
          <img :src="row.himg" style="width: 50px; height: 50px" />
          <!-- <el-avatar :size="50" :src="row.himg" /> -->
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" label="操作">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
            修改
          </el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 热门文章区域 -->
    <div
      style="
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 30px;
      "
    >
      <div class="header-title" style="margin-right: 10px">热门文章</div>
      <el-button @click="addBtn(1)" icon="Edit" type="success" round
        >新增</el-button
      >
    </div>

    <el-table :data="rmtableData" style="width: 100%">
      <el-table-column
        header-align="center"
        align="center"
        prop="wzType"
        label="类型"
      >
        <template #default="{ row }">
          {{ getWzTypeLabel(row.wzType) }}
        </template>
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="title"
        label="标题"
      />
      <el-table-column
        header-align="center"
        align="center"
        prop="appid"
        label="appid"
      />
      <el-table-column
        header-align="center"
        align="center"
        prop="route"
        label="跳转路径"
      />
      <el-table-column header-align="center" align="center" label="图标">
        <template #default="{ row }">
          <img :src="row.himg" style="width: 50px; height: 50px" />
          <!-- <el-avatar :size="50" :src="row.himg" /> -->
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" label="操作">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
            修改
          </el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <el-dialog v-model="dialogVisible" title="添加内容" width="500">
    <el-form
      style="max-width: 600px"
      :model="jingangFrom"
      label-width="auto"
      label-position="top"
    >
      <el-form-item label="位置类型">
        <el-radio-group v-model="jingangFrom.styleType">
          <el-radio :value="true">金刚区</el-radio>
          <el-radio :value="false">热门文章</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="jingangFrom.title" />
      </el-form-item>

      <el-form-item label="类型">
        <el-radio-group v-model="jingangFrom.wzType">
          <el-radio
            v-for="item in wzTypeArr"
            :key="item.value"
            :value="item.value"
          >
            {{ item.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="appid">
        <el-input v-model="jingangFrom.appid" />
      </el-form-item>
      <el-form-item label="跳转路径">
        <el-input v-model="jingangFrom.route" />
      </el-form-item>
      <el-form-item label="图标">
        <el-input v-model="jingangFrom.himg" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addSql">添加</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref, reactive } from "vue";
import { add } from "@/api/jiangang.js";
const dialogVisible = ref(false);

const handleEdit = (index, row) => {
  console.log(index, row);
};

const handleDelete = (index, row) => {
  console.log(index, row);
};

const jingangFrom = reactive({
  title: "",
  wzType: "xs_program",
  appid: "",
  route: "",
  himg: "",
  styleType: true,
});

const jgtableData = ref([
  {
    wzType: "xs_default",
    title: "优惠活动",
    appid: "wx123456",
    route: "/pages/activity/index",
    himg: "https://unicdn.n-m.top/icon/wx_video_icon.svg",
  },
  {
    wzType: "xs_tab",
    title: "商城首页",
    appid: "wx234567",
    route: "/pages/home/index",
    himg: "https://unicdn.n-m.top/icon/wx_video_icon.svg",
  },
  {
    wzType: "xs_program",
    title: "合作小程序",
    appid: "wx345678",
    route: "/pages/partner/index",
    himg: "https://unicdn.n-m.top/icon/wx_video_icon.svg",
  },
  {
    wzType: "xs_business",
    title: "商家介绍",
    appid: "wx456789",
    route: "https://example.com/business",
    himg: "https://unicdn.n-m.top/icon/wx_video_icon.svg",
  },
  {
    wzType: "xs_wxvideo_activity",
    title: "精彩视频",
    appid: "wx567890",
    route: "/video/12345",
    himg: "https://unicdn.n-m.top/icon/wx_video_icon.svg",
  },
  {
    wzType: "xs_bilibli",
    title: "B站主页",
    appid: "wx678901",
    route: "https://space.bilibili.com/12345",
    himg: "https://unicdn.n-m.top/icon/wx_video_icon.svg",
  },
]);

const rmtableData = ref([
  {
    wzType: "xs_default",
    title: "优惠活动",
    appid: "wx123456",
    route: "/pages/activity/index",
    himg: "https://unicdn.n-m.top/icon/wx_video_icon.svg",
  },
  {
    wzType: "xs_tab",
    title: "商城首页",
    appid: "wx234567",
    route: "/pages/home/index",
    himg: "https://unicdn.n-m.top/icon/wx_video_icon.svg",
  },
  {
    wzType: "xs_program",
    title: "合作小程序",
    appid: "wx345678",
    route: "/pages/partner/index",
    himg: "https://unicdn.n-m.top/icon/wx_video_icon.svg",
  },
]);

const getWzTypeLabel = (type) => {
  const typeMap = {
    xs_default: "跳二级页面",
    xs_tab: "跳转底部导航",
    xs_program: "跳转小程序",
    xs_business: "跳转web",
    xs_wxvideo_activity: "打开视频号",
    xs_bilibli: "跳转b站",
  };
  return typeMap[type] || type;
};

const wzTypeArr = [
  { label: "跳二级页面", value: "xs_default" },
  { label: "跳转底部导航", value: "xs_tab" },
  { label: "跳转小程序", value: "xs_program" },
  { label: "跳转web", value: "xs_business" },
  { label: "打开视频号", value: "xs_wxvideo_activity" },
  { label: "跳转b站", value: "xs_bilibli" },
];

const addSql = async () => {
  let res = await add(jingangFrom);
  if (res.errCode == 0) {
    ElMessage.success(res.message);
    dialogVisible.value = false;
  } else {
    ElMessage.error(res.errMsg);
  }
  console.log(res);
};

const addBtn = (type) => {
  if (type == 1) {
    jingangFrom.styleType = false;
  } else {
    jingangFrom.styleType = true;
  }
  dialogVisible.value = true;
};

const handleClose = () => {
  console.log(666);
  // dialogVisible.value=false
};
</script>
