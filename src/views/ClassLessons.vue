<template>
  <div>
    <a-card hoverable :bordered="false">
      <a-card-meta title="前沿科技·人体微生物组9讲" description="段云峰·中科院心理所博士">
        <a-avatar
          :size="48"
          slot="avatar"
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        />
      </a-card-meta>
    </a-card>

    <!--课程目录列表开始-->
    <a-card title="课程目录"  style="margin:10px;" :bordered="false">
    <a-list item-layout="horizontal" :data-source="data" >
      <a-list-item slot="renderItem" slot-scope="item">
        <a href="https://www.baidu.com">
        <a-list-item-meta> 
          <span slot="title">{{ item.title }}</span>  
        </a-list-item-meta>
        </a>
      </a-list-item>
    </a-list>
  </a-card>

    <!--课程目录列表结束-->

    <!--返回首页按钮开始-->
    <a-button  shape="circle" icon="home" class="go-home" @click="goHome" />
    <!--返回首页按钮结束-->

  </div>
</template>

<script>
const data = [
  {
    title: "发刊词 | 一场说走就走的思想奇幻之旅",
    author:"段云峰·中科院心理所博士"
  },
  {
    title: "特辑 | 在何帆读书俱乐部的三种修炼方式",
    author:"段云峰*中科院心理所博士"
  } 
];

export default {
    data() {
    return {
      data,
      imgUrl:'../assets/wwg.png'
    };
  },
  methods:{
      goHome:function(){
          this.$router.push('/');
      }
  }
};
</script>

<style scoped>
.go-home{
    position:fixed;
    bottom:50px;
    left:10px;
}
</style>