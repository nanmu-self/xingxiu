<template>
	<view class="frist-notic" v-if="is_frist">
		点击“●●●”添加到我的小程序
	</view>
	<view class="index-img">
		<image class="fengrui-img" src="http://unicdn.n-m.top/indexbg.svg" mode="aspectFill"></image>
		<view class="radial-gradient-bg"></view>
	</view>
	<!-- / 分类菜单 -->
	<view class="menu_scroll_top_img_ac">
		<view :class=" scrollTopHightX < 6 ? 'menu_scroll_top_one':'menu_scroll_top_tow'">
			<view class="menu-logo">
				<image class="fengrui-img" :src="nm_logo" mode="aspectFit"></image>
			</view>
			<block v-if="menusLsit.length">
				<view class="menu-scroll">
					<scroll-view class="menu-scroll-leat" scroll-x="true">
						<view :class="active == index ? 'active_menu_scroll_leat_font':'menu_scroll_leat_font' "
							v-for="(menu,index) in menusLsit" :key="index" @click="menuTap(index,menu)">
							{{ menu.name }}
						</view>
					</scroll-view>
				</view>
			</block>
		</view>
	</view>
	<!-- S 搜索框 -->
	<view class="container">
		<view class="search-view">
			<view class="search-inpt-view">
				<input name="place" class="search-input" type="text" placeholder="搜索您想要的资源！" placeholder-style=""
					v-model="searchValue" />
				<view class="search-btn" @click="searchBlur()">搜索</view>
			</view>
		</view>
	</view>
	<!-- E 搜索框 -->

	<!-- / 轮播图 -->
	<block v-if="active == 0">

		<view class="content-all" v-if="rotation != ''">
			<swiper class="swiper-box" :autoplay="true" :interval="2000" :duration="500">
				<swiper-item v-for="(item, index) in rotation" :key="index" @click="newPostTap(item)">
					<view class="swiper-item">
						<image class="fengrui-img" :src="item.articleHeaderImageUrl" mode="aspectFill" />
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="label-felx" v-if="tags.length">
			<view class="label-list" v-for="(item ,index) in tags" :key="index" @click="tagsTap(item._id)">
				<text style="color:#ff6f6f;">#</text> {{item.name}}
			</view>
		</view>

		<!-- S 导航区域 -->
		<view class="Vajra-bg" v-if="vajra.length != 0 ">
			<view class="Vajra">
				<block v-for="(valist,index) in vajra" :key="index">
					<!-- / 渲染普通金刚区 -->
					<view class="Vajra-list" v-if="valist.wzType != 'xs_program'" @click="xs_default(valist)">
						<view class="Vajra-list-img">
							<image class="fengrui-img" :src="valist.himg" mode="aspectFit"></image>
						</view>
						<view class="Vajra-list-font">
							{{ valist.title }}
						</view>
					</view>

					<!-- / 渲染跳转小程序 -->
					<view class="Vajra-list" v-if="valist.wzType == 'xs_program'">
						<navigator :path="valist.route" hover-class="none" open-type="navigate" :app-id="valist.appid"
							target="miniProgram">
							<view class="Vajra-list-img">
								<image class="fengrui-img" :src="valist.himg" mode="aspectFit"></image>
							</view>
							<view class="Vajra-list-font">
								{{ valist.title }}
							</view>
						</navigator>
					</view>
				</block>
			</view>
		</view>
		<!-- E 导航区域 -->
		<!-- S 首页公告 -->
		<view class="notice" v-if="fr_notice!=''">
			<view class="notice-icon">
				<image class="fengrui-img" src="https://unicdn.n-m.top/icon/notice.svg" mode="aspectFill"></image>
			</view>
			<view class="notice-text">
				<view class="noticl-item">{{fr_notice}}</view>
			</view>
		</view>
		<!-- E 首页公告 -->
		<!-- S 热门文章 -->
		<view v-if="focuList.length">
			<view class="titel-vi" hover-class="fengrui-li-hover">
				<view class="titel-vi-q">
					<view class="titel-vi-img">
						<image class="fengrui-img" src="https://unicdn.n-m.top/icon/title-img.svg" mode="aspectFill">
						</image>
					</view>
					<view class="titel-vi-font">热门文章</view>
				</view>
			</view>

			<view class="swiper-list">
				<scroll-view class="" scroll-x="true" show-scrollbar="false">
					<view class="scroll-view-item-list" hover-class="fengrui-li-hover"
						v-for="(wxlist,index) in focuList" :key="index" @click="xs_default(wxlist)">
						<view class="scroll-view-item-h">
							<view class="scroll-view-item-h-img">
								<image class="fengrui-img" :src="wxlist.himg" mode="aspectFill"></image>
							</view>
						</view>
						<view class="scroll-view-item-h-title">
							{{ wxlist.title }}
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<!-- E 公众号文章 -->
		<!-- S焦点标题 -->
		<view class="titel-vi">
			<view class="titel-vi-q">
				<view class="titel-vi-img">
					<image class="fengrui-img" src="https://unicdn.n-m.top/icon/title-img2.svg" mode="aspectFill">
					</image>
				</view>
				<view class="titel-vi-font">最新文章</view>
			</view>
			<view class="titel-vi-right" @click="goCategory()">
				查看更多
			</view>
		</view>
		<!-- E焦点标题 -->
	</block>

	<!-- 文章列表 -->
	<articleList :newPost="newPost"></articleList>
	<!-- 加载动画 -->
	<zero-loading v-if="loading" :maskDark="false" :showText="true" text="玩命加载中~~" :mask="true" :maskOpacity="1"
		:zIndex="999"></zero-loading>
