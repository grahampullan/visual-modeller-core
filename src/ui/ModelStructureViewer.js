import { Plot } from './Plot.js';
import { Box } from './Box.js';
import { NodePlot } from './NodePlot.js';
import { Observable } from 'board-box';
import * as d3 from './d3-re-export.js';

class ModelStructureViewer extends Plot {
    constructor(options) {
        options = options || {};
        super(options);
    }

    make() {
        this.updateHeader();
        this.addPlotAreaSvg();
        this.updateHeader();
  
        const sockets = this.data.nodes.map( node => node.sockets ).flat();
        const socketAbsolutePositions = sockets.map( socket => 
            { 
                const obs = new Observable({state:{socketName: socket.name, cen: null, normal:null}});
                obs.subscribe( this.drawLink.bind(this) );
                return {socketName: socket.name, position: obs} 
            });
        this.sharedState.socketAbsolutePositions = socketAbsolutePositions;

        const plotArea = d3.select(`#${this.plotAreaId}`);
        plotArea.append("defs").append("marker")
            .attr("id", "arrowhead")
            .attr("viewBox", "-10 -10 20 20")
            .attr("refX", 10)
            .attr("refY", 0)
            .attr("markerWidth", 10)
            .attr("markerHeight", 10)
            .attr("orient", "auto")
            .append("path")
                .attr("d", "M-6,-6 L6,0 L-6,6 Z")
                .attr("fill", "black");


        this.update();
    }

    update() {
        const nodes = this.data.nodes || [];
        const links = this.data.links || [];

        const nodeNamesInData = nodes.map(node => node.name);
        const currentBoxes = this.sharedState.boxes || [];
        const currentNodeNames = currentBoxes.map(box => box.name);
        const nodeNamesToAdd = nodeNamesInData.filter(name => !currentNodeNames.includes(name));
        const nodeNamesToRemove = currentNodeNames.filter(name => !nodeNamesInData.includes(name));
        const boxesToRemove = currentBoxes.filter( box => nodeNamesToRemove.includes( box.name ) ).map( box => box.boxId );
        const boxesToAdd = [];
        nodeNamesToAdd.forEach( name => {
            const node = nodes.find( node => node.name == name );
            const position = node.position;
            const box=new Box({x: position.x, y: position.y, width: position.width, height: position.height, componentMargin:{top:0, left:0, bottom:0, right:0}, name: node.name, className: "node-plot", component: new NodePlot({data:node, name:node.name}) });
            boxesToAdd.push(box);
        });
        this.sharedState.requestUpdateBoxes.state = {boxesToRemove, boxesToAdd};


    }

    drawLink(data) {
        const socketName = data.socketName;
        const thisSocketCen = data.cen;
        const thisSocketNormal = data.normal;

        const link = this.data.links.find( link => link.socketNames.includes(socketName) );
        const otherSocketName = link.socketNames.find( name => name != socketName );
        const socketAbsolutePositions = this.sharedState.socketAbsolutePositions;
        const otherSocketPosition = socketAbsolutePositions.find( s => s.socketName == otherSocketName).position.state;
        const otherSocketCen = otherSocketPosition.cen;
        const otherSocketNormal = otherSocketPosition.normal;
        let firstSocketCen, firstSocketNormal, secondSocketCen, secondSocketNormal;
        if ( socketName == link.socketNames[0] ) {
            firstSocketCen = thisSocketCen;
            firstSocketNormal = thisSocketNormal;
            secondSocketCen = otherSocketCen;
            secondSocketNormal = otherSocketNormal;
        } else {
            firstSocketCen = otherSocketCen;
            firstSocketNormal = otherSocketNormal;
            secondSocketCen = thisSocketCen;
            secondSocketNormal = thisSocketNormal;
        }
   
        if (otherSocketCen) {
            const plotArea = d3.select(`#${this.plotAreaId}`);
            const boundingRect = plotArea.node().getBoundingClientRect();
            const x0 = boundingRect.left;
            const y0 = boundingRect.top;
            const pathData = `M${firstSocketCen.x-x0},${firstSocketCen.y-y0} C${firstSocketNormal.x-x0},${firstSocketNormal.y-y0} ${secondSocketNormal.x-x0},${secondSocketNormal.y-y0} ${secondSocketCen.x-x0},${secondSocketCen.y-y0}`;
            const linkId = `${this.id}-${link.name.replace(/ /g, "-")}`;
            let linkPath = plotArea.select(`#${linkId}`);
            if (linkPath.empty()) {
                linkPath = plotArea.append("path")
                    .attr("id", linkId)
                    .attr("d", pathData)
                    .attr("fill", "none")
                    .attr("stroke", "black")
                    .attr("stroke-width", 2)
                    .attr("marker-end", "url(#arrowhead)");
            } else {
                linkPath.attr("d", pathData);
            }



        }
    }
}

export { ModelStructureViewer };