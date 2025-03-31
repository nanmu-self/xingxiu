<template>
	<view class="page-ov">
		<view class="" v-if="categ_style">
			<view class="list-two-w">
				<view class="list-two-list">
					<view class="list-name">
						虚怀若谷
					</view>
					<view class="list-name-slug">
						兮其若朴，旷兮其若谷
					</view>
				</view>
				<view class="list-two-img">
					<image class="fengrui-img" src="https://unicdn.n-m.top/indexbg.svg" mode="aspectFill"></image>
				</view>
			</view>

			<!-- 专题滑动区域 -->
			<view class="swiper-list">
				<scroll-view class="scroll-view_H" scroll-x="true" show-scrollbar="false">
					<block v-for="(cate ,index) in classification" :key="index">
						<view class="swiperzhuanti" hover-class="fengrui-li-hover" v-if="cate.set_top"
							@click="goArticleList(cate._id)">
							<view class="scroll-h-name">
								<view class="scroll-ruan">
									<image class="fengrui-img" src="https://unicdn.n-m.top/icon/ruan.svg"
										mode="aspectFit">
									</image>
								</view>
								{{ cate.name }}
							</view>
							<view class="list-name-slug">
								{{ cate.described }}
							</view>
							<view class="list-name-slug">
								数量：{{ cate.count }}
							</view>
							<view class="scroll-zhuan-img">
								<image class="fengrui-img" style="Opacity:0.9" :src="cate.icon" mode="aspectFit">
								</image>
							</view>
						</view>
					</block>
				</scroll-view>
			</view>

			<view class="subject-view">
				<view class="subject-h">
					专题分类
				</view>
				<view class="subject-list-v">
					<view class="subject-list" hover-class="fengrui-li-hover" v-for="(cate ,index) in classification"
						:key="index" @click="goArticleList(cate._id)">
						<view class="subject-list-icon">
							<image class="fengrui-img" v-if="cate.icon != ''" :src="cate.icon"
								mode="aspectFit"></image>
							<image class="fengrui-img" v-else src="https://unicdn.n-m.top/icon/poster.svg"
								mode="aspectFit">
							</image>
						</view>
						<view class="subject-list-name">
							{{ cate.name }}
						</view>
					</view>
				</view>
			</view>

		</view>

		<!-- 二级分类 -->
		<block v-if="!categ_style">
			<view class="paren-img" style="height: 300rpx;">
				<image class="fengrui-img" src="https://unicdn.n-m.top/icon/category.svg" mode="aspectFill"></image>
			</view>

			<view class="scroll-flex">
				<scroll-view scroll-y="true" class="left-muen" :style="{height:(viewHeight - 170) + 'px',}">
					<block v-for="(cate ,index) in leftList" :key="index">
						<view :class="tapIndenx === index ? 'left_view_citve':'left_view'" @click="tapLeft(index)">
							{{cate.name}}
						</view>
					</block>
				</scroll-view>
				<scroll-view scroll-y="true" :style="{height:(viewHeight - 170) + 'px',}">
					<view class="right-view">
						<block v-for="(item,index) in rightList" :key="index">
							<view class="right-list" @click="goArticleList(item.id)">
								<view class="right-list-img">
									<image class="fengrui-img" :src="item.cation_img" mode="widthFix"></image>
								</view>
								<view class="right-list-name">
									{{item.name}}
								</view>
							</view>
						</block>
					</view>
				</scroll-view>
			</view>
		</block>
	</view>

	<!-- #ifdef MP-WEIXIN -->
	<!-- 关注微信公众号 -->
	<view class="account-view" v-if="publicConfig.public_follow != '' && categ_style">
		<view class="account-flex">
			<view class="account-img">
				<image class="fengrui-img" :src="publicConfig.public_logo" mode=""></image>
			</view>
			<view class="account-aout">
				<view class="account-name">
					{{ publicConfig.public_name }}
				</view>
			</view>
		</view>
		<view class="">
			<button hover-class="fengrui-blue-btn-lo-hover" class="account-btn" @click="accountTap()">关注</button>
		</view>
	</view>
	<!-- #endif -->
	<!-- 判断微信流量主 -->
	<!-- #ifdef MP-WEIXIN -->
		<block v-if="advertising.wx_video">
		<view class="" style="margin: 30rpx 30rpx;">
			<ad :unit-id="advertising.wx_video" ad-type="video" ad-theme="white"></ad>
		</view>
	</block>
	<!-- #endif -->
