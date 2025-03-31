<template>
	<view style="margin: 20rpx 30rpx;">
		<block v-for="(item,index) in newPost" :key="index" v-if="index_style != 3">
			<!-- / 左图右文 -->
			<view class="menu-scroll-list" hover-class="fengrui-li-hover" @click="newPostTap(item)"
				v-if="index_style == 1 || index_style == ''">
				<view class="menu-scroll-list-img" v-if=" item.articleHeaderImageUrl">
					<image class="fengrui-img" :src="item.articleHeaderImageUrl" mode="aspectFill"></image>
				</view>
				<view class="menu-scroll-list-right">
					<view class="menu-scroll-list-h">
						{{ item.articleTitle }}
					</view>
					<view class="muen-sld-icon-display">
						<image v-if="item?.content?.protected == true" class="muen-sld-icon"
							src="https://unicdn.n-m.top/icon/protected.svg" mode=""></image>
						<image v-if="item.fr_videp_if == '1'" class="muen-sld-icon"
							src="https://unicdn.n-m.top/icon/ad_video.svg" mode=""></image>
						<image v-if="item.downUrl" class="muen-sld-icon"
							src="https://unicdn.n-m.top/icon/down.svg" mode=""></image>
					</view>
					<view class="menu-scroll-list-describe">
						<view>{{convertTimestampToDateTime(item.releaseTime)  }}</view>
					</view>
				</view>
			</view>

			<!-- / 大图模式 -->
			<view class="list-one-w" hover-class="fengrui-li-hover" @click="newPostTap(item)" v-if="index_style == 2">
				<view class="list-one-img" v-if=" item.articleHeaderImageUrl ">
					<image class="fengrui-img" mode="aspectFill" :src="item.articleHeaderImageUrl"></image>
				</view>
				<view class="list-one-data-w">
					<view class="muen-sld-icon-display" style="margin-bottom: 6rpx;">
						<image v-if="item?.content?.protected == true" class="muen-sld-icon"
							src="https://unicdn.n-m.top/icon/protected.svg" mode=""></image>
						<image v-if="item.fr_videp_if == '1'" class="muen-sld-icon"
							src="https://unicdn.n-m.top/icon/ad_video.svg" mode=""></image>
						<image v-if="item.downUrl " class="muen-sld-icon"
							src="https://unicdn.n-m.top/icon/down.svg" mode=""></image>
					</view>
					<view class="list-one-title">
						{{ item.articleTitle}}
					</view>
					<view class="list-ona-abstract">
					</view>
				</view>
			</view>
			<block v-if="advertising.wx_video != ''">
				<view style="width: 100%;">
					<ad v-if="(index +1) % 5 == 0" :unit-id="advertising.wx_video" ad-type="video" ad-theme="white">
					</ad>
				</view>
			</block>
		</block>

		<!-- 双排列表 -->
		<view class="lists-flex" v-if="index_style == 3">
			<block v-for="(item,index) in newPost" :key="index">
				<view class="lists-item" @click="newPostTap(item)">
					<view class="lists-img" v-if=" item.articleHeaderImageUrl">
						<image class="fengrui-img" :src="item.articleHeaderImageUrl" mode="aspectFill" />
					</view>
					<view class="lists-title">
						{{ item.articleTitle}}
					</view>
					<view class="swiper-tag-view" style="margin: 10rpx;">
						<image v-if="item?.content?.protected == true" class="muen-sld-icon"
							src="https://unicdn.n-m.top/icon/protected.svg" mode=""></image>
						<image v-if="item.fr_videp_if == '1'" class="muen-sld-icon"
							src="https://unicdn.n-m.top/icon/ad_video.svg" mode=""></image>
						<image v-if="item.downUrl" class="muen-sld-icon"
							src="https://unicdn.n-m.top/icon/down.svg" mode="">
						</image>
					</view>
				</view>
				<block v-if="advertising.wx_video != ''">
					<ad v-if="(index +1) % 6 == 0" :unit-id="advertising.wx_video" style="margin-bottom: 30rpx;" ad-type="video" />
				</block>
			</block>
		</view>
	</view>

</template>


<script setup>
	import {convertTimestampToDateTime} from "@/hooks/common.js"
	import {
		storeToRefs
	} from 'pinia';
	import {
		useWxsetStore
	} from "@/stores/configured.js";
	const wxSet = useWxsetStore();
	const {
	index_style,advertising
	} = storeToRefs(wxSet);
	
	const props = defineProps({
		newPost: {
			type: Array,
			default: []
		},
	})


	const newPostTap = (e) => {
		console.log(e);
		switch (String(e.reatType)) {
			case '':
				uni.navigateTo({
					url: "/pages/articleDetails/articleDetails?id=" + e.id
				})
				break;
			case '0':

				uni.navigateTo({
					url: "/pages/articleDetails/articleDetails?id=" + e._id
				})
				break;
			case '1':
				uni.navigateTo({
					url: '../weblist/weblist?aurl=' + e.account_url
				});
				break;
			case '2':
				uni.navigateTo({
					url: '../download/download?id=' + e.id
				});
				break;
			case '3':
				uni.openChannelsActivity({
					finderUserName: e.wxvideo_id,
					feedId: e.wxvideo_feedid,
					success: (res) => {},
					fail: (err) => {
						console.log(err)
					}
				})
				break;
			case '4':
				const aid = e.bz_video_av
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
			case '5':
				uni.navigateTo({
					url: '../wall/wall?id=' + e.id
				});
				break;
			case '6':
				uni.navigateTo({
					url: '../wall/wall?id=' + e.id
				});
				break;
		}
	}
