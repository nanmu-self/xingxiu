// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129
//金刚位和热门位接口
const articleStrleTable = uniCloud.databaseForJQL().collection("articleStrle")
module.exports = {
	_before: function() { // 通用预处理器

	},
	async addjg() {
		let {
			body
		} = this.getHttpInfo();
		try {
			let res = await articleStrleTable.add(JSON.parse(body));
			return {
				id: res.id,
				errCode: res.errCode,
				message: "添加成功"
			};

		} catch (err) {
			return {
				errCode: err.errCode,
				errMsg: err.errMsg,
				message: "添加失败",
			};
		}

	}
}