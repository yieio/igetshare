<template>
  <div class="container">
    <MyProfile :nickname="userInfo.nickName" :avatar="userInfo.avatar" />

    <div
      v-infinite-scroll="handleInfiniteOnLoad"
      class="infinite-container"
      :infinite-scroll-disabled="busy"
      :infinite-scroll-distance="10"
    >

    <a-input-search placeholder="按课程名称查找课程"  @search="searchCourse" enter-button/>

      <ClassList :classes="classes" :userName="userName" />

      <div v-if="loading && !busy" class="loading-container">
        <a-spin />
      </div>
    </div>
  </div>
</template>

<script>
import infiniteScroll from "vue-infinite-scroll";
import MyProfile from "../components/MyProfile.vue";
import ClassList from "../components/ClassList.vue";

export default {
  name: "index",
  directives: { infiniteScroll },
  components: {
    MyProfile,
    ClassList
  },
  props: {
    userName: { type: String, default: "iget-35900541" }
  },
  data: () => ({
    classes: [],
    orgClasses: [],
    loading: false,
    busy: false,
    searchValue:"",
    userInfo: {}
  }),
  methods: {
    getUserInfo: function() {
      var _t = this;
      if (_t.userName != "" && _t.userName != "iget-35900541") {
        //获取用户信息
        _t.$ajax
          .get(_t.$conf.getIgetUserInfo, {
            params: {
              userName: _t.userName
            }
          })
          .then(function(resp) {
            var respObj = resp.data;
            if (respObj.type == 200) {
              _t.userInfo = respObj;
            } else {
              //提示返回内容
              _t.$message.warning(respObj.content);
            }
          });
      }
    },
    getClasses: function() {
      var _t = this;
      _t.$ajax
        .get(_t.$conf.getClasses, {
          params: {
            userName: _t.userName,
            lastId: _t.orgClasses.length,
            count: 50
          }
        })
        .then(function(resp) {
          var respObj = resp.data;
          if (respObj.type == 200) {
            if (respObj.data.classes.length > 0) {
              _t.orgClasses = _t.orgClasses.concat(respObj.data.classes);
              _t.searchCourse(_t.searchValue);
            } else {
              _t.busy = true;
            }
          }
          _t.loading = false;
        });
    },
    handleInfiniteOnLoad() {
      var _t = this;
      if (!_t.loading) {
        _t.loading = true;
        _t.getClasses();
      }
    },
    searchCourse: function(value) {
      console.log(value);
      var _t = this;
      _t.searchValue = value;
      if (value != "") {
        var len = _t.orgClasses.length;
        _t.classes = [];
        for (var i = 0; i < len; i++) {
          var item = _t.orgClasses[i];
          if (item.title.indexOf(value) >= 0) {
            _t.classes = _t.classes.concat(item);
          }
        }
      }else{
        _t.classes = _t.orgClasses;
      }
    }
  },
  mounted: function() {
    this.getUserInfo();
  }
};
</script>
<style scoped>
.container {
  background-color: #ededed;
}

.loading-container {
  position: absolute;
  bottom: 40px;
  width: 100%;
  text-align: center;
}
</style>

<style>
.none-padding-top .ant-card-body {
  padding-top: 0;
}
</style>