</script>


<style>
	/* 资源，文档列表 */
	.lists-flex {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		padding-bottom: 28rpx;
	}

	.lists-item {
		border-radius: 20rpx;
		width: 48.5%;
		background-color: #fff;
		flex-shrink: 0;
		margin-bottom: 28rpx;
	}

	.lists-hot {
		display: inline;
		font-size: 28rpx;
	}

	.lists-title {
		margin: 20rpx 10rpx;
		font-size: 30rpx;
		height: 80rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.lists-img {
		height: 260rpx;
		width: 100%;
		border-radius: 20rpx;
		margin-bottom: 10rpx;
		overflow: hidden;
	}

	/* 首页分类样式2 */
	.list-one-time-n {
		color: #D3D3D3;
		font-size: 10px;
		height: 16rpx;
		line-height: 16rpx;
		margin-left: 8rpx;
	}



	.list-one-time-l {
		height: 18rpx;
		width: 30rpx;
		border-radius: 50rpx;
		background: linear-gradient(90deg, rgba(67, 130, 235, 1) 0%, rgba(6, 189, 254, 1) 100%);
	}

	.list-one-time-y {
		height: 18rpx;
		width: 30rpx;
		border-radius: 50rpx;
		background: linear-gradient(90deg, rgba(12, 185, 162, 1) 0%, rgba(15, 236, 210, 1) 100%);
	}

	.list-one-time {
		display: flex;
		margin-top: 18rpx;
		margin-left: 18rpx;

	}

	.list-one-qu {
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}

	.list-ona-abstract {
		color: #ADADAD;
		font-size: 24rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		margin-top: 2rpx;
	}

	.list-one-title {
		font-size: 28rpx;
		border-radius: 0rpx 0rpx 20rpx 20rpx;
		margin-top: -10rpx;
		padding: 10rpx 0rpx;
	}

	.list-one-title-two {
		font-size: 30rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.list-one-data-w {
		margin: 28rpx;
	}

	.list-one-img {
		height: 320rpx;
		border-radius: 20rpx;
		overflow: hidden;
		margin: 30rpx;
	}

	.list-one-w {
		/* box-shadow: 0px 6px 9px rgba(0, 0, 0, 0.16); */
		border-radius: 20rpx;
		margin: 40rpx 0rpx;
		overflow: hidden;
		background-color: #FFFFFF;
	}

	/* 内容数据 */
	.menu-scroll-list-describe {
		color: #ADADAD;
		font-size: 20rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
	}

	.list-li-tag {
		color: #0BBDA6;
		font-size: 20rpx;
	}

	.muen-sld-icon-display {
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.muen-sld-icon {
		height: 40rpx;
		width: 40rpx;
		display: block;
		margin-right: 4rpx;
		flex-shrink: 0;
	}

	.menu-scroll-list-h {
		font-size: 26rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.menu-scroll-list-right {
		margin-left: 32rpx;
		width: 420rpx;
		display: flex;
		justify-content: space-between;
		flex-flow: column;
	}

	.menu-scroll-list-img {
		width: 360rpx;
		height: 180rpx;
		border-radius: 16rpx;
		overflow: hidden;
	}

	.menu-scroll-list {
		display: flex;
		padding: 30rpx;
		background-color: #FFFFFF;
		margin: 30rpx 0rpx;
		border-radius: 20rpx;
	}

	.postlist-bg {
		border-radius: 20rpx;
		overflow: hidden;
		margin: 0rpx 30rpx;
	}

	/* 暗黑模式下应用的样式 */
	@media (prefers-color-scheme: dark) {

		page,
		.menu_scroll_top {
			background: #161616;
		}

		.scroll-view-item-list {
			border: 1px #191919 solid;
		}

		.menu_scroll_top_tow,
		.menu-scroll-list,
		.scroll-view-item-list,
		.Vajra-bg,
		.lists-item {
			background: #202020;
		}

		.list-one-w {
			border: 1px #191919 solid;
			background: #202020;
		}

		.poster {
			border-top: #000000 1px solid;
		}

		.list-one-title,
		.titel-vi-font {
			color: #989898;
		}
	}
</style>