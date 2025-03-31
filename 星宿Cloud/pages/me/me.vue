<template>
	<!-- 顶部图片 -->
	<view class="top-img">
		<image class="fengrui-img" src="https://unicdn.n-m.top/icon/bg15.svg" mode="aspectFill"></image>
	</view>
	<view class="sel-over-w">
		<!-- 头像 -->
		<view class="self-w">

			<view class="self-user-img">
				<button style="width: 120rpx;height: 120rpx;" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
					<image class="fengrui-img" :src="userInfo.avatar" mode="aspectFill"></image>
				</button>
			</view>

			<view class="self-user-info">
				<input @blur="nameBlur" type="nickname" @input="onKeyInput" class="self-user-info-name"
					:placeholder="userInfo.nickname" />
				<view class="self-user-info-describe">
					{{share_title}}
				</view>
			</view>
		</view>

		<!-- me-svg -->
		<view class="me-svg">
			<!-- <button class="me-sbg-btn" hover-class="fengrui-li-hover" @click="allTag()">
				<view class="Vajra-list-img">
					<image class="fengrui-img" src="https://unicdn.n-m.top/icon/star.svg" mode="aspectFill"></image>
				</view>
				<view class="Vajra-list-font">
					知识星球
				</view>
			</button> -->
			<button class="me-sbg-btn" hover-class="fengrui-li-hover" v-if="publicConfig.public_follow"
				@click="popupSever()">
				<view class="Vajra-list-img">
					<image class="fengrui-img" src="https://unicdn.n-m.top/icon/poster.svg" mode="aspectFill"></image>
				</view>
				<view class="Vajra-list-font">
					关注官方
				</view>
			</button>
			<button class="me-sbg-btn" hover-class="fengrui-li-hover" open-type="contact" send-message-title="个人中心"
				send-message-path="pages/me/me" show-message-card="true">
				<view class="Vajra-list-img">
					<image class="fengrui-img" src="https://unicdn.n-m.top/icon/customer.svg" mode="aspectFill"></image>
				</view>
				<view class="Vajra-list-font">
					咨询客服
				</view>
			</button>
		</view>
	</view>

	<!-- 判断微信流量主 -->
	<!-- #ifdef MP-WEIXIN -->
	<block v-if="advertising.wx_video">
		<view class="" style="margin: 30rpx 30rpx;">
			<ad :unit-id="advertising.wx_video" ad-type="video" ad-theme="white"></ad>
		</view>
	</block>
	<!-- #endif -->

	<!-- 功能列表 -->
	<view class="metergasis">

		<view class="metergasis-li" hover-class="fengrui-li-hover" @click="shoucangBtn">
			<view class="metergasis-li-img">
				<image class="fengrui-img" src="https://unicdn.n-m.top/icon/collection.svg" mode="aspectFill">
				</image>
			</view>
			<view class="metergasis-li-h">
				我的收藏
			</view>
			<view class="metergasis-li-rgth">
				<image class="fengrui-img" src="https://unicdn.n-m.top/icon/more.svg" mode=""></image>
			</view>
		</view>

		<view class="metergasis-li" hover-class="fengrui-li-hover" @click="clearTap()">
			<view class="metergasis-li-img">
				<image class="fengrui-img" src="https://unicdn.n-m.top/icon/cache.svg" mode="aspectFill"></image>
			</view>
			<view class="metergasis-li-h">
				清除缓存
			</view>
			<view class="metergasis-li-rgth">
				<image class="fengrui-img" src="https://unicdn.n-m.top/icon/more.svg" mode=""></image>
			</view>
		</view>

		<view class="metergasis-li" hover-class="fengrui-li-hover" @click="abouTap">
			<view class="metergasis-li-img">
				<image class="fengrui-img" src="https://unicdn.n-m.top/icon/about.svg" mode="aspectFill"></image>
			</view>
			<view class="metergasis-li-h">
				关于我们
			</view>
			<view class="metergasis-li-rgth">
				<image class="fengrui-img" src="https://unicdn.n-m.top/icon/more.svg" mode=""></image>
			</view>
		</view>
	</view>

