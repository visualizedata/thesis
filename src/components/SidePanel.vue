<template>
  <div class="side-panel"></div>
</template>

<script>
export default {
  name: "SidePanel",
  props: {
    isEnabled: Boolean,
  },
  data() {
    return {
      isOpen: false,
    };
  },
};
</script>

<style></style>
