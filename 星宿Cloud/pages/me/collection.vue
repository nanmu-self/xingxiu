<template>
	<!-- 文章列表 -->
	<articleList :newPost="articleData"></articleList>

	<!-- 加载动画 -->
	<zero-loading v-if="loading" type="love" :maskDark="false" :showText="true" text="玩命加载中~~" :mask="true"
		:maskOpacity="1" :zIndex="999"></zero-loading>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	import {
		onLoad
	} from "@dcloudio/uni-app";
	import {
		userInfo
	} from "@/hooks/login.js"
	const db = uniCloud.databaseForJQL()

	const loading = ref(true);
	let articleData = ref([])

	onLoad(async () => {
		if(!userInfo.value._id) return;
		const favoritesTable = db.collection('user_favorites').where(`user_id=="${userInfo.value._id}"`)
			.getTemp() // 注意结尾的方法是getTemp，对order表过滤得到临时表
		const article = db.collection('articleContent').field(
			'releaseTime,articleHeaderImageUrl,articleTitle,set_top,downUrl,reatType,_id').getTemp()
		let res = await db.collection(favoritesTable, article).limit(10).get();

		res.data.forEach(item => {
			articleData.value.push(...item.article_id);
		})
		loading.value = false;

	})
</script>

<style>
	page {
		background-color: #F7F7F7;
		overflow-x: hidden;
	}

</style>