// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129
const extStorageManager = uniCloud.getExtStorageManager({
	provider: "qiniu", // 扩展存储供应商
	domain: "unicdn.n-m.top", // 域名地址
});
module.exports = {
	_before: function() { // 通用预处理器

	},
	async getUploadFileOptions(data = {}) {
		let {
			cloudPath,
			domain,
		} = data;
		// 可以在此先判断下此路径是否允许上传等逻辑
		// ...

		let prefix = "media/"; // 上传文件的目录前缀，比如上传到 public 目录下，这里填写 public/
		// 最后调用 extStorageManager.getUploadFileOptions
		let uploadFileOptionsRes = extStorageManager.getUploadFileOptions({
			cloudPath: prefix + cloudPath, // 上传文件的云端路径
			allowUpdate: false, // 是否允许覆盖更新，如果会返回给前端，建议设置false，代表仅新增，不可覆盖（防止文件被意外替换），如果仅服务端直接交互，可以根据业务需要设置为true
		});
		return uploadFileOptionsRes;
	},
	async upimg() {
		let {
			body
		} = this.getHttpInfo();
		let data = JSON.parse(body)
		let base64 = data.file

		let base64Str = "base64,";
		let base64Index = base64.indexOf(base64Str);
		if (base64Index > -1) base64 = base64.substring(base64Index + base64Str.length);

		let fileContent = new Buffer(base64, 'base64');
		let res = await extStorageManager.uploadFile({
			cloudPath: `media/${data.name}`, // 云端文件名，不填则自动生成
			fileContent, // 要上传的文件内容
			allowUpdate: false, // 是否允许覆盖
		});
		return {
			errCode: 0,
			message: "上传成功",
			data: {
				fileURL: res.fileURL
			}
		}
	}
}