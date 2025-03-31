<template>
	<view class="centem-body">
		<!-- 自定义状态栏 -->
		<view class="nav-view">
			<view class="nav-icon" @click="tarBlack()">
				<image class="fengrui-img" src="https://unicdn.n-m.top/icon/back-icon.svg" mode="aspectFit"></image>
			</view>
			<view class="nav-title">微信红包</view>
		</view>
		<!-- 滚动案例区 -->
		<swiper class="swiper-wall" easing-function="easeInOutCubic" :current="swipreIndex" @change="bindChange"
			:next-margin="imgUrls.length > 1 ? '30px' : '0px'" :previous-margin="imgUrls.length > 1 ? '30px' : '0px'">
			<block v-for="(item, index) in imgUrls" :key="index">
				<swiper-item class="swiper-wall-item">
					<view class="swiper-wall-list-img">
						<!-- 图片 -->
						<image :src="item" class="fengrui-img-wall" mode="widthFix" />
					</view>
				</swiper-item>
			</block>
		</swiper>

		<!-- 背景 -->
		<view class="wall-bg-left"></view>
		<view class="wall-bg-right"></view>

		<!-- 下载组建 -->
		<view class="wall-flex">
			<button class="" open-type="share">
				<view class="wall-radus wall-share">
					<image class="wall-radus-img" src="https://unicdn.n-m.top/icon/share.svg" mode=""></image>
				</view>
				<view class="wall-radus-font"> 分享好友 </view>
			</button>
			<!-- <button class="" v-if="fr_down_url != ''" @click="sevePhto('zip')">
						<view class="wall-radus wall-url">
							<image class="wall-radus-img"
								:src="isShow ?'/static/data/ad_video.svg':'../../static/data/Appendixes.svg'" mode=""></image>
						</view>
						<view class="wall-radus-font">
							{{isShow ?'广告保存':'打包保存' }}
						</view>
					</button> -->
			<button class="" @click="sevePhto('img')">
				<view class="wall-radus wall-down">
					<image class="wall-radus-img" :src="
              isShow
                ? 'https://unicdn.n-m.top/icon/ad_video.svg'
                : 'https://unicdn.n-m.top/icon/wx_video_icon.svg'
            " mode="">
					</image>
				</view>
				<view class="wall-radus-font">
					{{ isShow ? "广告获取" : "获取封面" }}
				</view>
			</button>
			<!-- 	<button class="" @click="sevePhto('img')" v-if="pos_read == '5'">
						<view class="wall-radus wall-down">
							<image class="wall-radus-img"
								:src="isShow ? '/static/data/ad_video.svg' : '../../static/data/down.svg'" mode="">
							</image>
						</view>
						<view class="wall-radus-font">
							{{isShow?'广告保存':'保存壁纸' }}
						</view>
					</button> -->
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from "vue";
	import {
		onLoad
	} from "@dcloudio/uni-app";
	const fr_down_url = ref(
		"https://weixinredpacket.wxqcloud.qq.com/red2022/11/2/431.jpg"
	);
	const pos_read = ref(6);
	const statusBarHeight = ref(0);
	const swipreIndex = ref(0);
	const isShow = ref(true);
	const imgUrls = ref([
		"https://weixinredpacket.wxqcloud.qq.com/red2022/8/1/346.jpg",
		"https://weixinredpacket.wxqcloud.qq.com/red2022/11/2/431.jpg",
	]);
	const bindChange = () => {};
	onLoad(() => {
		statusBarHeight.value = uni.getWindowInfo().statusBarHeight;
	});
	const tarBlack = () => {
		uni.navigateBack()
	}
</script>

