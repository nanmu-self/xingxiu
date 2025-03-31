// 防抖函数
export const debounce = (fn, delay = 300) => {
	let timer = null;

	return function(...args) {
		if (timer) {
			clearTimeout(timer);
		}

		timer = setTimeout(() => {
			fn.apply(this, args);
		}, delay);
	};
};
// 时间格式化
export function convertTimestampToDateTime(timestamp) {
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