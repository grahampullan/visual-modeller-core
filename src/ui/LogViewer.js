import { Plot } from './Plot.js';
import * as d3 from './d3-re-export.js';
import { faChartColumn, faChartLine  } from '@fortawesome/free-solid-svg-icons';


class LogViewer extends Plot {
    constructor(options) {
        options = options || {};
        super(options);
        this.linePlot = true;
        this.barPlot = false;   
    }

    make() {
        this.icons = [];
        const boundLinePlotSelected = this.linePlotSelected.bind(this);
        const boundBarPlotSelected = this.barPlotSelected.bind(this);
        this.icons.push( {icon: faChartLine, id:"line-icon", action:boundLinePlotSelected } );
        this.icons.push( {icon: faChartColumn, id:"bar-icon", action:boundBarPlotSelected } );
        this.updateHeader();
        this.addPlotAreaSvg();
        const selectedLog = this.sharedStateByAncestorId[this.boardId].selectedLog;
        selectedLog.subscribe(this.highlightLog.bind(this));
        this.setPlotIconBackground();
        this.update();
    }

    update() {
        this.updateHeader();
        this.updatePlotAreaSize();

        const logs = this.data.logs || [];
        const selectedLog = this.sharedStateByAncestorId[this.boardId].selectedLog;

        const modelName = this.sharedStateByAncestorId[this.boardId].modelName;
        const modelConfig = this.sharedStateByAncestorId["context"].models.find( model => model.name == modelName ).config;
        const timeStepSize = modelConfig.timeStepSize || 1;
        const timeIntegrationUnitFactor = modelConfig.timeIntegrationUnitFactor || 1;
        
        const lines = [];
        const bars = [];
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
            const bar = {};
            bar.name = log.name;
            bar.targetName = log.targetName;
            bar.colorIndex = log.colorIndex;
            bar.value = log.states.reduce((acc, curr, index) => {
                if ( index === 0 ) return acc;
                const previous = log.states[index-1];
                return acc + (curr.value + previous.value) / 2 * timeStepSize;
            }, 0);
            bar.value /= timeIntegrationUnitFactor;
            bars.push(bar);

        });

        const plotArea = d3.select(`#${this.plotAreaId}`);
        const plotAreaWidth = this.plotAreaWidth;
        const plotAreaHeight = this.plotAreaHeight;

        if (this.linePlot) {
  
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
            let barChartSvg = plotArea.select(".bar-chart-svg");
            barChartSvg.remove();

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
                            .on("mouseenter", tipOn)
                            .on("mouseleave", tipOff);
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
        }

        if (this.barPlot) {
            const margin = {top: 20, right: 20, bottom: 30, left: 40};
            const width = plotAreaWidth - margin.left - margin.right;
            const height = plotAreaHeight - margin.top - margin.bottom;

            const barExtent = d3.extent(bars.map(b => b.value));

            const x = d3.scaleBand()
                .domain(bars.map(b => b.name))
                .range([0, width])
                .padding(0.1);

            const y = d3.scaleLinear()
                .domain([0, barExtent[1]])
                .range([height, 0]);

            let linePlotSvg = plotArea.select(".line-plot-svg");
            let barChartSvg = plotArea.select(".bar-chart-svg");
            linePlotSvg.remove();

            if (barChartSvg.empty()) {
                barChartSvg = plotArea.append("g")
                    .attr("class", "bar-chart-svg")
                    .attr("transform", `translate(${margin.left}, ${margin.top})`)
                    .style("pointer-events", "all");
            }

            const barRects = barChartSvg.selectAll(".bar")
                .data(bars, d => d.name );

            barRects.enter()
                .append("rect")
                    .attr("class", "bar")
                    .attr("x", d => x(d.name))
                    .attr("y", d => y(d.value))
                    .attr("width", x.bandwidth())
                    .attr("height", d => height - y(d.value))
                    .attr("fill", d => d3.schemeTableau10[d.colorIndex])
                    .on("mouseenter", tipOn)
                    .on("mouseleave", tipOff);

            barRects
                .attr("x", d => x(d.name))
                .attr("y", d => y(d.value))
                .attr("width", x.bandwidth())
                .attr("height", d => height - y(d.value));

            barRects.exit().remove();

            const xAxis = d3.axisBottom(x);
            const yAxis = d3.axisLeft(y);

            let gX = barChartSvg.select(".x-axis");
            if (gX.empty()) {
                gX = barChartSvg.append("g")
                    .attr("class", "x-axis")
                    .attr("transform", `translate(0, ${height})`)
            }
            gX.call(xAxis)
                .selectAll("text")
                .attr("y", 0)
                .attr("x", 0)
                .attr("dy", ".35em")
                .attr("transform", "translate(0, 10)")
                .style("text-anchor", "middle")
                .call(wrapText, x.bandwidth());

            let gY = barChartSvg.select(".y-axis");
            if (gY.empty()) {
                gY = barChartSvg.append("g")
                    .attr("class", "y-axis")
            }
            gY.call(yAxis);
        }

        function tipOn(event, d) {
            selectedLog.state = {name: d.name, targetName: d.targetName};
        };

        function tipOff(event, d) {
            selectedLog.state = {name: null, targetName: null};
        }

        function wrapText(text, width) {
            text.each(function () {
                const textElement = d3.select(this);
                const words = textElement.text().split(/\s+/).reverse();
                let word,
                    line = [],
                    lineNumber = 0,
                    lineHeight = 1.1, // ems
                    y = textElement.attr("y"),
                    dy = parseFloat(textElement.attr("dy")),
                    tspan = textElement.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", `${dy}em`);

                while ((word = words.pop())) {
                    line.push(word);
                    tspan.text(line.join(" "));
                    if (tspan.node().getComputedTextLength() > width) {
                        line.pop();
                        tspan.text(line.join(" "));
                        line = [word];
                        tspan = textElement.append("tspan")
                            .attr("x", 0)
                            .attr("y", y)
                            .attr("dy", `${++lineNumber * lineHeight + dy}em`)
                            .text(word);
                    }
                }
            });
        }
    }

    highlightLog(data) {
        const logName = data.name;
        const plotArea = d3.select(`#${this.plotAreaId}`);
        const allLines = plotArea.selectAll(".line");
        allLines.each(function(d) {
            if (d.name == logName) {
                d3.select(this).select("path").attr("stroke-width", 4);
            } else {
                d3.select(this).select("path").attr("stroke-width", 2);
            }
        });
        const allBars = plotArea.selectAll(".bar");
        allBars.each(function(d) {
            if (d.name == logName || !logName) {
                d3.select(this).style("opacity", 1);
            } else {
                d3.select(this).style("opacity", 0.6);
            }
        });

    }

    setPlotIconBackground() {
        const container = d3.select(`#${this.id}`);
        const iconContainer = container.select(".plot-icons");
        const lineIcon = iconContainer.select("#line-icon");
        const barIcon = iconContainer.select("#bar-icon");
        if (this.linePlot) {
            lineIcon.style("color", "black");
            barIcon.style("color", "gray");
        }
        if (this.barPlot) {
            lineIcon.style("color", "gray");
            barIcon.style("color", "black");
        }
    }

    linePlotSelected() {
        this.linePlot = true;
        this.barPlot = false;
        this.setPlotIconBackground();
        this.update();
    }

    barPlotSelected() {
        this.linePlot = false;
        this.barPlot = true;
        this.setPlotIconBackground();
        this.update();
    }
    
}

export { LogViewer };