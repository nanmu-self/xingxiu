<template>
  <div class="card">
    <div style="display: flex; justify-content: center; align-items: center">
      <div class="header-title" style="margin-right: 10px">标签列表</div>
      <el-button @click="addBtn" icon="Edit" type="success" round
        >新增</el-button
      >
    </div>

    <el-table v-loading="loading" :data="labelArr" style="width: 100%">
      <el-table-column
        header-align="center"
        align="center"
        prop="name"
        label="名称"
      />
      <el-table-column
        header-align="center"
        align="center"
        prop="described"
        label="描述"
      />

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
    :title="from._id ? '修改标签' : '添加标签'"
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
import { reactive, ref, onMounted, watch } from "vue";
import { ElMessage } from "element-plus";
import { addLabel, getLabel, updateLabel, delLabel } from "@/api/labelClass";
import { Check, Close } from "@element-plus/icons-vue";
const dialogVisible = ref(false);
const loading = ref(true);
let total = ref(0);
watch(dialogVisible, (val) => {
  if (!val) {
    from.value = { _id: "", name: "", set_top: false, described: "" };
  }
});
onMounted(async () => {
  init();
});
let queryData = reactive({
  page: 1,
  pageSize: 10,
});
const init = async () => {
  let res = await getLabel(queryData);

  labelArr.value = res.data.list;
  total.value = res.data.pagination.total;
  loading.value = false;
};

const from = ref({
  _id: "",
  name: "",
  described: "",
  set_top: false,
});
const labelArr = ref([
  {
    name: "标题",
    described: "https://unicdn.n-m.top/icon/about.svg",
  },
]);
const addBtn = () => {
  dialogVisible.value = true;
};
const addSql = async () => {
  let res;
  let msg;
  if (from.value._id) {
    res = await updateLabel(from.value);
    msg = "修改";
  } else {
    res = await addLabel(from.value);
    msg = "添加";
  }
  if (res.errCode != 0) {
    return ElMessage.error(msg + "失败，错误信息：" + res.message);
  }
  ElMessage({
    message: "标签" + msg + "成功",
    type: "success",
  });
  init();
  dialogVisible.value = false;
};

const handleCurrentPage = (val) => {
  queryData.page = val;
  init();
};
const handleEdit = (index, row) => {
  from.value = row;
  dialogVisible.value = true;
};

const delSql = async (row) => {
  let res = await delLabel(row._id);

  if (res.errCode != 0) {
    return ElMessage.error("删除失败，错误信息：" + res.message);
  }
  ElMessage({
    message: "标签删除成功",
    type: "success",
  });
  init();
};
</script>
