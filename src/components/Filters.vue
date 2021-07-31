<template>
  <div class="filters">
    <el-row>
      <!-- SEARCH FILTER -->
      <div class="filter search-filter">
        <div class="label">Filter on text</div>
        <el-input
          placeholder="Type name, title, or description"
          clearable
          v-model="filterSearch.selected"
          @change="(text) => onFilterChange('SEARCH', text)"
        />
      </div>

      <!-- TAG FILTER -->
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

      <!-- PARAM SORT -->
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
          <el-tooltip
            :content="sortTooltipContent"
            placement="bottom"
            effect="light"
          >
            <el-button
              class="sort-button"
              type="text"
              :icon="sortIcon"
              @click="() => onFilterChange('SORT_DIRECTION', null)"
            ></el-button>
          </el-tooltip>
        </div>
      </div>

      <!-- YEAR FILTER -->
      <BarFilter
        :yearData="yearData"
        :filterHeight="filterHeight"
        :onYearChange="(selection) => onFilterChange('YEAR', selection)"
      />
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
    sortTooltipContent() {
      if (this.paramSort.selected === "name") {
        return this.paramSort.asc ? "click to sort Z-A" : "click to sort A-Z";
      }
      if (this.paramSort.selected === "year") {
        return this.paramSort.asc
          ? "click to sort newest first"
          : "click to sort oldest first";
      }
      return "";
    },
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
  width: 250px;
}
.search-filter input {
  width: 100%;
}

.tag-filter {
  min-width: 250px;
}
.tag-filter .el-select {
  width: 100%;
}

.sort-param {
  width: 250px;
}
.sort-param-content {
  display: flex;
}
.sort-param-content .el-select {
  width: 100%;
}

.project-count {
  font-size: 12px;
  margin-bottom: 10px;
}

@media (max-width: 399px) {
  .filters {
    width: 100%;
    margin: 0px;
  }

  .search-filter,
  .tag-filter,
  .sort-param {
    width: 100%;
  }
}
</style>
