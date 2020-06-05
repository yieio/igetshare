<template>
  <a-card title="课程分享" style="margin:10px;" :bordered="false" class="none-padding-top">
    <a-list item-layout="horizontal" :data-source="classes">
      <a-list-item slot="renderItem" slot-scope="item">
        <a href="javascript:;" @click="goLensson(item.id)" class="class-item">
          <a-list-item-meta :description="item.author">
            <span slot="title">{{ item.title }}</span>
            <a-avatar slot="avatar" shape="square" :size="52" :src="item.icon" />
          </a-list-item-meta>
        </a>
      </a-list-item>
    </a-list>
  </a-card>
</template>

<script>
export default {
  name: "ClassList",
  props: {
    classes: Array
  },
  data: () => ({}),
  methods: {
    goLensson: function(classId) {
      this.$router.push({
        path: "/lesson",
        query: {
          classId: classId
        }
      });
    }
  }
};
</script>

<style scoped>
.class-item {
  display: block;
  width: 100%;
}

 
</style>