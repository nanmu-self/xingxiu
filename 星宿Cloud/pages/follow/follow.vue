<template>
	<view class="follow-pos">
		<view class="follow-img">
			<image class="fengrui-img" show-menu-by-longpress="true" :src="publicConfig.public_follow"
				mode="widthFix" />
		</view>

		<view class="follow-title title">
			长按捕捉动态
		</view>
		<view class="follow-descr">
			最新动态最新知道，任何内容不错过
		</view>
	</view>
</template>

<script setup>
	import {
		onLoad
	} from "@dcloudio/uni-app"
	import {
		ref
	} from "vue";
	import {
		storeToRefs
	} from 'pinia';
	import {
		useWxsetStore
	} from "@/stores/configured.js";
	const wxSet = useWxsetStore();
	const {
		publicConfig
	} = storeToRefs(wxSet);
	onLoad(() => {

	})
</script>

<style>
	.follow-pos {
		position: absolute;
		width: 100%;
		top: 40%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.follow-img {
		height: auto;
		width: 66%;
		border-radius: 40rpx;
		border: 1px solid rgb(204, 204, 204);
		padding: 20rpx;
		margin: 200rpx auto 0rpx auto;

	}

	.follow-title {
		margin-top: 50rpx;
		text-align: center;
	}

	.follow-descr {
		text-align: center;
		font-size: 26rpx;
		color: #ADADAD;

	}
</style>