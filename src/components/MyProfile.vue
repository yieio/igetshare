<template>
<div class="the-class-info">
   <a-card :bordered="false" > 
    <a-card-meta title="yieio" description="得到课程分享">
      <a-avatar
      :size = "52"
        slot="avatar"
        :src="avatarImg"
      /> 
    </a-card-meta> 

    <a-button type="danger" icon="like" class="like-button" @click="goThumbup">赞赏</a-button>
  </a-card>
</div>
  
</template>

<script>
export default {
  name: 'MyProfile',
  props: { 
  },
  data:()=>({
    avatarImg: require('../assets/avatar.jpg')
  }),
  methods:{
    goThumbup:function(){
      window.location = "javascript:;"
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .thumbup-wrapper {
  margin: 10px;
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

.like-button{
    position: absolute;
    right: 20px;
    top: 30px;
}
</style>
