<template>
  <el-card class="project" :body-style="{ padding: '0px' }">
    <img :src="require(`@/assets/images/${image}`)" />
    <div class="project-header">
      <div>{{ title }}</div>
      <div>{{ name }}</div>
      <div>{{ year }}</div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "Project",
  props: {
    name: String,
    title: String,
    description: String,
    image: String,
    repo: String,
    video: String,
    index: Number,
    position: Object,
    year: Number,
  },
  computed: {},
  methods: {},
};
</script>

<style scoped>
.project {
  position: relative;
}
.project-header {
  width: calc(100% - 20px);
  height: 20%;
  position: absolute;
  bottom: 0px;
  padding: 10px;
  opacity: 60%;
  background-color: white;
  z-index: 1;
}
.project img {
  width: 100%;
}
</style>