<style>
	/* 弹窗 */
	.privac-x {
		height: 80rpx;
		width: 80rpx;
		position: absolute;
		right: 4%;
		top: 5%;
		z-index: 999;
	}

	.privacy-bg {
		position: fixed;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		background: rgba(0, 0, 0, 0.5);
		z-index: 9999999;
	}

	.privacy-view {
		position: absolute;
		animation: mymove 0.6s infinite;
		animation-iteration-count: 1;
		animation-fill-mode: forwards;
		left: 50%;
		transform: translate(-50%, 0%);
		width: 85%;
		padding: 40rpx;
		background-color: #ffffff;
		border-radius: 40rpx;
	}

	.privacy-title {
		margin: 40rpx auto;
		text-align: center;
		font-size: 36rpx;
		font-weight: bold;
	}

	.privac-text {
		background-color: #f2f2f2;
		color: #adadad;
		padding: 30rpx;
		font-size: 26rpx;
		margin: 14rpx;
		border-radius: 20rpx;
		text-align: justify;
	}

	.privacy-link {
		color: #07c160;
		line-height: 40rpx;
	}

	.privac-btn {
		background-color: black;
		color: #ffffff;
		width: 80%;
		text-align: center;
		border-radius: 100rpx;
		margin: 30rpx 10%;
		padding: 15rpx;
	}

	.privac-no {
		text-align: center;
		margin-top: 30rpx;
		color: #666;
		font-size: 26rpx;
	}

	@keyframes mymove {
		from {
			bottom: -20%;
		}

		to {
			bottom: 4%;
		}
	}

	/* 背景颜色 */
	.wall-bg-left {
		opacity: 1;
		background: #99c2ff;
		filter: blur(360rpx);
		position: absolute;
		left: -40rpx;
		bottom: 200rpx;
		width: 480rpx;
		height: 480rpx;
	}

	.wall-bg-right {
		position: absolute;
		right: -40rpx;
		top: 100rpx;
		width: 480rpx;
		height: 480rpx;
		opacity: 1;
		background: #ff9999;
		filter: blur(360rpx);
	}

	/* 下载组建 */
	.wall-flex {
		display: flex;
		align-items: center;
		justify-content: space-around;
		width: 100%;
		position: fixed;
		bottom: 60rpx;
		left: 0;
	}

	.wall-share {
		background: rgba(255, 202, 58, 0.2);
	}

	.wall-down {
		background: rgba(58, 104, 255, 0.2);
	}

	.wall-url {
		background: rgba(255, 58, 153, 0.2);
	}

	.wall-radus {
		height: 120rpx;
		width: 120rpx;
		border-radius: 200rpx;
		position: relative;
	}

	.wall-radus-img {
		height: 70rpx;
		width: 70rpx;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.wall-radus-font {
		font-size: 28rpx;
		margin-top: 20rpx;
		text-align: center;
	}

	/* .案例区 */
	.swiper-h {
		margin-top: 50rpx;
		padding: 36rpx;
	}

	.swiper-title {
		font-size: 60rpx;
		font-weight: bold;
	}

	.swiper-desrc {
		margin: 40rpx auto;
		font-size: 26rpx;
	}

	.swiper-wall {
		height: 70%;
		width: 100%;
		top: 12%;
		left: 0;
		position: absolute;
		z-index: 2;
	}

	.swiper-wall-list-img {
		height: 100%;
		width: 100%;
		overflow: hidden;
		margin: auto;
		position: relative;
		border-radius: 60rpx;
	}

	.swiper-wall-item {
		height: 100%;
		width: 90% !important;
		padding: 0 5%;
	}

	.wallcover-fixed {
		position: fixed;
		bottom: 40rpx;
		width: 100%;
		overflow: hidden;
	}

	.wallcover-title {
		margin: 36rpx;
		text-align: center;
		font-weight: bold;
	}

	.wallcover-title-desrc {
		margin: 0 36rpx;
		color: #adadad;
		font-size: 26rpx;
	}

	.wallcover-flex {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		margin-top: 40rpx;
	}

	.fengrui-img-wall {
		height: 100%;
		width: 100%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		border-radius: 60rpx;
	}

	.wallcover-btn {
		background-color: #fff4e0 !important;
		color: #fec009 !important;
	}

	.wall-video {
		height: 100%;
		width: 100%;
	}

	.wall-video-cover {
		border-radius: 60rpx;
		overflow: hidden;
		width: 100%;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
	}

	.detail-btn {
		width: 44% !important;
		margin: 0rpx auto 30rpx auto;
	}

	/* .自定义状态栏 */
	.nav-view {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		display: flex;
		align-items: center;
		height: 88rpx;
		padding-top: v-bind(statusBarHeight + "px");
		position: relative;
	}

	.nav-icon {
		height: 70rpx;
		width: 70rpx;
		margin-left: 30rpx;
		display: flex;
		align-items: center;
		position: absolute;
		left: 0;
		z-index: 1;
	}

	.nav-title {
		width: 100%;
		text-align: center;
		line-height: 88rpx;
	}

	/* 全局 */
	page,
	.centem-body {
		width: 100%;
		height: 100%;
	}

	button {
		background-color: unset !important;
	}

	button:after {
		border: 0px solid rgba(0, 0, 0, 0.2);
	}

	/* 暗黑模式下应用的样式 */
	@media (prefers-color-scheme: dark) {
		.privacy-view {
			background: #161616;
		}

		.privac-text {
			background: #202020;
		}
	}
</style>