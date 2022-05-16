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
      :tags="project.tags"
      :url="project.url"
      :onFilterChange="onFilterChange"
      :setVideoStudent="setVideoStudent"
    />
    <div class="video-container" v-if="videoStudent">
      <div class="video-close" @click="() => setVideoStudent(null)">
        &#10005;
      </div>
      <video controls autoplay>
        <source :src="require(`@/assets/media/${videoStudent}`)" type="video/mp4" />
      </video>
    </div>
  </div>
</template>

<script>
import Project from "@/components/Project.vue";

export default {
  name: "Projects",
  components: {
    Project,
  },
  data() {
    return {
      videoStudent: null,
    };
  },
  props: {
    height: Number,
    width: Number,
    projects: Array,
    onFilterChange: Function,
  },
  methods: {
    setVideoStudent(student) {
      this.videoStudent = student;
    },
  },
};
</script>

<style scoped>
.projects {
  position: relative;
  display: grid;
  column-gap: 20px;
  row-gap: 20px;
  margin: 0;
  width: 100%;
}

@media (min-width: 400px) {
  .projects {
    grid-template-columns: 1fr;
    margin: 0 10%;
    width: 80%;
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

.video-container {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 3;
  background-color: black;
}
video {
  width: 100%;
  height: 100%;
}
.video-close {
  position: absolute;
  right: 10px;
  top: 10px;
  display: flex;
  width: 2em;
  height: 2em;
  background: white;
  border: 1px solid gray;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  z-index: 4;
  cursor: pointer;
  font-size: 20px;
}
</style>
