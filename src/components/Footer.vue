<template>
  <div class="footer">
    <el-row class="footer-content-row">
      <div v-for="list in lists" :key="list.key">
        <div class="footer-title">{{ list.key }}</div>
        <div
          class="footer-entry"
          v-for="value in list.values"
          :key="value.name"
        >
          <a :href="value.url" target="_blank">
            {{ value.name }}
          </a>
        </div>
      </div>
    </el-row>
    <el-row>
      Copyright © 2021 The New School
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      lists: [
        {
          key: "More information",
          values: [
            {
              name: "MS Data Visualization",
              url: "http://www.newschool.edu/parsons/ms-data-visualization/",
            },
            {
              name: "School of Art, Media, and Technology",
              url:
                "http://www.newschool.edu/parsons/art-media-technology-school-amt/",
            },
            {
              name: "Parsons School of Design",
              url: "https://www.newschool.edu/parsons/",
            },
            { name: "The New School", url: "https://www.newschool.edu" },
          ],
        },
        {
          key: "Advisors",
          values: [
            {
              name: "Daniel Sauter, Program Director",
              url: "https://www.newschool.edu/parsons/faculty/daniel-sauter/",
            },
            {
              name: "Aaron Hill, Assistant Professor",
              url: "https://www.newschool.edu/parsons/faculty/aaron-hill/",
            },
            {
              name: "Richard The, Assistant Professor",
              url: "https://www.newschool.edu/parsons/faculty/Richard-The/",
            },
            {
              name: "Alec Barrett, Part-Time Faculty",
              url: null,
            },
          ],
        },
        {
          key: "Contributors",
          values: [
            {
              name: "Zui Chen, Class of 2020",
              url: "https://www.zui-c.com/",
            },
            {
              name: "Xingwei Huang, Class of 2020",
              url: "http://xingwei.work/",
            },
            {
              name: "Yujun Jiang, Class of 2021",
              url: "https://yujunjiang.com/",
            },
            {
              name: "Shea Molloy, Class of 2021",
              url: "https://sheamolloy.info/",
            },
          ],
        },
      ],
    };
  },
};
</script>

<style scoped>
.footer {
  margin: 20px 10%;
  text-align: left;
  font-family: "neue-regular";
  font-size: 12px;
}

.footer-content-row {
  padding: 10px;
  border-top: 3px solid black;
  border-bottom: 3px solid black;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-around;
}

.footer-title {
  font-family: "neue-display";
  margin-bottom: 5px;
}
</style>
