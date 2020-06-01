<template>
  <a-card title="课程分享"  style="margin:10px;" :bordered="false">
    <a-list item-layout="horizontal" :data-source="data" >
      <a-list-item slot="renderItem" slot-scope="item">
        <router-link to="/lesson">
        <a-list-item-meta
          :description="item.author"
        > 
          <span slot="title">{{ item.title }}</span> 
          <a-avatar 
            slot="avatar"
            :size="48"
            :src="imgUrl"
          />
          
        </a-list-item-meta>
        </router-link>
      </a-list-item>
    </a-list>
  </a-card>
</template>

<script>
const data = [
  {
    title: "前沿科技·人体微生物组9讲",
    author:"段云峰·中科院心理所博士"
  },
  {
    title: "Ant Design Title 2",
    author:"段云峰*中科院心理所博士"
  },
  {
    title: "Ant Design Title 3",
    author:"段云峰*中科院心理所博士"
  },
  {
    title: "Ant Design Title 4",
    author:"段云峰*中科院心理所博士"
  }
];
export default {
  name: "ClassList",
  data() {
    return {
      data,
      imgUrl:'http://www.8zhile.com/wp-content/uploads/2018/08/%E4%B8%87%E7%BB%B4%E9%92%A2%C2%B7%E7%B2%BE%E8%8B%B1%E6%97%A5%E8%AF%BE-%E5%BE%97%E5%88%B0%E4%B8%93%E6%A0%8F.jpg'
    };
  }
};
</script>