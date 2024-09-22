import { Plot } from './Plot.js';
import * as d3 from './d3-re-export.js';

class NodeInspector extends Plot {
    constructor(options) {
        options = options || {};
        super(options);
    }

    make() {
        this.updateHeader();
        this.addPlotAreaDiv();
        const selectedNode= this.sharedStateByAncestorId[this.boardId].selectedNode;
        selectedNode.subscribe(this.update.bind(this));
        const plotArea = d3.select(`#${this.plotAreaId}`);
        plotArea.style("pointer-events", "all");
        plotArea.append("div")
            .attr("id", "sliders")
            .style("pointer-events", "all");
    }

    update() {
        const selectedNode = this.sharedStateByAncestorId[this.boardId].selectedNode;
        const nodeName = selectedNode.state.name;
        const modelName = this.sharedStateByAncestorId[this.boardId].modelName;
        const model = this.sharedStateByAncestorId["context"].models.find( model => model.name == modelName );
        const node = model.nodes.find( node => node.name == nodeName );

        const requestSetNodeStateData = this.sharedStateByAncestorId[this.boardId].requestSetNodeStateData;
        const requestRunModelAndUpdateViews = this.sharedStateByAncestorId[this.boardId].requestRunModelAndUpdateViews;

        const plotArea = d3.select(`#${this.plotAreaId}`);

        plotArea.select(".node-title").remove();
        const nodeTitle = plotArea.append("div")
            .attr("class", "node-title")
            .style("font-size", "16px")
            .style("font-weight", "bold")
            .style("margin-top", "5px")
            .style("margin-bottom", "2px")
            .text(nodeName);

        plotArea.select(".sliders").remove();
        const slidersContainer = plotArea.append("div")
            .attr("class", "sliders")

        const sliderData = Object.entries(node.state).map(([key, value]) => {
            return {name: key, value: value, min: 0., max: 2*value};
        });


        const sliders = slidersContainer.selectAll(".slider-container")
            .data(sliderData);

        sliders
            .join(
                // Enter selection: append new slider containers for new data
                enter => {
                    const container = enter.append("div")
                        .attr("class", "slider-container")
                        .style("display", "flex")
                        .style("flex-direction", "column")
                        .style("padding", "10px 0");

                    // Add name label for the parameter
                    container.append("div")
                        .attr("class", "slider-label")
                        .text(d => d.name)
                        .style("font-size", "12px")
                        .style("font-weight", "bold")
                        //.style("margin-bottom", "5px")
                        .style("text-align", "left");

                    const sliderWrapper = container.append("div")
                        .attr("class", "slider-wrapper")
                        .style("display", "flex")
                        .style("align-items", "center")
                        .style("gap", "10px");


                    // Add the range slider
                    sliderWrapper.append("input")
                        .attr("type", "range")
                        .attr("class", "slider")
                        .attr("id", d => `slider-${d.name}`)
                        .attr("min", d => d.min)
                        .attr("max", d => d.max)
                        .attr("value", d => d.value)
                        .attr("step", d=>(d.max - d.min) / 200)
                        .style("width", "200px")
                        .on("input", function(event, d) {
                            // Update displayed value
                            d3.select(`#value-${d.name}`).text(this.value);
                            updateSliderRange(d.name);
                        });

                    // Add label to show current slider value
                    sliderWrapper.append("div")
                        .attr("class", "slider-value")
                        .attr("id", d => `value-${d.name}`)
                        .style("font-size", "14px")
                        .style("min-width", "50px")
                        .style("text-align", "center")
                        .text(d => d.value);
                },
              
                // Exit selection: remove any sliders that no longer have corresponding data
                exit => exit.remove()
            );

        




        // Function to update sliders based on the bound data
        function updateSliderRange(key) {
            
            const currentValue = +d3.select(`#slider-${key}`).node().value;

            requestSetNodeStateData.state = {nodeName: nodeName, key: key, value: currentValue};
            requestRunModelAndUpdateViews.state = true;
            



        }

    }

}

export { NodeInspector };