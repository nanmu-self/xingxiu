<template>
	<view v-if="newPost.length">
		<!-- 文章列表 -->
		<articleList :newPost="newPost"></articleList>
		<view class="no-list-data">
			--我的底线就到这里了--
		</view>
	</view>

	<!-- 没有内容 -->
	<view class="no-datalist" v-else>
		<view class="no-img">
			<image class="fengrui-img" src="http://unicdn.n-m.top/icon/data-no.svg" mode=""></image>
		</view>
		<view class="no-text">
			您搜索的世界不存在！或者和小姐姐跑了......
		</view>
	</view>

	<!-- 加载动画 -->
	<zero-loading v-if="loading" :maskDark="false" :showText="true" text="玩命加载中~~" :mask="true" :maskOpacity="1"
		:zIndex="999"></zero-loading>
</template>

<script setup>
	import {
		onLoad
	} from "@dcloudio/uni-app";
	import {
		ref
	} from "vue";
	const db = uniCloud.databaseForJQL();
	const newPost = ref([])
	const loading = ref(true)
	onLoad(async (e) => {
		console.log(e.keyword);
		if (e.keyword) {
			await search(e.keyword);
			loading.value = false;

		}
	})

	const search = async (str) => {
		let res = await db.collection('articleContent').where(`${new RegExp(str, 'i')}.test(articleTitle)`).limit(
			10).get();
		newPost.value = res.data;
	}
</script>

<style>
	/* 列表没有数据 */
	.no-list-data {
		text-align: center;
		margin: 30rpx 0px;
		color: #ADADAD;
	}

	/* 没有数据时候 */
	.no-text {
		color: #ADADAD;
		margin-top: 40upx;
		font-size: 30upx;
	}

	.no-img {
		border-radius: 20rpx;
		overflow: hidden;
		height: 600upx;
		width: 500upx;
	}

	.no-datalist {
		position: absolute;
		top: 40%;
		left: 50%;
		transform: translate(-50%, -50%);
	}


	/* 文章列表单排 */
	.list-one-time-n {
		color: #D3D3D3;
		font-size: 10px;
		height: 16upx;
		line-height: 16upx;
		margin-left: 8upx;
	}

	.list-ona-abstract {
		color: #ADADAD;
		font-size: 24upx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		margin-top: 16upx;
	}

	.list-one-title {
		font-size: 30upx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.list-one-data-w {
		margin: 28upx;
	}

	.list-one-img {
		height: 320upx;
		border-radius: 20upx;
		overflow: hidden;
	}

	.muen-sld-icon-display {
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.muen-sld-icon {
		height: 40upx;
		width: 40upx;
		display: block;
		margin-right: 4upx;
		flex-shrink: 0;
	}

	.list-one-w {
		/* box-shadow: 0px 6px 9px rgba(0, 0, 0, 0.16); */
		border-radius: 20upx;
		margin: 50upx 0upx;
		overflow: hidden;
		background-color: #FFFFFF;
	}

	.container {
		padding: 40upx;
	}

	.fengrui-img {
		height: 100%;
		width: 100%;
	}

	page {
		background-color: #F7F7F7;
		overflow-x: hidden;
	}

	/* 暗黑模式下应用的样式 */
	@media (prefers-color-scheme: dark) {
		page {
			background: #161616;
		}

		.list-one-w {
			border: 1px #191919 solid;
			background: #202020;
		}
	}
</style>