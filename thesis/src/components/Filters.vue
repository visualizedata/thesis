<template>
  <div class="filters">
    <el-select
      multiple
      v-model="filterTag.selected"
      @change="(options) => onFilterChange('TAG', options)"
    >
      <el-option
        v-for="item in filterTag.options"
        :key="item"
        :label="item"
        :value="item"
      />
    </el-select>
    <el-input
      placeholder="Search projects"
      clearable
      v-model="filterSearch.selected"
      @change="(text) => onFilterChange('SEARCH', text)"
    />
  </div>
</template>

<script>
export default {
  name: "Filters",
  props: {
    filters: Object,
    onFilterChange: Function,
  },
  computed: {
    filterTag() {
      return this.filters.TAG;
    },
    filterSearch() {
      return this.filters.SEARCH;
    },
  },
};
</script>

<style scoped></style>
