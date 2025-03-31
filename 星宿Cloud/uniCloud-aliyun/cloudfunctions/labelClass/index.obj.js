const db = uniCloud.databaseForJQL();

// 通用添加方法
async function addData(collectionName, data) {
  try {
    let res = await db.collection(collectionName).add(data);
    return {
      id: res.id,
      errCode: res.errCode,
      message: "添加成功",
    };
  } catch (err) {
    return handleErr(err);
  }
}

// 通用更新方法
async function updateData(collectionName, id, data) {
  try {
    let res = await db.collection(collectionName).doc(id).update(data);
    return {
      id: id,
      errCode: res.errCode,
      message: "更新成功",
    };
  } catch (err) {
    return handleErr(err);
  }
}

// 通用删除方法
async function deleteData(collectionName, id) {
  try {
    let res = await db.collection(collectionName).doc(id).remove();
    return {
      errCode: 0,
      message: "删除成功",
      id: id,
    };
  } catch (err) {
    return handleErr(err);
  }
}

// 通用分页查询方法
async function getDataList(collectionName, params) {
  const { page = 1, pageSize = 10 } = params;
  const skip = (page - 1) * pageSize;
  try {
    const countResult = await db.collection(collectionName).count();
    const total = countResult.total;
    const list = await db.collection(collectionName).skip(skip).limit(Number(pageSize)).get();
    return {
      errCode: 0,
      message: "查询成功",
      data: {
        list: list.data,
        pagination: {
          total,
          page,
          pageSize,
        },
      },
    };
  } catch (err) {
    return handleErr(err);
  }
}

// 统一错误处理
function handleErr(err) {
  return {
    errCode: err.errCode || -1,
    errMsg: err.errMsg || "操作失败",
    message: "操作失败",
  };
}

// 获取请求体数据
function getBody() {
  return JSON.parse(this.getHttpInfo().body);
}

module.exports = {
  _before: function () {
    // 通用预处理器
  },

  // 标签相关操作
  async addLabel() {
    let { name, described,set_top } = getBody.call(this);
    return addData("nm_label", { name, described,set_top });
  },
  async getLabel(params) {
    return getDataList("nm_label", params);
  },
  async upLabel() {
    let {_id,name,described,set_top} = getBody.call(this);
    return updateData("nm_label", _id, { name, described,set_top });
  },
  async delLabel(params) {
    return deleteData("nm_label", params.id);
  },

  // 分类相关操作
  async addClass() {
    let { name, icon, described ,set_top} = getBody.call(this);
    return addData("categories", { name, icon, described,set_top });
  },
  async getClass(params) {
    return getDataList("categories", params);
  },
  async upClass() {
    let {_id,name,icon,described,set_top} = getBody.call(this);
    return updateData("categories",_id, { name, icon, described,set_top});
  },
  async delClass(params) {
    return deleteData("categories", params.id);
  },
};