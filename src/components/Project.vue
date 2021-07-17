<template>
  <el-card class="project" :style="cellStyle">
    {{ name }} {{ title }}

    <img :src="require(`@/assets/images/${image}`)" />
  </el-card>
</template>

<script>
import { HEIGHT_TO_WIDTH } from "@/constants.js";

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
    width: Number,
  },
  computed: {
    height() {
      return this.width * HEIGHT_TO_WIDTH;
    },
    cellStyle() {
      return {
        top: `${this.position.y}px`,
        left: `${this.position.x}px`,
        width: `${this.width}px`,
        height: `${this.height}px`,
      };
    },
  },
  methods: {},
};
</script>

<style scoped>
.project {
  position: absolute;
}
.project img {
  width: 100%;
}
</style>
