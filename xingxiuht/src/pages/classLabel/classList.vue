<template>
  <div class="card">
    <div style="display: flex; justify-content: center; align-items: center">
      <div class="header-title" style="margin-right: 10px">分类列表</div>
      <el-button @click="dialogVisible = true" icon="Edit" type="success" round
        >新增</el-button
      >
    </div>

    <el-table v-loading="loading" :data="classArr" style="width: 100%">
      <el-table-column
        header-align="center"
        align="center"
        prop="name"
        label="标题"
      />
      <el-table-column
        header-align="center"
        align="center"
        prop="described"
        label="描述"
      />

      <el-table-column header-align="center" align="center" label="图标">
        <template #default="{ row }">
          <img :src="row.icon" style="width: 50px; height: 50px" />
          <!-- <el-avatar :size="50" :src="row.himg" /> -->
        </template>
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="set_top"
        label="首页置顶"
      >
        <template #default="{ row }">
          <text>{{ row.set_top ? "显示" : "隐藏" }}</text>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" label="操作">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
            修改
          </el-button>
          <el-popconfirm
            title="是否确认删除该标签?"
            @confirm="delSql(scope.row)"
          >
            <template #reference>
              <el-button size="small" type="danger"> 删除 </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div
      style="
        margin: 20px auto;
        width: 100%;
        display: flex;
        justify-content: center;
      "
    >
      <el-pagination
        :pageSize="queryData.pageSize"
        @update:current-page="handleCurrentPage"
        background
        layout="prev, pager, next"
        :total="total"
      />
    </div>
  </div>

  <el-dialog
    v-model="dialogVisible"
    :title="from._id ? '修改分类' : '添加分类'"
    width="500"
  >
    <el-form
      style="max-width: 600px"
      :model="from"
      label-width="auto"
      label-position="top"
    >
      <el-form-item label="名称">
        <el-input v-model="from.name" />
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="from.described" />
      </el-form-item>
      <el-form-item label="icon图标">
        <el-input v-model="from.icon" />
      </el-form-item>
      <el-form-item label="置顶" label-position="right">
        <el-switch
          v-model="from.set_top"
          inline-prompt
          :active-icon="Check"
          :inactive-icon="Close"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addSql">{{
          from._id ? "修改" : "添加"
        }}</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref, onMounted, reactive, watch } from "vue";
import { ElMessage } from "element-plus";
import { addClass, updateClass, getClass, delClass } from "@/api/labelClass";
const from = ref({
  _id: "",
  name: "",
  icon: "",
  described: "",
  set_top: false,
});
const dialogVisible = ref(false);
watch(dialogVisible, (val) => {
  if (!val) {
    from.value = { _id: "", name: "", icon: "", described: "" };
  }
});

const classArr = ref([
  {
    name: "标题",
    icon: "https://unicdn.n-m.top/icon/about.svg",
    described: "描述",
  },
]);
onMounted(async () => {
  init();
});
const handleCurrentPage = (val) => {
  queryData.page = val;
  init();
};
const handleEdit = (index, row) => {
  from.value = row;
  dialogVisible.value = true;
};
const loading = ref(true);
let queryData = reactive({
  page: 1,
  pageSize: 10,
});
const total = ref(0);
const init = async () => {
  let res = await getClass(queryData);

  classArr.value = res.data.list;
  total.value = res.data.pagination.total;
  loading.value = false;
};

const addSql = async () => {
  let res;
  let msg;
  if (from.value._id) {
    res = await updateClass(from.value);
    msg = "修改";
  } else {
    res = await addClass(from.value);
    msg = "添加";
  }

  if (res.errCode != 0) {
    return ElMessage.error(msg + "失败，错误信息：" + res.message);
  }
  ElMessage({
    message: "分类" + msg + "成功",
    type: "success",
  });
  init();
  dialogVisible.value = false;
};
const delSql = async (row) => {
  let res = await delClass(row._id);

  if (res.errCode != 0) {
    return ElMessage.error("删除失败，错误信息：" + res.message);
  }
  ElMessage({
    message: "分类删除成功",
    type: "success",
  });
  init();
};
</script>
