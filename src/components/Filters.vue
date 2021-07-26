<template>
  <div class="filters">
    <el-select
      class="tag-filter"
      multiple
      v-model="filterTag.selected"
      @change="(options) => onFilterChange('TAG', options)"
      placeholder="Filter by tag(s)"
    >
      <el-option
        v-for="item in filterTag.options"
        :key="item"
        :label="item"
        :value="item"
      />
    </el-select>
    <el-input
      class="search-filter"
      placeholder="Search projects"
      clearable
      v-model="filterSearch.selected"
      @change="(text) => onFilterChange('SEARCH', text)"
    />
    <div>
      <el-select
        class="sort-param"
        v-model="paramSort.selected"
        @change="(options) => onFilterChange('SORT', options)"
      >
        <el-option
          v-for="item in paramSort.options"
          :key="item"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-button
        class="sort-button"
        type="text"
        :icon="sortIcon"
        @click="() => onFilterChange('SORT_DIRECTION', null)"
      ></el-button>
    </div>
    <div class="project-count">Showing {{ nProjects }} projects</div>
  </div>
</template>

<script>
export default {
  name: "Filters",
  props: {
    filters: Object,
    params: Object,
    onFilterChange: Function,
    nProjects: Number,
  },
  computed: {
    filterTag() {
      return this.filters.TAG;
    },
    filterSearch() {
      return this.filters.SEARCH;
    },
    paramSort() {
      return this.params.SORT;
    },
    sortIcon() {
      if (this.paramSort.asc) {
        return "el-icon-sort-down";
      }
      return "el-icon-sort-up";
    },
  },
};
</script>

<style scoped>
.filters {
  width: 80%;
  margin: 20px 10%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.sort-button {
  padding-left: 5px;
}

.search-filter {
  max-width: 400px;
}

.tag-filter {
  min-width: 300px;
}

.sort-param {
  width: 140px;
}

.project-count {
  min-width: 200px;
  line-height: 40px;
}
</style>
