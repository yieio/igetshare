<template>
  <a-card hoverable style="margin:10px;">
    <img
      slot="cover"
      alt="example"
      src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
    />
    <template slot="actions" class="ant-card-actions">
      <!-- <a-icon key="setting" type="setting" /> -->
      <a-icon key="like" type="like" />
      <a-icon key="ellipsis" type="ellipsis" />
    </template>
    <a-card-meta title="Yieio" description="yieio的学习和得到付费课程分享">
      <a-avatar
      :size = "48"
        slot="avatar"
        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
      />
    </a-card-meta>
  </a-card>
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
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