</template>
<script setup>
	import {
		ref
	} from 'vue';
	import {
		onLoad,
		onPageScroll,
		onShareAppMessage,
		onReachBottom
	} from "@dcloudio/uni-app";
	import {
		storeToRefs
	} from 'pinia';
	import {
		useWxsetStore
	} from "@/stores/configured.js";
	const wxSet = useWxsetStore();
	const {
		advertising,
		share_title,
		share_image,
		nm_logo,
		publicConfig,
		index_style,
		classification
	} = storeToRefs(wxSet);

	const db = uniCloud.databaseForJQL()
	let interstitialAd = null;
	const wx_video = ref("");
	const articleStyle = ref(1);
	const newPost = ref([{
		thumbnailurl: "https://wo.n-m.top/wp-content/uploads/2024/12/pdf24.png",
		title: "Windows 11 24H2 官方正式版2024年12月版",
		content: {
			protected: false,
			rendered: `<p><a href="https://www.52ybcj.com/archives/2134">PDF24 Creator</a>是一款完全免费、方便、功能丰富的<a href="https://www.52ybcj.com/archives/2134">PDF</a>文件处理工具，包含了28种PDF文件处理相关的工具。功能：PDF合并、组织、压缩、编辑、转换、加密、解密、分割、旋转、删除、提取、排序、文本识别、添加水印、裁剪、拼合等。与 Adobe Acrobat 相比，体积<a href="https://www.52ybcj.com/archives/2134">更小</a>，占用计算机内存极少，使用也更方便快捷，是一款不错的 PDF 工具。</p>`
		},
		date: "2024-12-28T20:25:30",
		fr_videp_if: "0",
		fr_down_url: "https://pan.quark.cn/s/ea679ffc1ec7",
		pos_read: 0,
		id: "66"
	}])
	const loading = ref(true)
	const is_frist = ref(true);
	const scrollTopHightX = ref(0);
	// const logoImg = ref("https://unicdn.n-m.top/nanmulogo.svg");
	const active = ref(0);
	const menusLsit = ref([{
		name: "最新文章"
	}]);
	const searchValue = ref("");

	const rotation = ref([]);
	const tags = ref([]);

	// {
	// 	wzType: "xs_program",
	// 	himg: "https://unicdn.n-m.top/icon/xiaochengxu.svg",
	// 	appid: "wxxx",
	// 	url: "/pages/index/index",
	// 	title: "跳小程序"
	// }, {
	// 	"title": "视频号",
	// 	"wzType": "xs_wxvideo_activity",
	// 	"appid": "sphZH1MCAzuup7O",
	// 	"route": "export/UzFfAgtgekIEAQAAAAAAkmgZ-dnzgQAAAAstQy6ubaLX4KHWvLEZgBPEvqEYVUZGRauDzNPgMJqd9yLzTJ4xAM85VZ0MYmrr",
	// 	"himg": "/static/index/dstrict-1.svg"
	// }
	const vajra = ref([]);
	const fr_notice = ref("公告内容");
	const focuList = ref([{
		"title": "视频号",
		"type": "xs_wxvideo_activity",
		"appid": "sphZH1MCAzuup7O",
		"route": "export/UzFfAgtgekIEAQAAAAAAkmgZ-dnzgQAAAAstQy6ubaLX4KHWvLEZgBPEvqEYVUZGRauDzNPgMJqd9yLzTJ4xAM85VZ0MYmrr",
		"himg": "https://s21.ax1x.com/2024/12/26/pAv8pnA.png",
	}])

	// 插屏广告数据
	const getWxchaAd = () => {
		// 在页面onLoad回调事件中创建插屏广告实例
		if (wx.createInterstitialAd) {
			interstitialAd = wx.createInterstitialAd({
				adUnitId: advertising.value.wx_chaping,
			});
			interstitialAd.onLoad(() => {});
			interstitialAd.onError((err) => {
				console.log(err);
			});
			interstitialAd.onClose(() => {});
		}

		// 在适合的场景显示插屏广告
		if (interstitialAd) {
			interstitialAd.show().catch((err) => {
				console.error(err);
			});
		}
	}
	const goCategory = () => {
		uni.switchTab({
		  url: "/pages/thematic/thematic",
		});
	}

	const newPostTap = (item) => {
		uni.navigateTo({
			url:"/pages/articleDetails/articleDetails?id=" + item._id
		})
	};
	const tagsTap = (id) => {
		console.log(id);
	};
	// 金刚区跳转
	const xs_default = (item) => {
		switch (item.type) {
			case 'xs_default':
				uni.navigateTo({
					url: item.route
				})
				break;
			case 'xs_tap':
				uni.switchTab({
					url: item.route
				})
				break;
			case 'xs_bilibli':
				// 该逻辑来自:https://segmentfault.com/a/1190000040857244?utm_source=sf-similar-article
				const aid = item.appid
				const timestamp = new Date().getTime()
				const path =
					`pages/video/video?__preload_=${timestamp*10+3}&__key_=${timestamp*10+4}&avid=${aid}`
				wx.navigateToMiniProgram({
					appId: 'wx7564fd5313d24844',
					path,
					success: res => {
						console.log('跳转成功')
					}
				})
				break;
			case 'xs_business':
				var aurl = item.route
				uni.navigateTo({
					url: '../weblist/weblist?aurl=' + aurl
				})
				break;
			case 'xs_wxvideo_activity':
				uni.openChannelsActivity({
					finderUserName: item.appid,
					feedId: item.route,
					success: (res) => {}
				})
				break;
			case 'xs_wxvideo_home':
				uni.openChannelsUserProfile({
					finderUserName: item.appid,
				})
				break;
		}
	}

	// 搜索按钮跳转
	const searchBlur = () => {
		if (searchValue.value == '') {
			uni.showToast({
				icon: "error",
				title: '请输入搜索内容...',
			})
		} else {
			uni.navigateTo({
				url: '../list/list?keyword=' + searchValue.value
			})
		}

	}
	onLoad(async () => {
		// 关闭右上角引导
		setTimeout(() => {
			is_frist.value = false;

			if (advertising.value.wx_chaping) {
				// 加载插屏弹窗
				getWxchaAd();
			}
		}, 3000);

		//获取金刚位
		getJgAndRm()
		//获取分类
		getMenusLsit();
		//获取标签
		getTags()
		//获取系统配置
		getConfig()
		//获取文章
		getArticle()


	});
	let page = 1;
	let pageSize = 10;

	const getArticle = async () => {
		let res = await db.collection("articleContent")
			.field({
				releaseTime: true,
				articleHeaderImageUrl: true,
				articleTitle: true,
				set_top: true,
				downUrl: true,
				reatType: true
			}) // 列表返回指定内容
			.orderBy("releaseTime", "desc")
			.skip((page - 1) * pageSize)
			.limit(pageSize)
			.get();

		newPost.value = res.data
		res.data.forEach(item => {
			if (item.set_top) {
				rotation.value.push(item)
			}
		})
		loading.value = false;
	}
	const getConfig = async () => {
		let res = await db.collection('wx_Config').get();
		console.log(res.data[0]);
		let configData = res.data[0];
		nm_logo.value = configData.nmLogo;
		share_title.value = configData.share_title;
		let {
			public_follow,
			public_logo,
			public_name,
			wx_video,
			wx_chaping,
			wx_jili_video
		} = configData
		publicConfig.value = {
			public_follow,
			public_logo,
			public_name
		}
		advertising.value = {
			wx_video,
			wx_chaping,
			wx_jili_video
		}
		fr_notice.value = configData.notice;
		index_style.value = configData.indexStyle;
		share_image.value = configData.share_image
		if (configData.popupMsg) {
			// 弹窗消息
			uni.showModal({
				title: "特别说明!",
				content: configData.popupMsg,
				showCancel: false,
			})
		}
	}

	onShareAppMessage((res) => {
		if (res.from === 'button') { // 来自页面内分享按钮
			console.log(res.target)
		}
		return {
			title: share_title.value,
			imageUrl: share_image.value,
			path: "/pages/index/index",
		};
	})

	const getTags = async () => {
		let res = await db.collection('nm_label').where({
			set_top: true,
		}).limit(4).get();
		tags.value = res.data
	}
	const getMenusLsit = async () => {
		let res = await db.collection('categories').get();
		classification.value = res.data;
		res.data.forEach(item => {
			if (item.set_top) {
				menusLsit.value.push(item)
			}
		})
	}

	const getJgAndRm = async () => {
		let {
			data
		} = await db.collection("articleStrle").get();
		if (!data) return;
		data.forEach(item => {
			if (item.styleType) {
				vajra.value.push(item)
			} else {
				focuList.value.push(item)
			}
		})



	}
	const menuTap = async (index, item) => {
		active.value = index
		if (index != 0) {
			loading.value = true
			const fenlei = db.collection('articleCategories').where(`category_id=="${item._id}"`).getTemp();
			const article = db.collection('articleContent').field(
				'releaseTime,articleHeaderImageUrl,articleTitle,set_top,downUrl,reatType,_id').getTemp()
			let res = await db.collection(fenlei, article).limit(10).get();
			newPost.value = []
			res.data.forEach(i => {
				newPost.value.push(i.article_id[0])
			})

			loading.value = false
		} else {
			//获取文章
			getArticle()
		}

	};
	// 监听触底----上拉刷新
	onReachBottom(() => {
		console.log('监听触底');
	})
	//监听滚动
	onPageScroll((e) => {
		scrollTopHightX.value = e.scrollTop;
	})
