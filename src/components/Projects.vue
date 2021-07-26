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
      :year="project.year"
    />
  </div>
</template>

<script>
import Project from "@/components/Project.vue";

export default {
  name: "Projects",
  components: {
    Project,
  },
  props: {
    height: Number,
    width: Number,
    projects: Array,
  },
  computed: {},
};
</script>

<style scoped>
.projects {
  position: relative;
  margin: 0 10%;
  width: 80%;
  display: grid;
  column-gap: 20px;
  row-gap: 20px;
}

@media (min-width: 400px) {
  .projects {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 800px) {
  .projects {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1200px) {
  .projects {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1600px) {
  .projects {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
