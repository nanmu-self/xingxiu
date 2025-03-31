import { ref } from "vue";

const appid = "wx524cff3ec18dde81";
const secret = "";
const db = uniCloud.databaseForJQL();

export const userInfo = ref({
  nickname: "匿名用户",
  avatar: "http://unicdn.n-m.top/icon/user.png",
});

export const ifLogin = () => {
  let t = uni.getStorageSync("userInfo");

  if (t.openid) {
    userInfo.value = t;
  } else {
    uni.showModal({
      title: "登录确认",
      content: "为了更好的服务，请登录！",
      confirmText: "登录",
      success: async function (res) {
        if (res.confirm) {
          login();
        }
      },
    });
  }
};

const login = () => {
  uni.showLoading({
    title: "登陆中",
  });
  // #ifdef MP-WEIXIN
  //获取code
  uni.login({
    provider: "weixin",
    success: (res) => {
      console.log(res.code); //获取code
      const code = res.code;
      //获取成功后
      uni.request({
        url: `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`,
        success: (res) => {
          //获取session_key和openid，此处关联后端进行业务处理
          console.log("openid:" + res.data.openid);
          getUserInfo(res.data.openid);
        },
        fail: (res) => {
          console.log(res.data);
        },
      });
    },
    fail: (res) => {
      console.log(res.data);
    },
  });
  // #endif
};

// 获取用户信息
const getUserInfo = async (openid) => {
  let res = await db
    .collection("wx_user")
    .where({
      openid,
    })
    .get();

  if (res.data.length > 0) {
    await uni.setStorageSync("userInfo", res.data[0]);
    userInfo.value = res.data[0];
    uni.showToast({
      title: "登录成功",
      duration: 2000,
    });
  } else {
    let data = {
      openid,
      nickname: "匿名用户" + Math.floor(Math.random() * 900 + 100),
      avatar: "http://unicdn.n-m.top/icon/user.png",
    };

    let res = await db.collection("wx_user").add(data);

    if (res.id) {
      await uni.setStorageSync("userInfo", data);
      userInfo.value = data;
    }
  }
  uni.hideLoading();
};