</script>

<style>
	/* 搜索 */
	.search-view {
		position: relative;
		margin: 30rpx 40rpx;
		border-radius: 200rpx;
		background-color: #F7F7F7;
		overflow: hidden;
	}

	.search-btn {
		position: absolute;
		right: 2%;
		height: 80rpx;
		background-color: #4b75ff;
		bottom: 10rpx;
		width: 22%;
		font-size: 28rpx;
		border-radius: 40rpx;
		color: #fff;
		line-height: 80rpx;
		text-align: center;
	}


	.search-input {
		height: 100rpx;
		width: 65%;
		padding: 0 60rpx;
		z-index: 99999;
		color: #161616;
	}

	.search-inpt-view {
		background-color: #F7F7F7;
		border-radius: 200rpx;
		height: 100rpx;
	}

	.container-search {
		margin: 40rpx 0rpx;
	}

	.container {
		margin: 20rpx 30rpx -20rpx 30rpx;
		background: #ffffff;
		border-radius: 20rpx;
		/* padding: 30rpx; */
		overflow: hidden;
	}

	/* 加载动图 */
	.artileload {
		height: 80rpx;
		width: 80rpx;
		margin: 20rpx auto;
		overflow: hidden;
	}

	/* 首页分类样式1 */
	.muen-tow-list-one {
		margin: 30rpx;
	}

	.muen-tow-view {
		border: 20rpx 20rpx 0rpx 0rpx;
		overflow: hidden;
		padding-bottom: 30rpx;
	}

	.muen-tow-list {
		overflow: hidden;
		border-radius: 20rpx;
	}



	/* 公告 */
	.notice {
		margin: 28rpx;
		padding: 26rpx 46rpx;
		border-radius: 40rpx;
		background-color: #fff4e0;
		display: flex;
		align-items: center;
	}

	.notice-icon {
		width: 48rpx;
		height: 48rpx;
		flex-shrink: 0;
	}

	.notice-text {
		font-size: 30rpx;
		margin-left: 20rpx;
		width: 100%;
		height: 60rpx;
		overflow: hidden;
		position: relative;

	}

	.noticl-item {
		position: absolute;
		width: 100%;
		height: 100%;
		line-height: 60rpx;
		/* text-align: right; */
		/* 	animation: notice-text 10s linear infinite; */
		white-space: nowrap;
		color: #fec009;
	}

	@keyframes notice-text {
		0% {
			transform: translateX(100%);
		}

		100% {
			transform: translateX(-100%);
		}
	}

	/* 引导添加我的小程序 */
	.index-img {
		width: 100%;
		height: 720rpx;
		position: absolute;
		z-index: -1;
	}

	.frist-notic {
		background-color: #1f2021;
		position: fixed;
		top: 90rpx;
		right: 26%;
		width: 340rpx;
		padding: 16rpx;
		z-index: 99;
		border-radius: 200rpx;
		color: #faffff;
		text-align: center;
		font-size: 20rpx;
	}

	/* 列表没有数据 */
	.no-list-data {
		text-align: center;
		margin: 30rpx 0px;
		color: #e6e6e6;
		font-size: 24rpx;
	}

	/* 区域滑动 */
	.scroll-view-item-describe {
		color: #ADADAD;
		font-size: 24rpx;
		margin: 6rpx 30rpx 0rpx 30rpx;
		overflow: hidden;
	}

	.scroll-img {
		height: 30rpx;
		width: 30rpx;
	}

	.scroll-view-item-h-title {
		font-size: 24rpx;
		margin: 18rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.scroll-view-item-h-describe {
		font-size: 22rpx;
		color: #807C7C;
		margin-left: 18rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		margin-top: 12rpx;
		margin-bottom: 18rpx;
	}

	.scroll-view-item-h-img {
		width: 100%;
		height: 180rpx;
		overflow: hidden;
	}

	.scroll-view-item-list-star {
		width: 0rpx;
		border-radius: 20rpx;
		margin-right: 10rpx;
		margin-left: 20rpx;
		display: inline-block;
		overflow: hidden;
	}

	.scroll-view-item-list {
		width: 420rpx;
		/* height: 240rpx; */
		border-radius: 20rpx;
		display: inline-block;
		overflow: hidden;
		background-color: #FFFFFF;
		margin-left: 30rpx;
	}

	.scroll-view-item-list:last-child {
		margin-right: 30rpx;
	}


	.swiper-list {
		white-space: nowrap;
		width: 100%;
	}

	/* 标题 */
	.titel-vi-right {
		color: #989898;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 20rpx;
	}

	.titel-vi-font {
		font-size: 30rpx;
		margin-left: 24rpx;
	}

	.titel-vi-img {
		width: 36rpx;
		height: 36rpx;
	}

	.titel-vi {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 28rpx 30rpx;
	}

	.titel-vi-q {
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	/* 顶部菜单 */
	.menu_scroll_top_one {
		position: fixed;
		top: -1rpx;
		left: 0;
		width: 100%;
		z-index: 90;
		/* padding-top: calc(var(--status-bar-height) + 46px); */
		padding-top: 46px;
		/* #ifdef MP-TOUTIAO */
		padding-top: unset;
		/* #endif */
	}

	.menu_scroll_top_img_ac {
		height: 260rpx;
	}


	.menu_scroll_top_tow {
		position: fixed;
		top: -1rpx;
		left: 0;
		background-color: #ffffff;
		width: 100%;
		z-index: 9999;
		/* padding-top: calc(var(--status-bar-height) + 46px); */
		padding-top: 46px;
		border-radius: 0rpx 0rpx 30rpx 30rpx;
		box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.10);

		/* #ifdef MP-TOUTIAO */
		padding-top: unset;
		height: 120rpx;
		/* #endif */
	}

	.menu_list_img_ti {
		height: 30rpx;
		width: 30rpx;
		margin-right: 10rpx;
		float: left;
		overflow: hidden;
	}

	.active_menu_list_img_ti {
		height: 40rpx;
		width: 40rpx;
		margin-right: 10rpx;
		float: left;
	}

	.active_menu_scroll_leat_font {
		font-size: 26rpx;
		padding: 16rpx 30rpx;
		justify-content: center;
		align-items: center;
		flex-shrink: 0;
		width: auto;
		display: inline-block;
		background-color: #007AFF;
		border-radius: 12rpx;
		color: #FFFFFF;
		margin-right: 20rpx;
		animation: clickAnimation 1s ease forwards;
	}

	@keyframes clickAnimation {
		0% {
			transform: scale(1);
		}

		50% {
			transform: scale(1.1);
		}

		100% {
			transform: scale(1);
		}
	}

	.menu_scroll_leat_font {
		color: #6b6b6b;
		font-size: 26rpx;
		padding: 16rpx 30rpx;
		justify-content: center;
		align-items: center;
		filter: grayscale(1);
		flex-shrink: 0;
		width: auto;
		display: inline-block;
		margin-right: 20rpx;
		border-radius: 12rpx;
	}

	.menu-scroll-right {
		width: 30rpx;
		height: 6rpx;
	}

	.menu-scroll-leat {
		align-items: flex-end;
		white-space: nowrap;
		/* background-color: rgba(255, 255, 255, 0.4); */
		border-radius: 20rpx;
		padding: 20rpx 0;
	}

	.menu-scroll {
		display: flex;
		justify-content: space-between;
		padding: 10rpx 30rpx 30rpx 30rpx;
		justify-content: flex-start;
	}

	.menu-logo {
		height: 70rpx;
		width: 150rpx;
		margin-left: 30rpx;
	}

	/* 金刚区域 */
	.Vajra-list-font {
		color: #807C7C;
		font-size: 24rpx;
	}

	.Vajra-list-img {
		height: 90rpx;
		width: 90rpx;
		overflow: hidden;
		margin: auto;
	}

	.Vajra-list {
		text-align: center;
		width: 25%;
		margin-bottom: 20rpx;
		flex-shrink: 0;
	}

	.Vajra {
		margin: 20rpx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-wrap: wrap;
	}

	.Vajra-bg {
		background-color: #FFFFFF;
		border-radius: 20rpx;
		margin: 30rpx;
		padding: 1rpx;
	}


	/* 轮播图 */
	.swiper-item {
		border-radius: 16rpx;
		overflow: hidden;
		height: 320rpx;
	}

	.swiper-box {
		height: 320rpx;
		border-radius: 16rpx;
		overflow: hidden;
	}

	.image {
		width: 750rpx;
	}

	.radial-gradient-bg {
		position: absolute;
		left: 0;
		bottom: -10rpx;
		width: 100%;
		height: 100rpx;
		background: linear-gradient(180deg, rgba(248, 248, 248, 0) 0%, rgba(248, 248, 248, 0.31) 18%, rgba(248, 248, 248, 0.93) 64%, #F8F8F8 86%);
	}


	/* 标签 */
	.label-felx {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: -15rpx 30rpx 30rpx 30rpx;
	}

	.label-list {
		background-color: #FFFFFF;
		color: #807C7C;
		border-radius: 10rpx;
		width: 30%;
		margin: 0 calc((100% - 30% * 3) / 3 / 2);
		padding: 15rpx 0;
		text-align: center;
		font-size: 28rpx;
	}

	/* 全局 */
	.content-all {
		margin: 30rpx 30rpx 30rpx 30rpx;
		z-index: 30;
	}

	.fengrui-img {
		width: 100%;
		height: 100%;
	}


	.index-ov {
		overflow-x: hidden;
	}

	.tar-w {
		background-color: #FFFFFF;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 99999999999;
	}

	page {
		background-color: #F7F7F7;
		overflow-x: hidden;
	}

	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
	}

	/* 暗黑模式下应用的样式 */
	@media (prefers-color-scheme: dark) {

		page,
		.menu_scroll_top,
		.search-view,
		.search-inpt-view {
			background: #161616;
		}

		.radial-gradient-bg {
			background: linear-gradient(180deg, rgba(22, 22, 22, 0) 0%, rgba(22, 22, 22, 0.31) 18%, rgba(22, 22, 22, 0.93) 64%, #161616 86%);
		}

		.scroll-view-item-list {
			border: 1px #191919 solid;
		}

		.menu_scroll_top_tow,
		.menu-scroll-list,
		.scroll-view-item-list,
		.label-list,
		.container,
		.Vajra-bg {
			background: #202020;
		}

		.list-one-w,
		.uni-searchbar__box {
			border: 1px #191919 solid;
			background: #202020;
		}

		.poster {
			border-top: #000000 1px solid;
		}

		.titel-vi-font,
		.scroll-view-item-h-title {
			color: #989898;
		}
	}
</style>