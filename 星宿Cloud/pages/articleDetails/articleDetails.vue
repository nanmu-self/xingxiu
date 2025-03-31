<template>
	<!-- 加载动画 -->
	<zero-loading v-if="loading" :maskDark="false" type="radar" :showText="true" text="玩命加载中~~" :mask="true"
		:maskOpacity="1" :zIndex="999"></zero-loading>

	<view class="index-ov">
		<!-- 标题 -->
		<view class="titel-h-w">
			<view class="titel-h">
				{{ detailData.articleTitle }}
			</view>
		</view>
	</view>

	<!-- 正文内容 -->
	<view class="data-view">
		<!-- //开源地址https://github.com/jin-yufeng/mp-html -->
		<mp-html :tag-style="tag_style" :content="detailData.content" :container-style="container_style"
			:copy-link="false" selectable="true"> 内容疯狂加载ing...</mp-html>
	</view>
	<!-- #ifdef MP-WEIXIN -->
	<view v-if="advertising.wx_video" style="width: 94%;padding-left: 3%;margin-top: 50rpx;">
		<ad :unit-id="advertising.wx_video" ad-type="video" ad-theme="white"></ad>
	</view>
	<!-- #endif -->
	<!-- 文章列表没有数据 -->
	<view class="no-list-data">
		--我的底线就到这里了--
	</view>

	<!-- 猜你想搜 -->
	<block v-if="posTagsList.length">
		<view class="titel-felx">
			<view class="time-img">
				<image class="fengrui-img" src="https://unicdn.n-m.top/icon/star.svg" mode=""></image>
			</view>
			<view class="titel-h-go">
				相关文章
			</view>
		</view>

		<!-- 列表 -->
		<view class="list-li" v-for="(item ,index) in posTagsList" :key="index" @click="posTap(item)">
			<view class="list-img">
				<image class="fengrui-img" :src="item.thumbnailurl" mode="aspectFill"></image>
			</view>
			<view class="list-li-left">
				<view class="list-li-left-h">
					{{ item.title }}
				</view>
				<view class="list-li-left-describe">
					<view class="">推选阅读</view>
				</view>
			</view>
		</view>
	</block>


	<!-- 支撑顶部高度 -->
	<view style="height: 140rpx;"></view>


	<!-- 文章转发 -->
	<view class="cove-bom">
		<view class="cover-list-view">
			<view class="cover-quest" style="display: flex;align-items: center;" @click="tarBlack()">
				<image class="fengrui-img" style="width: 45rpx;height: 45rpx;margin-right: 10rpx;"
					src="http://unicdn.n-m.top/icon/back.svg" mode="aspectFit">
				</image>
				<text>返回上级</text>
			</view>

			<button class="cover-list-btn" open-type="contact" :send-message-title="detailData.articleTitle"
				:send-message-path="posUrl" show-message-card="true">
				<view class="cover-list-icon">
					<image class="fengrui-img" src="http://unicdn.n-m.top/icon/customer.svg" mode="aspectFit">
					</image>
				</view>
				<view class="cover-list-font">咨询客服</view>
			</button>

			<view v-if="detailData.downUrl">
				<view class="cover-list-icon" @click="downloadTap()">
					<image class="fengrui-img" src="http://unicdn.n-m.top/icon/down.svg" mode="aspectFit">
					</image>
				</view>
				<view class="cover-list-font">资源下载</view>
			</view>
			<button class="cover-list-btn" @click="collectionBtn" v-if="ifCollection">
				<view class="cover-list-icon" style="height: 58rpx;">
					<image class="fengrui-img" src="http://unicdn.n-m.top/icon/shoucang.svg" mode="aspectFit">
					</image>
				</view>
				<view class="cover-list-font">收藏</view>
			</button>

			<button class="cover-list-btn" open-type="share">
				<view class="cover-list-icon" style="height: 58rpx;">
					<image class="fengrui-img" src="http://unicdn.n-m.top/icon/share.svg" mode="aspectFit">
					</image>
				</view>
				<view class="cover-list-font">分享</view>
			</button>

		</view>
	</view>

</template>

