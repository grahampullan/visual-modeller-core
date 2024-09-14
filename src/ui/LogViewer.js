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
        const selectedLog = this.sharedStateByAncestorId[this.boardId].selectedLog;
        selectedLog.subscribe(this.highlightLog.bind(this));
        this.update();
    }

    update() {
        this.updateHeader();
        this.updatePlotAreaSize();

        const logs = this.data.logs || [];
        const selectedLog = this.sharedStateByAncestorId[this.boardId].selectedLog;

        const lines = [];
        logs.forEach(log => {
            const line = {};
            line.name = log.name;
            line.targetName = log.targetName;
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

        const xExtent = d3.extent(lineExtents.map(l=>l.x).flat());
        const yExtent = d3.extent(lineExtents.map(l=>l.y).flat());

        const x = d3.scaleLinear().domain(xExtent).range([0, width]);
        const y = d3.scaleLinear().domain(yExtent).range([height, 0]);

        let linePlotSvg = plotArea.select(".line-plot-svg");
        if (linePlotSvg.empty()) {
            linePlotSvg = plotArea.append("g")
                .attr("class", "line-plot-svg")
                .attr("transform", `translate(${margin.left}, ${margin.top})`)
                .style("pointer-events", "all");
        }
        
        const line = d3.line()
            .x(d => x(d.x))
            .y(d => y(d.y));

        
        const allLines = linePlotSvg.selectAll(".line")
            .data(lines, d => d.name);


        allLines.enter()
            .each(function(d) {
                d3.select(this).append("g")
                    .attr("class", "line")
                    .append("path")
                        .attr("class", "line-path")
                        .attr("d", d =>line(d.pts))
                        .attr("stroke", d => d3.schemeTableau10[d.colorIndex])
                        .attr("fill", "none")
                        .attr("stroke-width", 2)
                        .on("mouseover", tipOn);

            });

        allLines
            .each(function(d) {
                d3.select(this).select("path")
                    .attr("d", d =>line(d.pts))
                    .attr("stroke", d => d3.schemeTableau10[d.colorIndex]);
            });

        allLines.exit().remove();

        const xAxis = d3.axisBottom(x);
        const yAxis = d3.axisLeft(y);

        let gX = linePlotSvg.select(".x-axis");
        if (gX.empty()) {
            gX = linePlotSvg.append("g")
                .attr("class", "x-axis")
                .attr("transform", `translate(0, ${height})`)
                .call(xAxis);
        } else {

            gX.call(xAxis);
        }

        let gY = linePlotSvg.select(".y-axis");
        if (gY.empty()) {
            gY = linePlotSvg.append("g")
                .attr("class", "y-axis")
                .call(yAxis);
        } else {
            gY.call(yAxis);
        }
            
        function tipOn(event, d) {
            selectedLog.state = {name: d.name, targetName: d.targetName};
        };
    
    }

    highlightLog(data) {
        const logName = data.name;
        const plotArea = d3.select(`#${this.plotAreaId}`);
        const allLines = plotArea.selectAll(".line");
        allLines.each(function(d) {
            if (d.name == logName) {
                d3.select(this).select("path")
                    .attr("stroke-width", 4);
            } else {
                d3.select(this).select("path")
                    .attr("stroke-width", 2);
            }
        });
    }

    
}

export { LogViewer };