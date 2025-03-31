<template>
	<view>
		<web-view :src="weatl"></web-view>
	</view>
</template>

<script setup>
	import {
		onLoad
	} from "@dcloudio/uni-app";
	import {
		ref
	} from "vue";
	const weatl = ref("")
	onLoad((options) => {

		if (options.type != undefined) {
			var datas = JSON.parse(decodeURIComponent(options.url))
			weatl.value = datas
		} else {
			weatl.value = options.aurl
		}
	})
</script>

<style>

</style>