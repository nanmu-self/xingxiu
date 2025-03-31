// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129
const db = uniCloud.databaseForJQL();
const dbCmd = db.command;

module.exports = {
	_before: function() {
		// 通用预处理器
	},
	async test() {
		const classTable = await db.collection('categories').get()
		return classTable.data
	},
	// 创建文章
	async createArticle() {
		const {
			articleTitle,
			content,
			articleClass,
			articleLabel,
			articleHeaderImageUrl,
			reatType,
			hbUrl,
			gzhUrl,
			notice,
			videpIf = false,
			recDownVideo = false,
			downTitle,
			downUrl,
			downKey,
			wxvideoId,
			wxvideoFeedid,
			blblAv,
			set_top
		} = JSON.parse(this.getHttpInfo().body);

		// 参数校验
		if (!articleTitle || !content) {
			return {
				errCode: 1,
				message: "标题和内容不能为空",
			};
		}

		try {
			const result = await db.collection("articleContent").add({
				articleTitle,
				content,
				articleClass,
				articleLabel,
				articleHeaderImageUrl,
				reatType,
				hbUrl,
				gzhUrl,
				notice,
				videpIf,
				recDownVideo,
				downTitle,
				downUrl,
				downKey,
				wxvideoId,
				wxvideoFeedid,
				blblAv,
				set_top
			});
			if (articleClass.length>0) {
				let fenleiData = []
				articleClass.forEach(item => {
					fenleiData.push({
						article_id: result.id,
						category_id: item
					})
				})
				await db.collection('articleCategories').add(fenleiData)
			}
			return {
				errCode: 0,
				message: "创建成功",
				data: result,
			};
		} catch (err) {
			return {
				errCode: 1,
				message: "创建失败",
				error: err.message,
			};
		}
	},

	// 获取文章列表（分页）
	async getArticleList(params) {
		const {
			page = 1, pageSize = 10,
		} = params;
		const skip = (page - 1) * pageSize;

		try {


			const countResult = await db
				.collection("articleContent")

				.count();
			const total = countResult.total;

			const list = await db
				.collection("articleContent")

				.field({
					releaseTime: true,
					articleClass: true,
					articleTitle: true,
					set_top:true
				}) // 列表返回指定内容
				.orderBy("releaseTime", "desc")
				.skip(skip)
				.limit(pageSize)
				.get();
			//获取分类表
			const classTable = await db.collection('categories').get();
			// 添加分页名称
			list.data.forEach((item) => {
				item.articleClass = item.articleClass.map(id => {
					const foundObject = classTable.data.find(obj => obj._id === id);
					return foundObject ? foundObject.name : null;
				});
			})

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
			return {
				errCode: 1,
				message: "查询失败",
				error: err.message,
			};
		}
	},

	// 获取文章详情
	async getArticleDetail(params) {
		const {
			articleId
		} = params;

		if (!articleId) {
			return {
				errCode: 1,
				message: "文章ID不能为空",
			};
		}

		try {
			const article = await db
				.collection("articleContent")
				.doc(articleId)
				.get();

			return {
				errCode: 0,
				message: "查询成功",
				data: article.data[0],
			};
		} catch (err) {
			return {
				errCode: 1,
				message: "查询失败",
				error: err.message,
			};
		}
	},

	// 更新文章
	async updateArticle() {
		let body = JSON.parse(this.getHttpInfo().body);
		const {
			_id,
			articleTitle,
			content,
			articleClass,
			articleLabel,
			articleHeaderImageUrl,
			reatType,
			hbUrl,
			gzhUrl,
			notice,
			videpIf,
			recDownVideo,
			downTitle,
			downUrl,
			downKey,
			wxvideoId,
			wxvideoFeedid,
			blblAv,
			set_top
		} = body;

		if (!_id) {
			return {
				errCode: 1,
				message: "文章ID不能为空",
			};
		}

		try {
			const updateData = {};
			// 只更新传入的字段

			for (let field in body) {
				if (body.hasOwnProperty(field) && typeof body[field] !== "undefined") {
					updateData[field] = body[field];
				}
			}
			delete updateData._id;

			await db.collection("articleContent").doc(_id).update(updateData);

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

	// 删除文章
	async deleteArticle(params) {
		const {
			articleId
		} = params;

		if (!articleId) {
			return {
				errCode: 1,
				message: "文章ID不能为空",
			};
		}

		try {
			await db.collection("articleContent").doc(articleId).remove();
			await db.collection("articleCategories").where({
				article_id: articleId
			}).remove();


			return {
				errCode: 0,
				message: "删除成功",
			};
		} catch (err) {
			return {
				errCode: 1,
				message: "删除失败",
				error: err.message,
			};
		}
	},
};