</template>

<script setup>
	import {
		ref
	} from 'vue';
	import {
		onLoad
	} from "@dcloudio/uni-app";
	import {
		useWxsetStore
	} from "@/stores/configured.js";
	import {
		storeToRefs
	} from 'pinia';

	const wxSet = useWxsetStore();
	const {
		categ_style,
		publicConfig,
		classification,
		advertising
	} = storeToRefs(wxSet);

	onLoad(() => {
		viewHeight.value = uni.getWindowInfo().windowHeight;
	})
	const viewHeight = ref(0)
	const tapIndenx = ref(0);
	const leftList = ref([{
		name: "分类1",
	}, {
		name: "分类2",
	}]);
	const rightList = ref([{
		id: "1",
		name: "二级1",
		cation_img: "https://unicdn.n-m.top/icon/ad_video.svg"
	}]);


	const categoryList = ref([{
		id: "1",
		xs_top: true,
		name: "软件",
		description: "描述",
		count: "6",
		cation_img: "https://unicdn.n-m.top/icon/ad_video.svg"
	}])

	const tapLeft = (i) => {
		tapIndenx.value = i;
	}
	const goArticleList = (id) => {
		console.log(id);
	}

	const accountTap = () => {
		uni.navigateTo({
			url: "/pages/follow/follow"
		})
	}
</script>

