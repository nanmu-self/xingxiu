<template>
	<view class="centem-body">
		<!-- 顶部图片 -->
		<view class="data-clerk">
			<view class="data-clerk-text">
				<view class="data-clerk-text-h">
					相濡以沫
				</view>
				<view class="data-clerk-text-w">
					山林不向四季发誓，荣枯随缘
				</view>
			</view>
			<view class="data-img">
				<image class="fengrui-img" src="https://unicdn.n-m.top/icon/upload.svg" mode="scaleToFill"></image>
			</view>
		</view>
		<!-- 标题 -->
		<view class="down-view-all list-li-left-h" style="margin-top: -30rpx;">
			<span class="down-view-ruan">◉</span>{{detailData.downTitle}}
			<view class="down-view-title-dscr">
				{{ detailData.articleTitle }}
			</view>
		</view>
		<!-- 激励视频下载附件样式 -->
		<block v-if="detailData.recDownVideo">
			<view class="down-view-all">
				<view class="down-user">
					<view class="down-user-img">
						<image class="fengrui-img" src="https://unicdn.n-m.top/icon/down.svg" mode="aspectFill"></image>
					</view>
					<view class="down-user-name">
						下载链接
					</view>
				</view>
				<button class="down-btn-video" @click="videoAD()">
					<view class="down-btn-video-icon">
						<image class="fengrui-img" src="https://unicdn.n-m.top/icon/ad_video.svg" mode=""></image>
					</view>
					获取附件内容
				</button>
			</view>
		</block>

		<!-- 下载附件内容 -->
		<block v-else>
			<!-- 附件下载方式为复制链接 -->
			<view class="down-view-all">
				<view class="down-user">
					<view class="down-user-img">
						<image class="fengrui-img" src="https://unicdn.n-m.top/icon/down.svg" mode="aspectFill">
						</image>
					</view>
					<view class="down-user-name">
						下载链接
					</view>
				</view>
				<view class="down-network-view">
					<text user-select="true">
						{{ detailData.downUrl}}
					</text>
				</view>
				<view class="down-list-btn">
					<button class="down-btn" type="default" @click="tapDownUrl(1)">复制下载链接值</button>
					<button class="down-btn-key" type="default" @click="tapDownUrl(2)"
						v-if="detailData.downKey">提取码:{{ detailData.downKey}}</button>
				</view>
				<view class="down-list-btn-text">
					<span class="que-user-red">*</span>
					长按链接手动复制
				</view>
			</view>
		</block>
		<!-- 判断微信流量主 -->
		<!-- #ifdef MP-WEIXIN -->
		<block v-if="advertising.wx_video">
			<view class="" style="margin: 30rpx 30rpx;">
				<ad :unit-id="advertising.wx_video" ad-type="video" ad-theme="white"></ad>
			</view>
		</block>

		<!-- 其他平台 -->
		<view class="down-view-all">
			<!-- <view class="titel-h">
				其他平台
			</view> -->
			<view class="down-li-toew">
				<button class="down-icon-list-btn" @click="wxvideoTap()" v-if="detailData.wxvideo_feedid != ''">
					<view class="down-icon-list-img">
						<image class="fengrui-img" src="https://unicdn.n-m.top/icon/wx_video_icon.svg" mode="aspectFit">
						</image>
					</view>
					<view class="down-icon-list-img-title">
						视频说明
					</view>
				</button>
				<button class="down-icon-list-btn" open-type="contact" :send-message-title="detailData.fr_down_title"
					:send-message-path="posUrl" show-message-card="true">
					<view class="down-icon-list-img">
						<image class="fengrui-img" src="https://unicdn.n-m.top/icon/customer.svg" mode="aspectFit">
						</image>
					</view>
					<view class="down-icon-list-img-title">
						客服
					</view>
				</button>

				<button class="down-icon-list-btn" open-type="share">
					<view class="down-icon-list-img">
						<image class="fengrui-img" src="https://unicdn.n-m.top/icon/share.svg" mode="aspectFit">
						</image>
					</view>
					<view class="down-icon-list-img-title">分享</view>
				</button>
			</view>
		</view>
		<!-- #endif -->

		<view style="margin: 38rpx;">
			<view class="titel-h">
				声明：
			</view>
			<view class="data-clerk-text-w" style="margin: 30rpx 0rpx;">
				尊重各网络文件的版权问题，部分软件文件均出自网络，提供下载的软件和资源均为软件或程序作者提供和网友推荐收集整理而来，仅供学习和研究使用。如有侵犯你的版权，请及时通知我们，将立即改正
			</view>
		</view>
	</view>

	<zero-loading v-if="loading" type="eyes" :maskDark="false" :showText="true" text="玩命加载中~~" :mask="true"
		:maskOpacity="1" :zIndex="999"></zero-loading>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	import {
		onShareAppMessage,
		onShareTimeline,
		onLoad
	} from "@dcloudio/uni-app"
	import {
		storeToRefs
	} from 'pinia';

	import {
		useWxsetStore
	} from "@/stores/configured.js";
	const db = uniCloud.databaseForJQL()
	const wxSet = useWxsetStore();
	const {
		advertising
	} = storeToRefs(wxSet);
	let rewardedVideoAd = null;
	const loading = ref(true)

	const detailData = ref({});

	const wxvideoTap = () => {
		uni.showToast({
			title: "暂未视频",
			icon: "error"
		})
	}

	const videoAD = () => {
		rewardedVideoAd.show()
			.then(() => console.log('激励视频 广告显示')).catch(err => console.log(err))
	}
	onLoad((query) => {
		if (wx.createRewardedVideoAd) {
			rewardedVideoAd = wx.createRewardedVideoAd({
				adUnitId: advertising.value.wx_jili_video
			})
			rewardedVideoAd.onLoad(() => {
				console.log('onLoad event emit')
			})
			rewardedVideoAd.onError((err) => {
				console.log('onError event emit', err)
			})
			rewardedVideoAd.onClose((res) => {
				// 用户点击了【关闭广告】按钮
				if (res && res.isEnded) {
					// 正常播放结束，可以下发游戏奖励
					detailData.value.recDownVideo = false
				} else {
					// 播放中途退出，不下发游戏奖励
					uni.showToast({
						title: "请观看完广告~",
						icon: "error"
					})
				}
			})

		}
		db.collection('articleContent').doc(query.id).field({
			articleTitle: true,
			downTitle: true,
			downUrl: true,
			downKey: true,
			recDownVideo: true
		}).get().then(res => {
			detailData.value = res.data[0];
			loading.value = false;
		})
	})
	const posUrl = ref("pages/download/download?id=")

	const tapDownUrl = (i) => {
		let data, msg;
		if (i == 1) {
			data = detailData.value.fr_down_url;
			msg = "下载地址已复制"
		}
		if (i == 2) {
			data = detailData.value.fr_down_key;
			msg = "提取码已复制"
		}

		uni.setClipboardData({
			data,
			success: function(res) {
				uni.showToast({
					title: msg
				});
			}
		})
	}
	onShareAppMessage(() => {
		return {
			title: detailData.value.fr_down_title,

			path: '/pages/download/download?id=' + detailData.value._id
		}
	})

	// 文章分享盆友圈 目前支持安卓
	onShareTimeline(() => {
		return {
			title: detailData.value.fr_down_title,
			path: '/pages/download/download?id=' + detailData.value._id
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
		z-index: 1030;
		background-color: #f7f7f7;
	}

	.down-view-ruan {
		color: #23c1aa;
		margin-right: 14rpx;
	}

	.down-view-title-dscr {
		padding: 14rpx 36rpx 30rpx 46rpx;
		color: #B2B2B2;
		font-size: 24rpx;
	}

	.down-icon-list-btn {
		text-align: center;
		margin: 0;
		background-color: unset;
		padding: 0;
	}

	.down-li-toew {
		display: flex;
		margin-top: 60rpx;
		align-items: center;
		border-radius: 20rpx;
		justify-content: space-around;
	}

	.down-icon-list {
		text-align: center;
	}

	.down-icon-list-img {
		height: 60rpx;
		width: 60rpx;
		overflow: hidden;
		margin: auto;
	}

	.down-icon-list-img-title {
		font-size: 22rpx;
		color: #b1b1b1;
		margin-top: 12rpx;
	}

	.down-li-toew-ma {
		margin: 40rpx 0rpx 20rpx 0rpx;
	}

	/* 说明 */
	.que-user-red {
		color: red;
	}

	.list-btn {
		height: 50rpx;
		width: 160rpx;
		background-color: #007AFF;
		border-radius: 100rpx;
		text-align: center;
		color: #FFFFFF;
		line-height: 50rpx;
		bottom: 0rpx;
		position: absolute;
		right: 0;
	}

	/* 列表 */
	.list-li-left-describe {
		color: #D5D5D5;
		font-size: 26rpx;
		position: absolute;
		top: 0rpx;
		left: 0rpx;
	}

	.list-li-tag {
		color: #0BBDA6;
		font-size: 20rpx;
	}

	.list-li-left-h {
		font-size: 36rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.list-li-left {
		margin-left: 32rpx;
		flex-grow: 1;
		height: 120rpx;
		position: relative;
	}

	.list-img {
		height: 120rpx;
		width: 140rpx;
		border-radius: 14rpx;
		overflow: hidden;
		flex-shrink: 0;
	}

	.list-li {
		display: flex;
		margin-top: 60rpx;
		align-items: center;
		background-color: #fff;
		/* padding: 24rpx; */
		border-radius: 20rpx;
	}

	/* 百度网盘下载 */
	.down-btn {
		background-color: #007AFF !important;
		color: #FFFFFF !important;
		border-radius: 100rpx !important;
		width: 100%;
		margin: 0rpx 10rpx;
		font-size: 28rpx;
		line-height: 80rpx;
		height: 80rpx;
	}

	.down-btn-video {
		background-color: #007AFF !important;
		color: #FFFFFF !important;
		border-radius: 100rpx !important;
		width: 80%;
		margin: auto;
		font-size: 28rpx;
		line-height: 80rpx;
		height: 80rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 60rpx;
	}

	.down-btn-video-icon {
		height: 46rpx;
		width: 56rpx;
		margin-top: -6rpx;
		margin-right: 8rpx;
	}

	.down-btn-key {
		background-color: #23c1aa !important;
		color: #FFFFFF !important;
		border-radius: 100rpx !important;
		width: 100%;
		margin: 0rpx 10rpx;
		font-size: 28rpx;
		line-height: 80rpx;
		height: 80rpx;
	}

	.down-list-btn-text {
		font-size: 22rpx;
		color: #B2B2B2;
	}

	.down-list-btn {
		display: flex;
		align-items: center;
		margin-bottom: 10rpx;
		margin-top: 22rpx;
		overflow: hidden;
	}

	.down-network-icon {
		width: 150rpx;
		background-color: #EFEFEF;
		border-radius: 10rpx;
		height: 130rpx;
		margin-left: 20rpx;
		overflow: hidden;
		flex-shrink: 0;
		line-height: 130rpx;
		margin: auto;
	}

	.down-network-view {
		padding: 30rpx 0rpx;
		background-color: #EFEFEF;
		border-radius: 10rpx;
		padding: 30rpx;
		color: #B2B2B2;
		font-size: 24rpx;
		word-break: break-all;
	}

	.down-user-name {
		margin-left: 20rpx;
		font-size: 32rpx;
	}

	.down-user-img {
		height: 60rpx;
		width: 60rpx;
		overflow: hidden;
		border-radius: 200rpx;
	}

	.down-user {
		display: flex;
		align-items: center;
		margin-bottom: 20rpx;
		justify-content: flex-start;
		overflow: hidden;
	}

	.down-file {
		display: flex;
		justify-content: space-around;
		align-items: center;
		margin: 70rpx 0;
	}

	.down_file_icon {
		height: 44rpx;
		width: 44rpx;
		opacity: 0.5;
		overflow: hidden;
	}

	.down_file_icon_index {
		height: 80rpx;
		width: 80rpx;
		opacity: 1;
		overflow: hidden;
	}

	.down-file-txt {
		margin: 14rpx 0;
		font-size: 28rpx;
		color: #B2B2B2;
	}

	.self-user-updata {
		width: 50rpx;
		height: 50rpx;
		position: absolute;
		right: 76rpx;
	}

	/* 顶部图片 */
	.data-clerk-text-w {
		font-size: 24rpx;
		color: #b1b1b1;
	}

	.data-clerk-text-h {
		font-size: 40rpx;
		margin-bottom: 20rpx;
	}

	.data-clerk-text {
		width: 360rpx;
		position: absolute;
		top: 80rpx;
		left: 40rpx;
	}

	.data-clerk {
		width: 100%;
		height: 300rpx;
		position: relative;
	}

	.data-img {
		height: 300rpx;
		width: 360rpx;
		overflow: hidden;
		position: absolute;
		bottom: 0rpx;
		right: 0rpx;
	}

	/* 全局 */
	.titel-h {
		font-size: 34rpx;
		position: relative;
		margin-bottom: 10rpx;
	}

	/* .titel-h:after {
		content: '';
		position: absolute;
		bottom: -14rpx;
		left: 0px;
		width: 96rpx;
		height: 8rpx;
		border-radius: 200rpx;
		background: linear-gradient(90deg, rgba(55, 110, 234, 1) 0%, rgba(255, 255, 255, 1) 100%);
	} */

	.down-view-all {
		background-color: #FFFFFF;
		border-radius: 20rpx;
		padding: 38rpx;
		margin: 38rpx;
	}

	.fengrui-img {
		height: 100%;
		width: 100%;
	}

	page {
		background-color: #F7F7F7;
	}

	.centem-body {
		/* background-image: linear-gradient(#3482e2, #F7F7F7); */
	}

	button:after {
		border: 0px solid rgba(0, 0, 0, .2);

	}

	/* 暗黑模式下应用的样式 */
	@media (prefers-color-scheme: dark) {

		page,
		.data-login-flex {
			background: #161616;
		}

		.down-view-all,
		.account-view,
		.list-li {
			background-color: #202020;
		}

		.down-network-view,
		.account-btn,
		.down-network-icon {
			background-color: #797979;
		}
	}
</style>