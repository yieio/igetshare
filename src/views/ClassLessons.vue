<template>
  <div>
    <a-card hoverable :bordered="false" class="the-class-info">
      <a-card-meta :title="theClass.title" :description="theClass.author">
        <a-avatar shape="square" :size="52" slot="avatar" :src="theClass.icon" />
      </a-card-meta>
    </a-card>

    <!--课程目录列表开始-->
    <div
      v-infinite-scroll="handleInfiniteOnLoad"
      class="infinite-container"
      :infinite-scroll-disabled="busy"
      :infinite-scroll-distance="10"
    >
      <a-card title="课程目录" style="margin:10px;" :bordered="false">
        <a-list item-layout="horizontal" :data-source="lessons">
          <a-list-item slot="renderItem" slot-scope="item">
            <a :href="item.shareUrl">
              <a-list-item-meta>
                <span slot="title">{{ item.title }}</span>
              </a-list-item-meta>
            </a>
          </a-list-item>
        </a-list>
      </a-card>
      <div v-if="loading && !busy" class="loading-container">
        <a-spin />
      </div>
    </div>

    <!--课程目录列表结束-->

    <!--返回首页按钮开始-->
    <a-button shape="circle" icon="home" class="go-home" @click="goHome" size="large" />
    <!--返回首页按钮结束-->
  </div>
</template>

<script>
import infiniteScroll from "vue-infinite-scroll";

export default {
  directives: { infiniteScroll },
  props: {
    classId: { type: String, default: "iget-83" }
  },
  data: () => ({
    theClass: {},
    lessons: [],
    loading: false,
    busy: false
  }),
  methods: {
    goHome: function() {
      this.$router.push("/");
    },

    getClassLessons: function() {
      var _t = this;

      _t.$ajax
        .get(_t.$conf.getClassLessons, {
          params: { classId: _t.classId, lastId: _t.lessons.length, count: 50 }
        })
        .then(function(resp) {
          var respObj = resp.data;
          if (respObj.type == 200) {
            if (respObj.data.lessons.length > 0) {
              _t.lessons = _t.lessons.concat(respObj.data.lessons);
              _t.theClass = respObj.data.theClass;
              if (respObj.data.lessons.length < 50) {
                _t.busy = true;
              }
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
        _t.getClassLessons();
      }
    }
  }
};
</script>

<style scoped>
.go-home {
  position: fixed;
  bottom: 50px;
  left: 10px;
}

.loading-container {
  position: absolute;
  bottom: 40px;
  width: 100%;
  text-align: center;
}

.the-class-info {
  position: sticky;
  top: 0;
  left: 0;
  z-index: 100;
  border-color: rgba(0, 0, 0, 0.09);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
}
</style>