<script setup>
	import {
		ref
	} from 'vue';
	import {
		onShareAppMessage,
		onShareTimeline,
		onLoad
	} from "@dcloudio/uni-app";
	import {
		debounce
	} from "@/hooks/common.js"
	import {
		storeToRefs
	} from 'pinia';
	import {
		ifLogin,
		userInfo
	} from "@/hooks/login.js"
	import {
		useWxsetStore
	} from "@/stores/configured.js";
	const wxSet = useWxsetStore();
	const db = uniCloud.databaseForJQL()
	const {
		advertising
	} = storeToRefs(wxSet);
	const posUrl = ref("");
	const container_style = 'font-size:15px;overflow-x: hidden;line-height:30px;letter-spacing:1px'
	const tag_style = {
		h1: 'border-top:1px solid rgb(0 0 141 / 12%);margin:48px 0 16px;padding-top:24px;letter-spacing:-.02em;line-height:32px',
		h2: 'border-top:1px solid rgb(0 0 141 / 12%);margin:48px 0 16px;padding-top:24px;letter-spacing:-.02em;line-height:32px',
		h3: 'border-top:1px solid rgb(0 0 141 / 12%);margin:48px 0 16px;padding-top:24px;letter-spacing:-.02em;line-height:32px',
		h4: 'lborder-top:1px solid rgb(0 0 141 / 12%);margin:48px 0 16px;padding-top:24px;letter-spacing:-.02em;line-height:32px',
	}
	// 推荐列表
	const posTagsList = ref([{
		thumbnailurl: "http://wo.n-m.top/wp-content/uploads/2024/12/pdf24.png",
		title: "楠木文章"
	}]);

	const ifCollection = ref(true);

	const collectionBtn = debounce(async () => {

		try {
			// 判断用户是否登录
			if (!userInfo.value.openid) {
				ifLogin();
				return;
			}

			// 准备收藏数据
			const data = {
				article_id: detailData.value._id,
				user_id: userInfo.value._id,
			};

			// 查询是否已收藏
			const {
				data: favorites
			} = await db.collection("user_favorites").where(data).get();

			if (favorites.length == 0) {
				// 未收藏，执行添加操作
				await db.collection("user_favorites").add(data);
			}
			ifCollection.value = false;
			uni.showToast({
				title: "已收藏",
				icon: "success",
				duration: 2000,
			});
		} catch (error) {
			// 错误处理
			console.error("收藏操作失败:", error);
			uni.showToast({
				title: "操作失败，请稍后再试",
				icon: "none",
				duration: 2000,
			});
		}
	}, 500);


	const loading = ref(true);
	const detailData = ref({
		_id: "666",
		thumbnailurl: "http://wo.n-m.top/wp-content/uploads/2024/12/pdf24.png",
		fr_down_url: "http://66.html",
		title: "Ookla Speedtest v5.5.2 安卓网络测速",
		content: `内容`
	})
	// 点击下载
	const downloadTap = () => {
		uni.navigateTo({
			url: "/pages/download/download?id=" + detailData.value._id
		})
	}
	onLoad((query) => {
		console.log(query);
		posUrl.value = 'pages/articleDetails/articleDetails?id=' + query.id;
		db.collection('articleContent').doc(query.id).get().then(res => {

			detailData.value = res.data[0];
			loading.value = false
		})
	})
	const tarBlack = () => {
		uni.navigateBack()
	};
	//分享好友
	onShareAppMessage(() => {
		return {
			title: detailData.value.articleTitle,
			imageUrl: detailData.value.articleHeaderImageUrl,
			path: '/pages/articleDetails/articleDetails?id=' + detailData.value._id
		}
	})
	//分享朋友圈
	onShareTimeline(() => {
		return {
			title: detailData.value.articleTitle,
			imageUrl: detailData.value.articleHeaderImageUrl,
			path: '/pages/articleDetails/articleDetails?id=' + detailData.value._id
		}
	})
</script>

