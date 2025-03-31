// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129
//系统配置
const db = uniCloud.databaseForJQL();

module.exports = {
	_before: function() {
		// 通用预处理器
	},

	// 创建或更新配置
	async saveConfig() {
		let body = JSON.parse(this.getHttpInfo().body);
		const {
			categ_style = true,
				share_title,
				share_image,
				public_follow,
				public_logo,
				public_name,
				wx_video,
				wx_chaping,
				wx_jili_video,
				notice,
				popupMsg,
				nmLogo,
				indexStyle = 1,
		} = body

		try {
			// 查询是否已存在配置
			const config = await db.collection("wx_Config").limit(1).get();

			if (config.data.length > 0) {
				// 更新现有配置
				const _id = config.data[0]._id;

				// 只更新传入的字段
				// 生成updateData对象，只包含定义了的字段
				const updateData = {};

				for (let field in body) {
					if (body.hasOwnProperty(field) && typeof body[field] !== 'undefined') {
						updateData[field] = body[field];
					}
				}
				delete updateData._id;
				await db.collection("wx_Config").doc(_id).update(updateData);
			} else {
				// 创建新配置
				await db.collection("wx_Config").add({
					categ_style,
					share_title,
					share_image,
					public_follow,
					public_logo,
					public_name,
					wx_video,
					wx_chaping,
					wx_jili_video,
					notice,
					popupMsg,
					nmLogo,
					indexStyle,
				});
			}

			return {
				errCode: 0,
				message: "保存成功",
			};
		} catch (err) {
			return {
				errCode: 1,
				message: "保存失败",
				error: err.message,
			};
		}
	},

	// 获取配置
	async getConfig() {
		try {
			const config = await db.collection("wx_Config").limit(1).get();

			return {
				errCode: 0,
				message: "获取成功",
				data: config.data[0] || {},
			};
		} catch (err) {
			return {
				errCode: 1,
				message: "获取失败",
				error: err.message,
			};
		}
	},

	// 更新部分配置
	async updateConfig() {
		const {
			_id,
			...updateData
		} = JSON.parse(this.getHttpInfo().body);

		if (!_id) {
			return {
				errCode: 1,
				message: "配置ID不能为空",
			};
		}

		try {
			await db.collection("wx_Config").doc(_id).update(updateData);

			return {
				errCode: 0,
				message: "更新成功",
			};
		} catch (err) {
			return {
				errCode: 1,
				message: "更新失败",
				error: err.message,
			};
		}
	},
};