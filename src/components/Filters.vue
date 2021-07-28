<template>
  <div class="filters">
    <el-row>
      <div class="filter tag-filter">
        <div class="label">Filter by tag</div>
        <el-select
          multiple
          v-model="filterTag.selected"
          @change="(options) => onFilterChange('TAG', options)"
          placeholder="Select project tag(s)"
        >
          <el-option
            v-for="item in filterTag.options"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </div>
      <div class="filter search-filter">
        <div class="label">Filter on text</div>
        <el-input
          placeholder="Search name, title, or description"
          clearable
          v-model="filterSearch.selected"
          @change="(text) => onFilterChange('SEARCH', text)"
        />
      </div>
      <BarFilter
        :yearData="yearData"
        :filterHeight="filterHeight"
        :onYearChange="(selection) => onFilterChange('YEAR', selection)"
      />
      <div class="filter sort-param">
        <div class="label">Sort</div>
        <div class="sort-param-content">
          <el-select
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
      </div>
    </el-row>
    <el-row>
      <div class="filter project-count">
        Showing {{ nProjects.filtered }} of {{ nProjects.all }} projects
      </div>
    </el-row>
  </div>
</template>

<script>
const FILTER_HEIGHT = 40;
import BarFilter from "./BarFilter.vue";

export default {
  name: "Filters",
  components: {
    BarFilter,
  },
  props: {
    filters: Object,
    params: Object,
    onFilterChange: Function,
    nProjects: Object,
    yearData: Object,
  },
  data() {
    return {
      filterHeight: FILTER_HEIGHT,
    };
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
  margin: 0px 10% 20px 10%;
  font-family: "neue-regular";
}
.filters .el-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.label {
  font-size: 11px;
  text-align: left;
  padding-bottom: 5px;
}

.filter {
  margin-top: 10px;
}

.sort-button {
  padding-left: 5px;
}

.search-filter {
  width: 260px;
}
.search-filter input {
  width: 100%;
}

.tag-filter {
  min-width: 300px;
}
.tag-filter .el-select {
  width: 100%;
}

.sort-param {
  width: 160px;
}
.sort-param-content {
  display: flex;
}

.project-count {
  font-size: 12px;
}
</style>
