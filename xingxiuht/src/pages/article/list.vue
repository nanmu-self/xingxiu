<template>
  <div class="card">
    <div style="display: flex; justify-content: center; align-items: center">
      <div class="header-title" style="margin-right: 10px">文章列表</div>
      <el-button @click="jump" icon="Edit" type="success" round
        >写文章</el-button
      >
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        header-align="center"
        align="center"
        prop="articleTitle"
        label="标题"
      />
      <el-table-column
        header-align="center"
        align="center"
        prop="articleClass"
        label="分类"
      />
      <el-table-column
        header-align="center"
        align="center"
        prop="releaseTime"
        label="发布时间"
      />
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
  </div>
</template>
<script setup>
import { getArticleList, delArticle } from "@/api/article";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { fenlelArr } from "./common/index";
import { ElMessage } from "element-plus";

const router = useRouter();
console.log(fenlelArr);
const jump = () => {
  router.push("/addarticle");
};
const tableData = ref([]);

const handleEdit = (index, row) => {
  router.push({
    path: "/addarticle",
    query: {
      id: row._id,
    },
  });
};
onMounted(() => {
  init();
});
const init = () => {
  getArticleList().then((res) => {
    console.log(res);
    res.data.list.forEach((item) => {
      item.releaseTime = convertTimestampToDateTime(item.releaseTime);
    });
    tableData.value = res.data.list;
  });
};
const delSql = (item) => {
  delArticle(item._id).then((res) => {
    if (res.errCode) {
      return ElMessage.error(res.message);
    }
    ElMessage.success(res.message);
    init();
  });
};
function convertTimestampToDateTime(timestamp) {
  // 检查输入是否为数字且长度为13位
  if (typeof timestamp !== "number" || timestamp.toString().length !== 13) {
    return "无效的时间戳";
  }

  var date = new Date(timestamp);
  var year = date.getFullYear();
  var month = date.getMonth() + 1; // 月份从0开始，需要加1
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();

  // 确保月份、日期、小时、分钟、秒都是两位数
  month = month < 10 ? "0" + month : month;
  day = day < 10 ? "0" + day : day;
  hour = hour < 10 ? "0" + hour : hour;
  minute = minute < 10 ? "0" + minute : minute;
  second = second < 10 ? "0" + second : second;

  // 拼接成 "年-月-日 时:分:秒" 格式
  return (
    year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second
  );
}
</script>