<style>
	/* 子分类 */
	.right-list-name {
		text-align: center;
		margin-top: 10rpx;
		font-size: 28rpx;
	}

	.right-list {
		width: 31%;
		flex-shrink: 0;
		margin: 30rpx 0rpx;
	}

	.right-list-img {
		height: 120rpx;
		width: 120rpx;
		overflow: hidden;
		border-radius: 10rpx;
		display: block;
		margin: auto;
	}

	.right-view {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-wrap: wrap;
	}

	.scroll-flex {
		display: flex;
	}

	.paren-img {
		height: 300rpx;
		margin: 30rpx;
		border-radius: 20rpx;
		overflow: hidden;
	}

	/* 左侧菜单 */
	.left-muen {
		width: 260rpx;
		height: 100%;
		border-radius: 20rpx;
		overflow: hidden;
		margin-left: 30rpx;
		background-color: #fff;
	}

	.left_view {
		background-color: #ffffff;
		height: 120rpx;
		flex-shrink: 0;
		width: 100%;
		font-size: 28rpx;
		text-align: center;
		line-height: 120rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
	}

	.left_view_citve {
		background-color: #FFFFFF;
		height: 120rpx;
		width: 100%;
		flex-shrink: 0;
		font-size: 28rpx;
		text-align: center;
		line-height: 120rpx;
		position: relative;
		color: #007AFF;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
	}

	.left_view_citve:before {
		content: ' ';
		height: 50rpx;
		width: 10rpx;
		border-radius: 0rpx 100rpx 100rpx 0rpx;
		background-color: #007AFF;
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
		height: 60rpx;
	}

	/* 模式1 */
	.scroll-h-name {
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.scroll-zhuan-img {
		width: 80rpx;
		height: 80rpx;
		position: absolute;
		right: 10rpx;
		bottom: 10rpx;
	}

	.swiperzhuanti:last-child {
		margin-right: 30rpx;
	}

	.scroll-ruan {
		height: 30rpx;
		width: 30rpx;
		border-radius: 200rpx;
		margin-right: 10rpx;
		margin-bottom: 6rpx;
	}

	.swiperzhuanti {
		width: 320rpx;
		padding: 30rpx;
		height: 140rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		display: inline-block;
		margin-left: 30rpx;
		position: relative;
	}

	.swiper-list {
		white-space: nowrap;
	}

	/* 关注微信公众号 */
	.account-aout {
		margin-left: 30rpx;
	}

	.account-btn {
		height: 60rpx;
		background-color: #007AFF;
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
		background-color: #FFFFFF;
		border-radius: 20rpx;
		height: 120rpx;
		margin: 30rpx 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 18rpx;
	}

	/* 星尘大图模式 */
	.list-big-cout {
		position: absolute;
		right: 30rpx;
		bottom: 30rpx;
		color: #807C7C;
		font-size: 20rpx;
	}

	.list-big-slug {
		font-size: 20rpx;
		color: #807C7C;
		margin: -20rpx 30rpx 30rpx 30rpx;

	}

	.list-big-h {
		font-size: 34rpx;
		margin: 30rpx;
	}

	.list-big-img {
		height: 260rpx;
		overflow: hidden;
		background-color: #000000;
		border-radius: 20rpx;
	}

	.list-big-view {
		position: relative;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		overflow: hidden;
		margin: 50rpx 30rpx;
	}

	/* 文章列表双排小图 */
	.subject-h {
		margin: 30rpx;
	}

	.subject-list-name {
		text-align: center;
		margin-top: 18rpx;
		font-size: 28rpx;
	}

	.subject-list-v {
		display: flex;
		/* justify-content: start; */
		align-items: center;
		flex-flow: wrap;
	}

	.subject-list {
		margin: 30rpx 0rpx;
		width: 228rpx;
		flex-shrink: 0;
	}

	.subject-list-icon {
		height: 80rpx;
		width: 80rpx;
		margin: auto;
		border-radius: 10rpx;

	}

	.subject-view {
		background-color: #FFFFFF;
		border-radius: 20rpx;
		margin: 30rpx 30rpx;
		overflow: hidden;
	}

	.list-two-abstract {
		color: #ADADAD;
		font-size: 24rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		margin-top: 14rpx;
	}

	.list-two-title {
		font-size: 30rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		margin-top: 26rpx;
	}

	.list-two-img {
		width: 250rpx;
		height: 250rpx;
		border-radius: 20rpx;
		/* overflow: hidden; */
		margin: -50rpx 50rpx 0rpx 50rpx;
		flex-shrink: 0;
	}

	.list-two-img-all {
		width: 260rpx;
		height: 130rpx;
		border-radius: 20rpx;
		overflow: hidden;
		flex-shrink: 0;
		margin-right: 50rpx;
	}

	.list-two-list {
		margin: 0rpx 50rpx;

	}

	.list-name {
		font-size: 38rpx;
		margin-bottom: 6rpx;

	}

	.list-name-slug {
		font-size: 20rpx;
		color: #807C7C;
		margin-bottom: 6rpx;

		margin-top: 16rpx;
	}

	.list-two-w {
		margin: 30rpx 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		/* overflow: hidden; */
		height: 220rpx;
	}

	/* 热评 */
	.review {
		background-color: #f9f9f9;
		padding: 32rpx;
		margin: 34rpx 30rpx;
		border-radius: 10rpx;
		color: #807C7C;
		font-size: 24rpx;
	}

	.status-ma40 {
		margin: 30rpx;
	}

	.fengrui-img {
		height: 100%;
		width: 100%;
	}

	.page-ov {
		overflow: hidden;
	}

	page {
		background-color: #F7F7F7;
	}

	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
	}

	/* 暗黑模式下应用的样式 */
	@media (prefers-color-scheme: dark) {

		page,
		.data-login-flex {
			background: #161616;
		}

		.left-muen,
		.left_view,
		.left_view_citve,
		.account-view,
		.subject-view,
		.swiperzhuanti,
		.list-two-w,
		.list-big-view {
			background: #202020;
		}
	}
</style>