</template>

<script setup>
	import {
		onLoad
	} from "@dcloudio/uni-app"
	import {
		storeToRefs
	} from 'pinia';
	import {
		useWxsetStore
	} from "@/stores/configured.js";
	import {
		ref
	} from 'vue';
	import {
		ifLogin,
		userInfo
	} from "@/hooks/login.js"
	const wxSet = useWxsetStore();
	const {
		publicConfig,
		share_title,
		advertising
	} = storeToRefs(wxSet);
	const db = uniCloud.database();
	
	const popupSever=()=>{
		uni.navigateTo({
			url: '/pages/follow/follow'
		})
	}


	onLoad(async () => {
		ifLogin();
		console.log(userInfo.value);
	})

	const shoucangBtn = () => {
		if (userInfo.value.openid) {
			uni.navigateTo({
				url: "./collection"
			})
		} else {
			ifLogin();
		}
	}




	const abouTap = () => {
		uni.navigateTo({
			url: "/pages/about/about"
		})
	}
	let nickname = ref("")
	const onKeyInput = (e) => {
		nickname.value = e.detail.value

	}
	//提交用户名
	const nameBlur = (e) => {
		if (!userInfo.value.openid) {
			ifLogin();
			return;
		}
		setTimeout(async () => {
			console.log(nickname.value);
			let res = await db.collection('wx_user').where({
				openid: userInfo.value.openid
			}).update({
				nickname: nickname.value
			});
			userInfo.value.nickname = nickname.value
		}, 100)
	}

	function getFileExtension(url) {

		const parts = url.split('.');
		if (parts.length > 1) {
			return parts.pop();
		}
		return ''; // 如果没有后缀名，返回空字符串
	}
	//设置头像
	const onChooseAvatar = async (e) => {
		if (!userInfo.value.openid) {
			ifLogin();
			return;
		}

		const {
			detail
		} = e;

		uni.showLoading({
			title: "上传中...",
			mask: true
		});
		const uniCloudStorageExtCo = uniCloud.importObject("upImage");
		const uploadFileOptionsRes = await uniCloudStorageExtCo.getUploadFileOptions({
			cloudPath: `avatarUrl/${Date.now()}.${getFileExtension(detail.avatarUrl)}`, // 支持自定义目录
		});
		const uploadTask = uni.uploadFile({
			...uploadFileOptionsRes.uploadFileOptions, // 上传文件所需参数
			filePath: detail.avatarUrl, // 本地文件路径
			success: () => {
				const res = {
					cloudPath: uploadFileOptionsRes.cloudPath, // 文件云端路径
					fileID: uploadFileOptionsRes.fileID, // 文件ID
					fileURL: uploadFileOptionsRes
						.fileURL, // 文件URL（如果是私有权限，则此URL是无法直接访问的）
				};
				// 数据库里可直接保存 fileURL 或 fileID
				console.log("上传成功", res.fileURL);
				setAvatar(res.fileURL)
			},
			fail: (err) => {
				console.log("上传失败", err);
			}
		});
		// 监听上传进度
		uploadTask.onProgressUpdate((res) => {
			console.log("监听上传进度", res);
		});
		uni.hideLoading();
	}

	const setAvatar = async (url) => {
		let res = await db.collection('wx_user').where({
			openid: userInfo.value.openid
		}).update({
			avatar: url
		});
		userInfo.value.avatar = url
	}

	//清除缓存
	const clearTap = () => {
		uni.clearStorageSync();
		uni.clearStorage();
		uni.showModal({
			title: '提示',
			content: '清理成功',
			success: function(res) {
				if (res.confirm) {
					uni.switchTab({
						url: '/pages/index/index'
					})
				}
			}
		})

	}
</script>

