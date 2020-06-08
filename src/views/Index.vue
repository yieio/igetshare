<template>
  <div class="container">
    <MyProfile :nickname="nickname" :avatar="avatar" />

    <div
      v-infinite-scroll="handleInfiniteOnLoad"
      class="infinite-container"
      :infinite-scroll-disabled="busy"
      :infinite-scroll-distance="10"
    >
      <ClassList :classes="classes" />

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
    userName:{ type: String, default: "yieio" },
    nickname: { type: String, default: "" },
    avatar:{type:String,default:""},
  },
  data: () => ({
    classes: [],
    loading: false,
    busy: false
  }),
  methods: {
    getUserInfo:function(){
      var _t = this;
      if(_t.userName!=''&&_t.userName!='yieio'){
        //获取用户信息
      }
    },
    getClasses: function() {
      var _t = this;
      _t.$ajax
        .get(_t.$conf.getClasses, {
          params: { lastId: _t.classes.length, count: 50 }
        })
        .then(function(resp) {
          var respObj = resp.data;
          if (respObj.type == 200) {
            if (respObj.data.classes.length > 0) {
              _t.classes = _t.classes.concat(respObj.data.classes);
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
    }
  },
  mounted: function() {
    //this.getClasses();
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
.none-padding-top .ant-card-body{
  padding-top:0;
}
</style>
