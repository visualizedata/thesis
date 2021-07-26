<template>
  <div class="body">
    <el-row>
      <Filters
        :filters="filters"
        :params="params"
        :onFilterChange="onFilterChange"
        :nProjects="filteredProjects.length"
      />
    </el-row>
    <el-row>
      <Projects :height="height" :width="width" :projects="filteredProjects" />
    </el-row>
    <SidePanel />
  </div>
</template>

<script>
import projects from "@/projects.json";
import { FILTERS, PARAMS } from "../constants";

import Projects from "@/components/Projects";
import SidePanel from "@/components/SidePanel";
import Filters from "@/components/Filters";

export default {
  name: "Body",
  components: {
    Projects,
    SidePanel,
    Filters,
  },
  props: {
    height: Number,
    width: Number,
  },
  data() {
    return {
      projects: [],
      filters: FILTERS,
      params: PARAMS,
    };
  },
  mounted() {
    this.projects = projects.students;
    this.populateFilters();
  },
  computed: {
    filteredProjects() {
      if (!this.projects.length) {
        return [];
      }
      const { TAG, YEAR, SEARCH } = this.filters;
      const { SORT } = this.params;
      const sortParam = SORT.selected;
      const isSortAsc = SORT.asc;
      console.log(sortParam, isSortAsc);
      return this.projects
        .filter(
          (d) =>
            d.year >= YEAR.selected[0] &&
            d.year <= YEAR.selected[1] &&
            (!TAG.selected.length ||
              TAG.selected.some((tag) => d.tags.includes(tag))) &&
            (!SEARCH.selected ||
              d.name.indexOf(SEARCH.selected) !== -1 ||
              d.title.indexOf(SEARCH.selected) !== -1 ||
              d.description.indexOf(SEARCH.selected) !== -1)
        )
        .sort((a, b) => {
          const val =
            a[sortParam] > b[sortParam]
              ? 1
              : a[sortParam] < b[sortParam]
              ? -1
              : 0;
          return isSortAsc ? val : -1 * val;
        });
    },
  },
  methods: {
    onFilterChange(id, selected) {
      if (id === "TAG") {
        this.filters = {
          ...this.filters,
          TAG: {
            ...this.filters.TAG,
            selected,
          },
        };
      }
      if (id === "YEAR") {
        this.filters = {
          ...this.filters,
          YEAR: {
            ...this.filters.YEAR,
            selected: [
              Math.min(selected, this.filters.YEAR.options[0]),
              Math.max(selected, this.filters.YEAR.options[1]),
            ],
          },
        };
      }
      if (id === "SEARCH") {
        this.filters = {
          ...this.filters,
          SEARCH: {
            ...this.filters.SEARCH,
            selected,
          },
        };
      }
      if (id === "SORT") {
        this.params = {
          ...this.params,
          SORT: {
            ...this.params.SORT,
            selected,
            asc: true,
          },
        };
      }
      if (id === "SORT_DIRECTION") {
        this.params = {
          ...this.params,
          SORT: {
            ...this.params.SORT,
            asc: !this.params.SORT.asc,
          },
        };
      }
    },
    populateFilters() {
      if (!this.projects) {
        return;
      }
      let allTags = [];
      let yearRange = [Infinity, -Infinity];
      for (let i = 0; i < this.projects.length; i++) {
        const { tags, year } = this.projects[i];
        allTags = [...allTags, ...tags];
        yearRange = [
          Math.min(year, yearRange[0]),
          Math.max(year, yearRange[1]),
        ];
      }
      this.filters = {
        ...this.filters,
        TAG: {
          ...this.filters.TAG,
          options: [...new Set(allTags)].sort(),
        },
        YEAR: {
          ...this.filters.YEAR,
          options: yearRange,
          selected: yearRange,
        },
      };
    },
  },
};
</script>

<style></style>
