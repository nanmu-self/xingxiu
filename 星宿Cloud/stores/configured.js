import {
	defineStore
} from 'pinia';
import {
	ref
} from "vue"
export const useWxsetStore = defineStore('wxset', () => {
	// 分类样式true是一级
	const categ_style = ref(true);
	//文章样式
	const index_style = ref(1);
	//小程序logo
	const nm_logo = ref("http://cdn.n-m.top/logo.ico");
	// 分享标题
	const share_title = ref("楠木宝库");
	const share_image = ref("")
	// 公众号配置
	const publicConfig = ref({
		public_follow: "https://unicdn.n-m.top/gzhewm.jpg",
		public_logo: "http://cdn.n-m.top/logo.ico",
		public_name: "楠木网络工作室"
	})
	//广告配置
	const advertising = ref({
		wx_video: "adunit-74a46820aead00e3",
		wx_chaping: "adunit-0a7a2780ce6a8377",
		wx_jili_video: "adunit-d2c0d4928521efc9"
	})

// 分类列表
const classification=ref([])
	return {
		categ_style,
		publicConfig,
		advertising,
		nm_logo,
		share_title,
		share_image,
		index_style,classification
	};
});