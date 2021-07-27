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
      <div class="filter year-filter">
        <div class="label">Filter by year</div>
        <svg :height="`${filterHeight}px`" width="200px">
          <g class="year-bars-all">
            <rect
              v-for="bar in yearData.all"
              :key="`all_${bar[0]}`"
              :x="xScale(bar[0])"
              :y="filterHeight - yScale(bar[1])"
              :height="yScale(bar[1])"
              :width="xScale.bandwidth()"
            />
          </g>
          <g class="year-bars-filtered">
            <rect
              v-for="bar in yearData.filtered"
              :key="`all_${bar[0]}`"
              :x="xScale(bar[0])"
              :y="filterHeight - yScale(bar[1])"
              :height="yScale(bar[1])"
              :width="xScale.bandwidth()"
            />
          </g>
          <g class="year-labels">
            <text
              v-for="text in yearData.all"
              :key="text[0]"
              :x="xScale(text[0]) + xScale.bandwidth() / 2"
              :y="filterHeight - 3"
            >
              {{ text[0] }}
            </text>
          </g>
        </svg>
      </div>
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
import { scaleLinear, scaleBand } from "d3-scale";
import { max } from "d3-array";
const FILTER_HEIGHT = 40;

export default {
  name: "Filters",
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
    xScale() {
      return scaleBand()
        .domain(this.yearData.all.map((d) => d[0]))
        .range([0, 200])
        .paddingOuter(0.2)
        .paddingInner(0.1);
    },
    yScale() {
      return scaleLinear()
        .domain([0, max(this.yearData.all, (d) => d[1])])
        .range([0, this.filterHeight]);
    },
  },
};
</script>

<style scoped>
.filters {
  width: 80%;
  margin: 20px 10%;
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

.year-bars-all rect {
  fill: gray;
}
.year-bars-filtered rect {
  fill: black;
  transition: all 0.5s;
}
.year-labels text {
  fill: white;
  font-size: 9px;
  text-anchor: middle;
}
</style>
