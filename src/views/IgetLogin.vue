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
      <a-card class="iget-login-card">
        <template slot="cover">
          <div class>
            <div class="share-img-wrapper" ref="shareImgDom" v-if="isDom">
              <h2 class="shar-img-title">课程红包</h2>
              <div class="share-img-userinfo">
                <a-avatar icon="user" :src="avatarImg1" />
                <span style="margin-left:10px;">我是yieio</span>
              </div>
              <div class="share-img-content">
                <p>
                  在得到购买了 {{classCount}} 门课程
                  <br />送给你
                  <br />与我一起学习
                </p>
              </div>
              <div class="share-img-qrcode" ref="qrCodeDiv">
                <!-- <img alt="qrcode" :src="loginQrImg" class="share-qrcode" /> -->
              </div>
            </div>

            <div v-else>
              <img :src="shareImg" alt="shareimg" style="width:100%;z-index:100" />
            </div>
          </div>
        </template>

        <a-card-meta :title="shareTitle">
          <template slot="description">可长按保存图片，分享给朋友，让他们领取您的课程红包。</template>
        </a-card-meta>
      </a-card>

      <div class="done-scan-wrapper">
        <a-button type="danger" @click="goMyClasses">查看课程目录</a-button>
      </div>
    </div>
  </div>
</template>

<script>
import html2canvas from "html2canvas";
import QRCode from "qrcodejs2";

export default {
  name: "IgetLogin",
  props: {},
  data: () => ({
    avatarImg1: require("../assets/avatar.jpg"),
    avatarImg: require("../assets/igetlogo.png"),
    loginQrImg: "",
    loginObj: {},
    userInfo: {},
    classCount:0,
    shareImg: "",
    isDom: true,
    isLogin: false,
    isLoadding: false,
    isDone: false,
    loaddingPercent: 5,
    loaddingTitle: "正在获取分享红包",
    loaddingDesc: "正在为您获取购买课程的分享红包，可能需要1-2分钟，请您稍等。",
    shareTitle: "分享红包"
  }),
  methods: {
    /**
     * 获取登录二维码
     */
    getLoginQrCode: function() {
      var _t = this;
      _t.$ajax
        .get(_t.$conf.getLoginQrCode, {
          params: {}
        })
        .then(function(resp) {
          var respObj = resp.data;
          if (respObj.type == 200) {
            _t.loginQrImg = respObj.data.qrCode;
            _t.loginObj = respObj.data;
          }
        });
    },
    /**
     * 查看我的课程目录
     */
    goMyClasses:function(){
      var _t = this;
      _t.$router.push({
        path: "/",
        query: {
          userName: _t.userInfo.userName
        }
      });

    },
    doneLogin: function() {
      //检测登录状态
      var _t = this;

      _t.$ajax
        .get(_t.$conf.checkLogin, {
          params: {
            qrCodeString: _t.loginObj.qrCodeString,
            authToken: _t.loginObj.authToken
          }
        })
        .then(function(resp) {
          var respObj = resp.data;
          if (respObj.type == 200) {
            _t.isLogin = true;
            _t.isLoadding = true;
            _t.userInfo = respObj.data;

            _t.checkShareWork();
          } else {
            //提示返回内容
            _t.$message.warning(respObj.content);
          }
        });
    },
    //检测抓取情况
    checkShareWork: function() {
      //分享页面生成完成，跳转到对应的分享页面,未完成就再发起检测
      var _t = this;

      _t.$ajax
        .get(_t.$conf.checkShareWork, {
          params: { userName: _t.userInfo.userName }
        })
        .then(function(resp) {
          var respObj = resp.data;
          if (respObj.type == 200) {
            //完成度小于90%继续等待
            if (respObj.data.classCount == 0) {
              _t.loaddingPercent += 20;
              if (_t.loaddingPercent >= 100) {
                _t.$message.warning("未获取到课程红包，可尝试刷新重新登录");
              } else {
                setTimeout(() => {
                  _t.checkShareWork();
                }, 1000);
              }
            } else {
              _t.classCount = respObj.data.classCount;
              _t.loaddingPercent = 100;
              _t.isLoadding = false;
              _t.isDone = true;
              setTimeout(() => {
                _t.createShareQrCode();
              }, 300);

              setTimeout(() => {
                _t.htmlToCanvas();
              }, 1200);
            }
          } else {
            //提示返回内容
            _t.$message.warning(respObj.content);
          }
        });
    },
    /**
     * 生成二维码
     */
    createShareQrCode() {
      var _t = this;
      new QRCode(this.$refs.qrCodeDiv, {
        text: "http://iget.cpb168.com/#/?userName="+_t.userInfo.userName,
        width: 70,
        height: 70,
        colorDark: "#d71039", //二维码颜色
        colorLight: "#ffffff", //二维码背景色
        correctLevel: QRCode.CorrectLevel.L //容错率，L/M/H
      });
    },

    /**
     * 生成分享海报
     */
    htmlToCanvas() {
      this.shareTitle = "生成海报";
      var _t = this;

      html2canvas(this.$refs.shareImgDom, {
        useCORS: true,
        backgroundColor: null
      }).then(function(canvas) {
        try { 
          let imageUrl = canvas.toDataURL("image/png"); // 将canvas转成base64图片格式
          _t.shareImg = imageUrl;
          _t.isDom = false;
        } catch (err) {
          _t.shareTitle = err;
        }
      });
 
    },

    dataURLtoFile(dataurl, filename = "file") {
      let arr = dataurl.split(",");
      let mime = arr[0].match(/:(.*?);/)[1];
      let suffix = mime.split("/")[1];
      let bstr = atob(arr[1]);
      let n = bstr.length;
      let u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], `${filename}.${suffix}`, {
        type: mime
      });
    }
  },
  mounted: function() {
     var _t = this;
     _t.getLoginQrCode();
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

.share-img-wrapper {
  text-align: left;
  padding: 20px;
  background-image: url(../assets/igetshare-bg.png);
  background-color: #bb0000;
  background-size: 100% auto;
  background-repeat: no-repeat;
  color: #ffffff;
}

.shar-img-title {
  font-size: 26px;
  color: #ffffff;
  margin: 0;
  padding: 0;
}

.share-img-userinfo {
  margin-top: 20px;
}

.share-img-content {
  color: #ffffff;
  margin-top: 20px;
}

.share-img-content p {
  color: #ffffff;
  font-size: 16px;
  line-height: 2;
}

.share-img-qrcode {
  margin-top: 70px;
}

.share-qrcode {
  width: 70px !important;
  height: 70px;
  border: solid 4px #ffffff;
}
</style>

<style>
.share-img-qrcode img {
  width: 70px !important;
  height: 70px;
  border: solid 4px #ffffff;
}
</style>