<template>
  <div class="projects">
    <Project
      v-for="(project, index) in projects"
      :key="`${project.name}_${project.title}_${project.year}`"
      :name="project.name"
      :title="project.title"
      :description="project.description"
      :image="project.image"
      :repo="project.repo"
      :video="project.video"
      :index="index"
      :position="getGridPosition(index)"
      :width="cellWidth"
    />
  </div>
</template>

<script>
import projects from "@/projects.json";
import Project from "@/components/Project.vue";
import { HEIGHT_TO_WIDTH, BODY_WIDTH } from "@/constants.js";

export default {
  name: "Projects",
  components: {
    Project,
  },
  data() {
    return {
      projects: null,
    };
  },
  props: {
    height: Number,
    width: Number,
  },
  mounted() {
    this.projects = projects.students;
  },
  computed: {
    bodyWidth() {
      return this.width * BODY_WIDTH;
    },
    cellWidth() {
      return this.bodyWidth / this.nCols;
    },
    nCols() {
      const minCellWidth = 350;
      const maxCellWidth = 400;
      return Math.max(
        Math.floor(this.bodyWidth / minCellWidth),
        Math.ceil(this.bodyWidth / maxCellWidth)
      );
    },
  },
  methods: {
    getGridPosition(index) {
      const { cellWidth, nCols } = this;
      const height = HEIGHT_TO_WIDTH * cellWidth;
      return {
        x: cellWidth * (index % nCols),
        y: height * Math.floor(index / nCols),
      };
    },
  },
};
</script>

<style scoped>
.projects {
  position: relative;
  margin: 0 10%;
  width: 80%;
}
</style>
