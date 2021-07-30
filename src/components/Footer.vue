<template>
  <div class="footer">
    <el-row class="footer-content-row">
      <div>
        <div class="footer-title">Advisors</div>
        <div
          class="footer-entry"
          v-for="advisor in advisors"
          :key="advisor.name"
        >
          <a :href="advisor.url" target="_blank">
            {{ advisor.name }}
          </a>
        </div>
      </div>
      <div>
        <div class="footer-title">Contributors</div>
        <div
          class="footer-entry"
          v-for="student in students"
          :key="student.name"
        >
          <a :href="student.url" target="_blank">
            {{ student.name }}
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
      advisors: [
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
      students: [
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
}
</style>
