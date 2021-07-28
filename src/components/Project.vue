<template>
  <el-card class="project" :body-style="{ padding: '0px' }">
    <img :src="require('@/assets/images/parsons_placeholder.png')" />
    <div class="project-header">
      <div class="project-header__title">{{ title }}</div>
      <div class="project-header__name">
        {{ name }} <span class="project-header__year">({{ year }})</span>
      </div>
      <div class="project-header__hover-row">
        <div class="project-header__hover-row__icons">
          <a :href="repo">
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
        console.log(entry, img);
        img.src = require(`@/assets/images/${image}`);
        this.observer.disconnect();
      }
    });
    this.observer.observe($el);
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
  transition: height 0.25s, opacity 0.25s;
}

.project:hover .project-header {
  height: 35%;
  opacity: 80%;
}

.project-header__title {
  font-family: "neue-regular";
  font-size: 12px;
  margin: 4px 0px;
}

.project-header__name {
  font-family: "neue-display-wide";
  font-size: 14px;
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

.project-header:hover .project-header__hover-row {
  visibility: visible;
}

img.link-icon {
  margin: 10px;
  width: 20px;
  height: 20px;
}

.project-header__hover-row__tags {
  margin-top: 4px;
}
.project-header__hover-row__tags .tag {
  font-family: "neue-regular";
  margin: 2px;
}
</style>
