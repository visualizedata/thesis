<template>
  <el-card class="project" :body-style="{ padding: '0px' }">
    <img :src="require('@/assets/images/parsons_placeholder.png')" />
    <div class="project-header">
      <a :href="url" target="_blank"
        ><div
          :class="{
            'project-header__title': true,
            'project-header__title--size': title.length > 50,
          }"
        >
          {{ title }}
        </div>
        <div
          :class="{
            'project-header__name': true,
            'project-header__name--size': name.length > 20,
          }"
        >
          {{ name }} <span class="project-header__year">({{ year }})</span>
        </div></a
      >
      <div
        class="project-header__hover-section__row project-header__hover-section"
      >
        <div class="project-header__hover-section__icons">
          <a :href="repo" target="_blank">
            <img
              v-if="repo"
              :src="require('@/assets/images/GitHub.png')"
              class="link-icon link-github"
            />
          </a>
          <img
            v-if="video"
            :src="require('@/assets/images/video.png')"
            class="link-icon link-video"
            @click="() => setVideoStudent(video)"
          />
        </div>
        <div class="project-header__hover-section__tags">
          <el-tag
            class="tag"
            v-for="tag in tags"
            :key="tag"
            type="info"
            effect="plain"
            size="small"
            @click="() => onFilterChange('TAG_TOGGLE', tag)"
            >{{ tag }}</el-tag
          >
        </div>
      </div>
      <div
        class="project-header__description-container project-header__hover-section"
      >
        <div class="project-header__description">{{ description }}</div>
      </div>
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
    tags: Array,
    url: String,
    onFilterChange: Function,
    setVideoStudent: Function,
  },
  data() {
    return {
      observer: null,
    };
  },
  mounted() {
    const { image, $el } = this;

    this.observer = new IntersectionObserver(([entry]) => {
      const img = $el.querySelector("img");

      if (entry.isIntersecting) {
        img.src = require(`@/assets/images/${image}`);        
        this.observer.disconnect();
      }
    });
    this.observer.observe($el);
  },
};
</script>

<style scoped>
.project {
  position: relative;
}
.project-header {
  width: calc(100% - 20px);
  height: 40px;
  position: absolute;
  bottom: 0px;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.7);
  z-index: 1;
  transition: height 0.25s, background-color 0.25s;
}

.project:hover .project-header {
  height: calc(100% - 20px);
  background-color: rgba(255, 255, 255, 0.9);
}

.project-header__toggle {
  position: absolute;
  top: 8px;
  right: 8px;
  cursor: pointer;
  visibility: hidden;
  opacity: 0.4;
  transition: transform 0.1s;
  font-size: 18px;
}
.project:hover .project-header__toggle {
  visibility: visible;
}
.project-header__toggle:hover {
  transform: scale(1.1);
}

.project-header__title {
  font-family: "neue-regular";
  margin: 4px 0px;
  font-size: 0.8em;
  white-space: nowrap;
}
.project-header__title--size {
  font-size: 0.7em;
}

.project-header__name {
  font-family: "neue-display-wide";
  font-size: 1em;
  white-space: nowrap;
}
.project-header__name--size {
  font-size: 0.85em;
}

.project-header__year {
  font-family: "neue-regular";
  font-size: 14px;
}

.project img {
  width: 100%;
  display: block;
}

.project-header__hover-section {
  opacity: 0;
  transition: opacity 0.25s;
}
.project:hover .project-header .project-header__hover-section {
  opacity: 1;
}

.project-header__hover-section__row {
  display: flex;
  justify-content: space-between;
}
.project-header__hover-section__icons {
  display: flex;
}

.project-header__description-container {
  overflow: scroll;
  max-height: 90px;
  margin: 5px;
}
.project-header__description {
  height: 100%;
  font-size: 13px;
  text-align: left;
}

img.link-icon {
  margin: 10px;
  width: 20px;
  height: 20px;
  cursor: pointer;
  transition: transform 0.1s;
}
img.link-icon:hover {
  transform: scale(1.1);
}

.project-header__hover-section__tags {
  margin-top: 4px;
}
.project-header__hover-section__tags .tag {
  font-family: "neue-regular";
  margin: 2px;
}

.el-tag {
  cursor: pointer;
}
.el-tag:hover {
  filter: brightness(1.1);
}
</style>
