import { Plot } from './Plot.js';
import * as d3 from './d3-re-export.js';

class LogViewer extends Plot {
    constructor(options) {
        options = options || {};
        super(options);
    }

    make() {
        this.updateHeader();
        this.addPlotAreaSvg();
        this.update();
    }

    update() {
        this.updateHeader();
        this.updatePlotAreaSize();

        const logs = this.data.logs || [];

        const lines = [];
        logs.forEach(log => {
            line = {};
            line.name = log.name;
            line.target = log.target;
            line.colorIndex = log.colorIndex;
            const pts = log.states.map((state, i) => {
                return {x: i, y: state.value};
            });
            line.pts = pts;
            lines.push(line);
        });

        const plotArea = d3.select(`#${this.plotAreaId}`);
        const plotAreaWidth = this.plotAreaWidth;
        const plotAreaHeight = this.plotAreaHeight;
        const margin = {top: 20, right: 20, bottom: 30, left: 50};
        const width = plotAreaWidth - margin.left - margin.right;
        const height = plotAreaHeight - margin.top - margin.bottom;

        const lineExtents = lines.map(line => {
            return {
                x: d3.extent(line.pts, d => d.x),
                y: d3.extent(line.pts, d => d.y)
            };
        });
        const xExtent = d3.extent(lineExtents, d => d.x);
        const yExtent = d3.extent(lineExtents, d => d.y);
        const x = d3.scaleLinear().domain(xExtent).range([0, width]);
        const y = d3.scaleLinear().domain([0,yExtent[1]]).range([height, 0]);

        const linePlotSvg = plotArea.append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);
        
        const line = d3.line()
            .x(d => x(d.x))
            .y(d => y(d.y));

        const allLines = linePlotSvg.selectAll(".line")
            .data(lines, d => d.name);



        allLines.enter()
            .each(function(d) {
                d3.select(this).append("path")
                    .datum(d.pts)
                    .attr("class", "line")
                    .attr("d", line)
                    .attr("stroke", d => d3.schemeTableau10[d.colorIndex])
                    .attr("fill", "none")
                    .attr("stroke-width", 2);
            });

        allLines
            .each(function(d) {
                d3.select(this).select("path")
                    .datum(d.pts)
                    .attr("d", line)
                    .attr("stroke", d => d3.schemeTableau10[d.colorIndex]);
            });

        allLines.exit().remove();

        const xAxis = d3.axisBottom(x);
        const yAxis = d3.axisLeft(y);

        linePlotSvg.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(xAxis);

        linePlotSvg.append("g")
            .call(yAxis);
    
    }

    
}

export { LogViewer };