<template>
  <div class="filter year-filter">
    <div class="label">Filter by year</div>
    <svg :height="`${filterHeight}px`" :width="`${width}px`">
      <g class="year-bars-all">
        <rect
          v-for="bar in yearData.all"
          :key="`all_${bar[0]}`"
          :x="xScale(bar[0]) + 2"
          :y="filterHeight - yScale(bar[1])"
          :height="yScale(bar[1])"
          :width="xScale.bandwidth()"
        />
      </g>
      <g class="year-bars-filtered">
        <rect
          v-for="bar in yearData.filtered"
          :key="`all_${bar[0]}`"
          :x="xScale(bar[0]) + 2"
          :y="filterHeight - yScale(bar[1])"
          :height="yScale(bar[1])"
          :width="xScale.bandwidth()"
        />
      </g>
      <g class="year-labels">
        <text
          v-for="text in yearData.all"
          :key="text[0]"
          :x="xScale(text[0]) + xScale.bandwidth() / 2 + 2"
          :y="filterHeight - 3"
        >
          {{ text[0] }}
        </text>
      </g>
      <g class="year-brush" ref="yearBrush"></g>
    </svg>
  </div>
</template>

<script>
import { select } from "d3-selection";
import { scaleLinear, scaleBand } from "d3-scale";
import { max, bisectCenter } from "d3-array";
import { brushX } from "d3-brush";
export default {
  name: "BarFilter",
  data() {
    return {
      width: 250,
    };
  },
  props: {
    yearData: Object,
    filterHeight: Number,
    onYearChange: Function,
  },
  computed: {
    xScale() {
      return scaleBand()
        .domain(this.yearData.all.map((d) => d[0]))
        .range([0, this.width])
        .paddingInner(0.1);
    },
    yScale() {
      return scaleLinear()
        .domain([0, max(this.yearData.all, (d) => d[1])])
        .range([0, this.filterHeight]);
    },
    brush() {
      return brushX().on("end", this.brushed);
    },
  },
  mounted() {
    select(this.$refs.yearBrush).call(this.brush);
  },
  methods: {
    brushed({ selection, sourceEvent }) {
      if (!sourceEvent) {
        return;
      }
      const domain = this.xScale.domain();
      if (selection && selection.length) {
        const fullRange = [...domain.map(this.xScale), this.xScale.range()[1]];
        const newSelection = [
          domain[bisectCenter(fullRange, selection[0])],
          domain[bisectCenter(fullRange, selection[1]) - 1], // correct for index
        ];
        this.onYearChange(newSelection);
        select(this.$refs.yearBrush).call(
          this.brush.move,
          [newSelection[0], newSelection[1] + 1].map(this.xScale) // correct for brush stopping at left of bar
        );
      } else {
        this.onYearChange([domain[0], domain[domain.length - 1]]);
      }
    },
  },
};
</script>

<style>
.label {
  font-size: 11px;
  text-align: left;
  padding-bottom: 5px;
}

.year-bars-all rect {
  fill: #dddddd;
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