<style>
	/* 顶部图片 */
	.top-img {
		width: 100%;
		height: 340rpx;
		overflow: hidden;
	}


	.feng-img {
		height: 100%;
		margin: auto;
		display: block;
	}

	.titel-h {
		font-size: 38rpx;
		margin: 30rpx 0rpx;
		position: relative;
	}

	.titel-h:after {
		content: '';
		position: absolute;
		bottom: -14rpx;
		left: 0px;
		width: 96rpx;
		height: 8rpx;
		border-radius: 200rpx;
		background: linear-gradient(90deg, rgba(55, 110, 234, 1) 0%, rgba(255, 255, 255, 1) 100%);
	}

	/* 功能列表 */
	.metergasis-li-rgth {
		width: 50rpx;
		height: 50rpx;
		overflow: hidden;
		flex-shrink: 0;
		position: absolute;
		right: 0rpx;
		top: 50%;
		transform: translate(0%, -50%);
	}

	.metergasis-li-h {
		grid-row: 1;
		margin-left: 30rpx;
		font-size: 30rpx;
	}

	.metergasis-li-img {
		height: 52rpx;
		width: 52rpx;
		border-radius: 100rpx;
		flex-shrink: 0;
	}

	.metergasis-li {
		padding: 24rpx 32rpx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		position: relative;
	}

	.metergasis {
		background-color: #FFFFFF;
		border-radius: 16rpx;
		margin: 48rpx 0rpx;
		padding: 2rpx;
		margin: 30rpx;
	}

	/* me-svg */
	.Vajra-list-font {
		color: #807C7C;
		font-size: 20rpx;
	}

	.Vajra-list-img {
		height: 60rpx;
		width: 60rpx;
		overflow: hidden;
		margin: auto;
	}

	.me-sbg-btn {
		flex-shrink: 0;
		justify-content: center;
		align-items: center;
		width: 25%;
		padding: 14rpx 0rpx;
	}

	.me-svg {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-radius: 16rpx;
		margin-bottom: 20rpx;
	}

	/* 流量主广告或者图片 */
	.me-ads {
		border-radius: 18rpx;
		margin: 48rpx 0rpx;
		overflow: hidden;
		margin: 30rpx;
	}

	/* 头像 */
	.self-user-updata {
		width: 50rpx;
		height: 50rpx;
		position: absolute;
		right: 48rpx;
	}

	.self-user-info-describe {
		color: #807C7C;
		font-size: 24rpx;
		margin-top: 18rpx;
	}

	.self-user-info-name {
		font-size: 46rpx;
		flex-grow: 1;
	}

	.self-user-info {
		margin: 0rpx 24rpx;
	}

	.self-user-img {
		height: 120rpx;
		width: 120rpx;
		border-radius: 100rpx;
		overflow: hidden;
		flex-shrink: 0;
	}

	.self-w {
		display: flex;
		justify-content: flex-start;
		padding: 48rpx 26rpx;
		align-items: flex-end;
		overflow: hidden;
		position: relative;
	}

	.sel-over-w {
		overflow: hidden;
		background-color: #FFFFFF;
		margin: 0rpx 28rpx;
		border-radius: 16rpx;
	}

	/* 全局 */
	.center {
		margin: 48rpx;
	}

	page {
		background-color: #f7f7f7;
		overflow-x: hidden;
	}

	.fengrui-img {
		height: 100%;
		width: 100%;
	}

	button {
		padding-left: 0rpx;
		padding-right: 0rpx;
		background-color: #FFFFFF;
	}

	.button-hover {
		background-color: #FFFFFF !important;
	}

	button::after {
		border: 0px solid rgba(0, 0, 0, .2);

	}

	/* 暗黑模式下应用的样式 */
	@media (prefers-color-scheme: dark) {
		page {
			background: #161616;
		}

		.sel-over-w,
		.self-w,
		.metergasis,
		.me-svg,
		.me-sbg-btn,
		button {
			background-color: #202020;
		}
	}
</style>