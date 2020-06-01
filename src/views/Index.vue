<template>
  <div class="container">
    <MyProfile msg="Welcome to Your Vue.js App" />
    <ClassList />


    <!--赞赏按钮开始-->
    <div class="thumbup-wrapper">
    <a-button type="danger" icon="like">
      赞赏
    </a-button>
    </div>
    <!--赞赏按钮结束-->
  </div>
</template>

<script>
import MyProfile from "../components/MyProfile.vue";
import ClassList from "../components/ClassList.vue";

export default {
  name: "App",
  components: {
    MyProfile,
    ClassList
  }
};
</script>
<style scoped>
.container {
  background-color: #f9f9f9;
}

.thumbup-wrapper{
    margin:10px;
    text-align: center;
}
</style>
