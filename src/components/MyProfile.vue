<template>
<div>
  <a-card :bordered="false"> 
    <a-card-meta title="yieio" description="yieio的付费课程分享">
      <a-avatar
      :size = "48"
        slot="avatar"
        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
      /> 
    </a-card-meta> 
  </a-card>
   <!--赞赏按钮开始-->
    <div class="thumbup-wrapper">
      <a-button type="danger" icon="like">赞赏</a-button>
    </div>
    <!--赞赏按钮结束-->
</div>
  
</template>

<script>
export default {
  name: 'MyProfile',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .thumbup-wrapper {
  margin: 10px;
  text-align: center;
}
</style>
