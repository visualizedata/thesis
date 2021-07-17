<template>
  <div class="home">
    <Header />
    <Body :height="height" :width="width" />
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Body from "@/components/Body.vue";

export default {
  name: "Home",
  components: {
    Header,
    Footer,
    Body,
  },
  data() {
    return {
      height: 0,
      width: 0,
    };
  },
  mounted() {
    window.addEventListener("resize", this.onResize);
    this.onResize();
  },
  unmounted() {
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    onResize() {
      this.height = window.innerHeight;
      this.width = window.innerWidth;
    },
  },
};
</script>