<style>
	/* 关注微信公众号 */
	.que-user-red {
		color: red;
	}

	.account-aout {
		margin-left: 30rpx;
	}

	.account-btn {
		height: 60rpx;
		background-color: #1c262a;
		border-radius: 200rpx;
		font-size: 24rpx;
		width: 150rpx;
		color: #FFFFFF;
		flex-shrink: 0;
		margin-right: 0rpx;
	}

	.account-describe {
		font-size: 20rpx;
		color: #7c7c7c;
	}

	.account-img {
		height: 80rpx;
		width: 80rpx;
		border-radius: 200rpx;
		overflow: hidden;
	}

	.account-flex {
		display: flex;
	}

	.account-view {
		background-color: #f9f9f9;
		border-radius: 20rpx;
		height: 120rpx;
		margin: 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 18rpx 30rpx;
	}

	/* 密码访问 */
	.password-title {
		margin: 20rpx 0;
		font-weight: bold;
		font-size: 36rpx;
		text-align: center;
	}

	.password-desrc {
		width: 70%;
		margin: auto;
		text-align: center;
		font-size: 28rpx;
		color: #929292;
	}

	.password-position {
		position: fixed;
		top: 50%;
		left: 50%;
		width: 100%;
		transform: translate(-50%, -60%);
	}

	.password-icon {
		height: 500rpx;
		width: 100%;
		overflow: hidden;
	}

	/* 加载动画 */
	.data-login {
		height: 70rpx;
		width: 70rpx;
		margin: auto;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.data-login-flex {
		position: fixed;
		top: 0%;
		left: 0%;
		height: 100%;
		width: 100%;
		z-index: 1029;
		background-color: #f7f7f7;
	}

	/* 提问转发 */
	.cover-list-icon {
		height: 64rpx;
		width: 64rpx;
		display: block;
		margin: auto;
	}

	.cover-list-btn {
		margin: 0rpx;
		padding: 0rpx;
		background-color: unset;
		line-height: unset;
	}

	.cover-list-font {
		color: #b2b2b2;
		font-size: 24rpx;
		text-align: center;
		/* margin-top: 16rpx; */
	}

	.cover-open-right-bot {
		width: 100%;
		height: 100%;
		transform: rotate(180deg);
	}

	.cover-open-right-up {
		width: 100%;
		height: 100%;
	}

	.cover-open-right {
		position: absolute;
		right: 44rpx;
		height: 32rpx;
		width: 32rpx;
	}

	.cover-quest {
		border-radius: 100rpx;
		height: 64rpx;
		line-height: 64rpx;
		width: 24%;
		background-color: #f3f3f3;
		color: #b7b7b7;
		font-size: 24rpx;
		padding-left: 28rpx;
	}

	.cover-list-view {
		margin-bottom: 28rpx;
		height: 110rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		overflow: hidden;
	}

	.cover-h-icon {
		height: 50rpx;
		width: 50rpx;
		overflow: hidden;
		margin-left: 28rpx;
		margin-right: 14rpx;
	}

	.cover-view-h {
		margin: 28rpx 28rpx 0rpx 28rpx;
		color: #FFFFFF;
		height: 80rpx;
		font-size: 28rpx;
		display: flex;
		align-items: center;

	}

	.cove-bom {
		position: fixed;
		bottom: 0rpx;
		left: 0rpx;
		width: 100%;
		z-index: 1025;
		background-color: #fff;
	}

	/* 问题列表 */
	.que-time {
		color: #D5D5D5;
		font-size: 20rpx;
		margin-top: 14rpx;
	}

	.que-wen {
		margin-top: 14rpx;
		color: #7c7c7c;
		font-size: 28rpx;
	}

	.que-name {
		font-size: 26rpx;
	}

	.que-text {
		color: #cecccc;
		margin-left: 10rpx;
	}

	.que-description {
		margin-left: 20rpx;
	}

	.que-user {
		height: 50rpx;
		width: 50rpx;
		border-radius: 100rpx;
		background-color: #00BFFF;
		color: #FFFFFF;
		font-size: 24rpx;
		line-height: 50rpx;
		text-align: center;
		flex-shrink: 0;
	}

	.que-user-d {
		background-color: #4c8cec !important;
	}

	.que-lisr-v {
		border-radius: 20rpx;
		margin: 30rpx;
		display: flex;
	}

	/* 评论 */
	.leaving-user-time {
		color: #D5D5D5;
		font-size: 20rpx;
	}

	.leaving-user-info {
		margin-left: 20rpx;
	}

	.leaving-user-img {
		background-color: #007AFF;
		border-radius: 10rpx;
		height: 80rpx;
		width: 80rpx;
		flex-shrink: 0;
	}

	.leaving-view {
		background-color: #f8f8f8;
		border-radius: 10rpx;
		padding: 20rpx;
		margin: 30rpx;
		display: flex;
	}

	/* me-svg */
	.Vajra-list-font {
		color: #807C7C;
		font-size: 24rpx;
		text-align: center;
		margin-top: 16rpx;
	}

	.Vajra-list-img {
		height: 60rpx;
		width: 60rpx;
		overflow: hidden;
		margin: auto;
	}

	.me-sbg-btn {
		/* overflow-y: hidden; */
		justify-content: center;
		align-items: center;
	}

	.me-svg {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 30rpx;
		background-color: #FFFFFF;
		padding: 30rpx 0rpx 20rpx 0rpx;
		border-radius: 16rpx;
	}

	/* 资源 */
	.list-li-left-describe {
		margin: 30rpx 0rpx 10rpx 0rpx;
		font-size: 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.list-li-tag {
		color: #D5D5D5;
		font-size: 20rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		margin-top: 20rpx;
	}

	.list-img {
		height: 100rpx;
		width: 120rpx;
		border-radius: 14rpx;
		overflow: hidden;
		flex-shrink: 0;
	}

	.list-view {
		margin: 30rpx;
		background-color: #fff;
		padding: 30rpx;
		border-radius: 20rpx;
		box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.10);
	}

	.list-li {
		display: flex;
		align-items: center;
		margin: 20rpx 0rpx;
	}

	/* 没有数据时候 */
	.no-text {
		color: #ADADAD;
		margin-top: 40rpx;
		font-size: 30rpx;
	}

	.no-img {
		border-radius: 20rpx;
		overflow: hidden;
		height: 700rpx;
		width: 500rpx;
	}

	.no-datalist {
		position: absolute;
		top: 40%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	/* 列表没有数据 */
	.no-list-data {
		text-align: center;
		margin: 30rpx 0px;
		color: #ADADAD;
	}

	/* 列表 */
	.list-li-left-describe {
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		color: #D5D5D5;
		font-size: 20rpx;
		display: flex;
		justify-content: space-between;
	}

	.list-li-left-h {
		font-size: 26rpx;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.list-li-left {
		margin-left: 32rpx;
		flex-grow: 1;
		height: 116rpx;
		display: flex;
		flex-flow: column;
		justify-content: space-between;
	}

	.list-img {
		height: 100rpx;
		width: 120rpx;
		border-radius: 14rpx;
		overflow: hidden;
		flex-shrink: 0;
	}

	.list-li {
		display: flex;
		margin: 20rpx 48rpx;
		align-items: center;
		border-radius: 20rpx;
	}

	.list-li-toew {
		display: flex;
		margin: 20rpx 0rpx;
		align-items: center;
		border-radius: 20rpx;
		justify-content: space-around;
	}

	.list-icon-list {
		text-align: center;
	}

	.list-icon-list-btn {
		text-align: center;
		margin: 0;
		background-color: unset;
		padding: 0;
	}

	.list-icon-list-img {
		height: 60rpx;
		width: 60rpx;
		overflow: hidden;

	}

	.list-icon-list-img-title {
		font-size: 22rpx;
		color: #b1b1b1;
		margin-top: 12rpx;
	}

	.list-li-toew-ma {
		margin: 40rpx 0rpx 20rpx 0rpx;
	}

	/* 标题 */
	.title-h-ad {
		height: 240rpx;
		border-radius: 16rpx;
		margin: 48rpx;
		overflow: hidden;
	}

	.titel-felx {
		display: flex;
		align-items: center;
		padding: 28rpx;
		border-radius: 20rpx;
	}

	.titel-h-go {
		font-size: 32rpx;
		margin-left: 20rpx;
	}

	/* 金刚区域 */
	.district-poster {
		width: 220rpx;
		height: 60rpx;
		border-radius: 200rpx;
		background: linear-gradient(90deg, rgba(67, 130, 235, 1) 0%, rgba(6, 189, 254, 1) 100%);
		text-align: center;
		line-height: 64rpx;
		color: #FFFFFF;
		font-size: 28rpx;
		margin: 0rpx 20rpx;
		box-shadow: #4284ec 0rpx 4rpx 12rpx;
	}

	.district-fenrid {
		width: 220rpx;
		height: 60rpx;
		border-radius: 200rpx;
		background: linear-gradient(90deg, #F86168, #FFC6D3 100%);
		text-align: center;
		line-height: 64rpx;
		color: #FFFFFF;
		font-size: 28rpx;
		margin: 0rpx 20rpx;
		box-shadow: #F86168 0rpx 4rpx 12rpx;
	}

	.district-money {
		width: 220rpx;
		height: 60rpx;
		border-radius: 200rpx;
		background: linear-gradient(90deg, rgba(12, 185, 162, 1) 0%, rgba(15, 236, 210, 1) 100%);
		text-align: center;
		line-height: 64rpx;
		color: #FFFFFF;
		font-size: 28rpx;
		margin: 0rpx 20rpx;
		box-shadow: #0bbda6 0rpx 4rpx 12rpx;
	}

	.district-fabulous {
		width: 180rpx;
		height: 60rpx;
		border-radius: 200rpx;
		background: linear-gradient(90deg, rgba(248, 97, 104, 1) 0%, rgba(255, 198, 211, 1) 100%);
		text-align: center;
		line-height: 64rpx;
		color: #FFFFFF;
		font-size: 28rpx;
		margin: 0rpx 16rpx;
		box-shadow: #f96a71 0rpx 6rpx 22rpx;
	}

	.district {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	/* 评语 */
	.span-color {
		color: red;
	}

	.review {
		background-color: #f9f9f9;
		padding: 32rpx;
		margin: 20rpx 30rpx;
		border-radius: 10rpx;
		color: #807C7C;
		font-size: 24rpx;
	}

	/* 正文内容 */
	.data-font {
		margin-top: 40rpx;
	}

	.data-h:after {
		content: '';
		position: absolute;
		bottom: -14rpx;
		left: 0px;
		width: 96rpx;
		height: 8rpx;
		border-radius: 200rpx;
		background: linear-gradient(90deg, rgba(55, 110, 234, 1) 0%, rgba(255, 255, 255, 1) 100%);
	}

	.data-h {
		color: #000000;
		font-size: 32rpx;
		position: relative;
	}

	.data-img {
		border-radius: 10rpx;
		width: 100%;
		height: auto;
		overflow: hidden;
		margin: 30rpx 0rpx;
	}

	.data-view {
		margin: 20rpx 20rpx;
		font-size: 34rpx;
		color: #333232;
		line-height: 60rpx;
		word-wrap: break-word;
	}

	/* 标题 */
	.tar-w-h {
		color: #000000;
	}

	.titel-h {
		text-align: center;
		font-size: 42rpx;
		font-weight: bold;
	}

	.titel-view {
		width: 180rpx;
		flex-shrink: 0;
	}

	.titel-h-w {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 70rpx 30rpx 30rpx 30rpx;
		flex-grow: 1;
	}

	.top-img {
		height: 200rpx;
		width: 100%;
	}

	/* 背景图片 */
	.fengrui-img-tar {
		height: 40rpx;
		width: 40rpx;
	}

	.square-black-img {
		height: 40rpx;
		width: 40rpx;
		margin-top: 10rpx;
	}

	.square-black {
		position: fixed;
		left: 28rpx;
		background: rgba(255, 255, 255, 0.5);
		height: 55rpx;
		z-index: 2;
		width: 100rpx;
		border-radius: 100rpx;
		top: 0rpx;
		text-align: center;
	}

	.back-radius {
		position: absolute;
		bottom: 0;
		left: 0;
		height: 60rpx;
		width: 100%;
		border-radius: 40rpx 40rpx 0rpx 0rpx;
		background: #FFFFFF;
		z-index: 2;
	}

	.back-img {
		overflow: hidden;
		position: relative;
		background-color: #3482e2;
		border-radius: 0rpx 0rpx 40rpx 40rpx;
		padding-bottom: 20rpx;
		height: 20rpx;
	}

	.fengrui {
		height: 100%;
		width: 100%;
	}

	/* 自定义标题栏 */
	.tar-img {
		margin-left: 28rpx;
		height: 48rpx;
		width: 48rpx;
		overflow: hidden;
	}

	.tar-t {
		background-color: #FFFFFF;
		position: fixed;
		left: 0;
		width: 100%;
		z-index: 9999;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.tar-w {
		background-color: #FFFFFF;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 99999999999;
	}

	.fengrui-img {
		height: 100%;
		width: 100%;
	}

	.fengrui1-img {
		margin-left: 20rpx;

		height: 100%;
		width: 100%;
	}

	.index-ov {
		/* overflow-x: hidden; */
	}

	button:after {
		border: 0px solid rgba(0, 0, 0, .2);

	}

	/* 富文本解析视频宽度 */
	.video {
		width: 100% !important;
	}


	/* 暗黑模式下应用的样式 */
	@media (prefers-color-scheme: dark) {

		page,
		.data-login-flex,
		.tar-w,
		.back-radius,
		.tar-t,
		.cover-quest {
			background: #161616;
		}

		.data-view,
		.data-h {
			color: #d7d7d7 !important;
		}

		.me-svg,
		.cove-bom,
		.list-view {
			background: #202020;
		}

		.time-font {
			color: rgba(124, 124, 124, 1);
		}

		.tar-w-h,
		.square-black-img,
		.fengrui-img-tar {
			color: rgba(201, 201, 201, 1);
		}

		.privacy-view {
			background-color: #292929;
		}
	}
</style>