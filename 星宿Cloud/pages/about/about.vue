<template>
	<view class="center">
		<!-- 顶部图片 -->
		<view class="about-w">
			<image class="fengrui-img" :src="nm_logo" mode="aspectFit"></image>
		</view>

		<!-- 标题 -->
		<view class="data-h ma-top">
			{{ share_title}}
		</view>

		<!-- 标语 -->
		<view class="data-ad-Reading">
			晚点遇见吧！你刚好成熟我刚好温柔
		</view>
		<view class="data-view">
			<view class="data-font">
				<mp-html :tag-style="tag_style" :content="content" :container-style="container_style" />
			</view>
		</view>

		<view class="data-ad-Reading" style="text-align: center;">
			楠木宝库
		</view>
	</view>
</template>

<script setup>
	import {
		storeToRefs
	} from 'pinia';
	import {
		useWxsetStore
	} from "@/stores/configured.js";
import { ref } from 'vue';
	const wxSet = useWxsetStore();
	const {
		share_title,nm_logo
	} = storeToRefs(wxSet);
	let tag_style = {
		h1: 'border-top:1px solid rgb(0 0 141 / 12%);margin:48px 0 16px;padding-top:24px;letter-spacing:-.02em;line-height:32px',
		h2: 'border-top:1px solid rgb(0 0 141 / 12%);margin:48px 0 16px;padding-top:24px;letter-spacing:-.02em;line-height:32px',
		h3: 'border-top:1px solid rgb(0 0 141 / 12%);margin:48px 0 16px;padding-top:24px;letter-spacing:-.02em;line-height:32px',
		h4: 'lborder-top:1px solid rgb(0 0 141 / 12%);margin:48px 0 16px;padding-top:24px;letter-spacing:-.02em;line-height:32px',
	}
	let container_style = 'font-size:15px;overflow-x: hidden;line-height:30px;letter-spacing:1px';
	
	const content=ref("关于我们")
</script>

<style>
	/* 内容 */
	.data-view {
		margin: 48rpx 0rpx;
		font-size: 28rpx;
		line-height: 60rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		padding: 20rpx 30rpx;
	}

	/* 标语 */
	.data-ad-Reading {
		font-size: 24rpx;
		color: #8d9090;
		margin-top: 10rpx;
	}

	/* 标题 */
	.ma-top {
		margin-top: 60rpx;
	}

	.data-h {
		font-size: 36rpx;
		position: relative;

	}

	/* 顶部图片 */
	.about-w {
		height: 320rpx;
		width: 100%;
		position: relative;
		border-radius: 20rpx;
		overflow: hidden;
		box-shadow: #dcdcdc 2rpx 6rpx 12rpx;
	}


	/* 全局 */
	.center {
		margin: 28rpx;
	}

	.fengrui-img {
		height: 100%;
		width: 100%;
	}

	page {
		background-color: #F7F7F7;
	}

	/* 暗黑模式下应用的样式 */
	@media (prefers-color-scheme: dark) {
		page {
			background: #161616;
		}

		.data-view {
			background-color: #202020;
		}

		.author {
			font-size: 20rpx;
			color: #484848;
			text-align: center;
			color: rgba(201, 201, 201, 1);
		}
	}
</style>