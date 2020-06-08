<template>
  <!--
        1.得到登录授权页面
        2.需要用户截图到得到扫一扫
  -->
  <div>
    <a-card hoverable :bordered="false" class="the-class-info">
      <a-card-meta title="分享得到课程" description="获取已购课程的分享红包">
        <a-avatar :size="52" slot="avatar" :src="avatarImg" />
      </a-card-meta>
    </a-card>
    <div v-if="!isLogin">
      <a-card hoverable class="iget-login-card">
        <template slot="cover">
          <div class="cover-padding-wrapper">
            <img alt="qrcode" :src="loginQrImg" />
          </div>
        </template>

        <a-card-meta title="截图用【得到App】扫一扫">
          <template slot="description">扫码后会获取您在得到购买的课程分享红包。完成扫码后点击下方按钮开始获取。</template>
        </a-card-meta>
      </a-card>

      <div class="done-scan-wrapper">
        <a-button type="danger" @click="doneLogin">已完成扫码</a-button>
      </div>
    </div>

    <div v-if="isLoadding">
      <a-card hoverable class="iget-login-card">
        <template slot="cover">
          <div class="cover-padding-wrapper">
            <a-progress type="circle" :percent="loaddingPercent" />
          </div>
        </template>

        <a-card-meta :title="loaddingTitle">
          <template slot="description">{{loaddingDesc}}</template>
        </a-card-meta>
      </a-card>
    </div>
    <div v-if="isDone">
      <a-card hoverable class="iget-login-card">
        <template slot="cover">
          <div class="cover-padding-wrapper">
            <img class alt="shareimg" :src="sharePic" />
            <div class="share-img-wrapper">
                <h2 class="shar-img-title">课程红包</h2>
                <div class="share-img-userinfo">
                    <a-avatar icon="user" />
                    <span style="margin-left:10px;">我是yieio</span>
                </div>
                 <div class="share-img-content">
                     <p>在得到购买了109门课程<br/>
                     送给你<br/>
                     与我一起学习</p>
                 </div>
                 <div class="share-img-qrcode">
                     <img alt="qrcode" :src="loginQrImg" class="share-qrcode" />
                 </div>
            </div>
          </div>
        </template>

        <a-card-meta title="分享红包">
          <template slot="description">可长按保存图片，分享给朋友，让他们领取您的课程红包。</template>
        </a-card-meta>
      </a-card>

      <div class="done-scan-wrapper">
        <a-button type="danger" @click="doneLogin">查看课程目录</a-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "IgetLogin",
  props: {},
  data: () => ({
    avatarImg: require("../assets/igetlogo.png"),
    loginQrImg: require("../assets/LoginQrCode.png"),
    sharePic: require("../assets/sharePic.jpg"),
    isLogin: true,
    isLoadding: false,
    isDone: true,
    loaddingPercent: 5,
    loaddingTitle: "正在获取分享红包",
    loaddingDesc: "正在为您获取购买课程的分享红包，可能需要1-2分钟，请您稍等。"
  }),
  methods: {
    doneLogin: function() {
      //检测登录状态
      var _t = this;
      _t.isLogin = !_t.isLogin;
      _t.isLoadding = true;
      _t.checkShareWork();
    },
    //检测抓取情况
    checkShareWork: function() {
      //分享页面生成完成，跳转到对应的分享页面,每两秒检测一次
      var _t = this;
      var checkTick = window.setInterval(function() {
        _t.loaddingPercent += 20;

        if (_t.loaddingPercent >= 100) {
          clearInterval(checkTick);
          _t.loaddingTitle = "分享红包获取完成";
          _t.loaddingDesc = "将在3秒后跳转到课程目录页面...";
          _t.isLoadding = false;
          _t.isDone = true;
        }
      }, 1000);
    }
  }
};
</script>

<style scoped>
.done-scan-wrapper {
  text-align: center;
}

.iget-login-card {
  margin: 10px auto;
  max-width: 280px;
}

.cover-padding-wrapper {
  text-align: center;
  padding: 20px;
  padding-bottom: 0px;
}

.cover-padding-wrapper img {
  width: 100%;
}

.share-img-wrapper{
    text-align: left;
    padding: 20px;
    /* background-image: url(/img/sharePic.b4e3ddbf.jpg); */
    background-color: #bb0000;
    background-size: 100% auto;
    background-repeat: no-repeat;
    color: #ffffff;
}

.shar-img-title{
    font-size:26px;
    color:#ffffff; 
    margin:0;
    padding:0;
}

.share-img-userinfo{
    margin-top:20px;
}

.share-img-content{
    color:#ffffff;
    margin-top:10px;
}

.share-img-content p{
    color:#ffffff;
    font-size:16px;
    line-height: 2.0;
}

.share-img-qrcode{
    margin-top:60px;
}

.share-qrcode{
    width:64px !important;
    height:64px;
}
</style>

<style>
</style>