<template>
  <el-card
    :class="{
      project: true,
      'project--is-open': isOpen,
    }"
    :body-style="{ padding: '0px' }"
    @mouseleave="() => toggleIsOpen(false)"
  >
    <img :src="require('@/assets/images/parsons_placeholder.png')" />
    <div class="project-header">
      <i
        :class="{
          'project-header__toggle': true,
          'el-icon-remove-outline': isOpen,
          'el-icon-circle-plus-outline': !isOpen,
        }"
        @click="() => toggleIsOpen()"
      ></i>
      <div
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
      </div>
      <div class="project-header__description-row">
        <div class="project-header__description">{{ description }}</div>
      </div>
      <div class="project-header__hover-row">
        <div class="project-header__hover-row__icons">
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
        <div class="project-header__hover-row__tags">
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
    onFilterChange: Function,
    setVideoStudent: Function,
  },
  data() {
    return {
      observer: null,
      isOpen: false,
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
  methods: {
    toggleIsOpen(next) {
      this.isOpen = next !== undefined ? next : !this.isOpen;
    },
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

.project:not(.project--is-open):hover .project-header {
  height: 74px;
  background-color: rgba(255, 255, 255, 0.8);
}
.project--is-open .project-header {
  height: calc(100% - 20px);
  background-color: rgba(255, 255, 255, 0.8);
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
.project--is-open .project-header .project-header__name {
  border-bottom: 1px solid #ddd;
}

.project-header__year {
  font-family: "neue-regular";
  font-size: 14px;
}

.project img {
  width: 100%;
  display: block;
}

.project-header__hover-row {
  visibility: hidden;
  display: flex;
  justify-content: space-between;
}
.project-header__hover-row__icons {
  display: flex;
}

.project:hover .project-header .project-header__hover-row {
  visibility: visible;
}
.project--is-open .project-header .project-header__hover-row {
  visibility: visible;
  border-top: 1px solid #ddd;
}

.project-header__description-row {
  font-family: "neue-regular";
  overflow: scroll;
  height: 0px;
  font-size: 13px;
  text-align: left;
}
.project--is-open .project-header .project-header__description-row {
  height: calc(100% - 76px);
}
.project-header__description {
  margin: 10px;
  padding: 10px;
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

.project-header__hover-row__tags {
  margin-top: 4px;
}
.project-header__hover-row__tags .tag {
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
