import { Plot } from './Plot.js';
import * as d3 from './d3-re-export.js';

class NodePlot extends Plot {
    constructor(options) {
        options = options || {};
        super(options);
        this.layout.nodeBoxMargin = this.layout.nodeBoxMargin || 7;
        this.layout.socketRadius = this.layout.socketRadius || 5;
        this.name = options.name || "node name";
        this.data.sockets.forEach( socket => {
            socket.cenLast = {x: 0, y: 0};
        });
    }

    make() {
        this.addPlotAreaSvg();
        this.update();
    }

    update() {
        const node = this.data;
        const container = d3.select(`#${this.id}`);
		const plotArea = container.select(".plot-area");
        const parentId = this.ancestorIds[this.ancestorIds.length - 1];
        const socketAbsolutePositions = this.sharedStateByAncestorId[parentId].socketAbsolutePositions;
        const selectedNode = this.sharedStateByAncestorId[this.boardId].selectedNode;

        this.updatePlotAreaSize();

        const nodeBoxMargin = this.layout.nodeBoxMargin;
        const nodeRectWidth = this.plotAreaWidth - 2 * nodeBoxMargin;
        const nodeRectHeight = this.plotAreaHeight - 2 * nodeBoxMargin;
        let nodeRect = plotArea.select(".node-rect");
        let nodeTitle = plotArea.select(".node-title");
        if (nodeRect.empty()) {
            nodeRect = plotArea.append("rect")
                .attr("class", "node-rect")
                .attr("x", nodeBoxMargin)
                .attr("y", nodeBoxMargin)
                .attr("fill", d3.schemeTableau10[node.colorIndex])
                .attr("stroke", "black")
                .attr("stroke-width", 2)
                .attr("rx", 10)
                .style("pointer-events", "all")
                .on("click", () => {selectedNode.state = {name: node.name};});
            nodeTitle = plotArea.append("text")
                .attr("class", "node-title")
                .attr("x", nodeRectWidth/2. + nodeBoxMargin )
                .attr("y", nodeRectHeight/2. + nodeBoxMargin )
                .attr("font-size", "16px")
                .attr("text-anchor", "middle")
                .attr("dominant-baseline", "middle")
                .text(node.name);
        }
        nodeRect
            .attr("width", nodeRectWidth)
            .attr("height", nodeRectHeight);

        nodeTitle
            .attr("x", nodeRectWidth/2 + this.layout.nodeBoxMargin )
            .attr("y", nodeRectHeight/2 + this.layout.nodeBoxMargin );

        const allSockets = node.sockets;
        const leftSockets = allSockets.filter(socket => socket.position == "left");
        const rightSockets = allSockets.filter(socket => socket.position == "right");
        const topSockets = allSockets.filter(socket => socket.position == "top");
        const bottomSockets = allSockets.filter(socket => socket.position == "bottom");
        const centreSockets = allSockets.filter(socket => socket.position == "centre");

        const leftSocketSpacing = nodeRectHeight / (leftSockets.length + 1);
        const rightSocketSpacing = nodeRectHeight / (rightSockets.length + 1);
        const topSocketSpacing = nodeRectWidth / (topSockets.length + 1);
        const bottomSocketSpacing = nodeRectWidth / (bottomSockets.length + 1);

        const normalLength = 140;

        leftSockets.forEach((socket, index) => {
            const socketY = (index + 1) * leftSocketSpacing + nodeBoxMargin;
            socket.cen = {x: nodeBoxMargin, y: socketY};
            socket.normal = {x: nodeBoxMargin - normalLength, y: socketY};
            checkSocketMove(socket);
        });
        rightSockets.forEach((socket, index) => {
            const socketY = (index + 1) * rightSocketSpacing + nodeBoxMargin;
            socket.cen = {x: nodeRectWidth + nodeBoxMargin, y: socketY};
            socket.normal = {x: nodeRectWidth + nodeBoxMargin + normalLength, y: socketY};
            checkSocketMove(socket);
        });
        topSockets.forEach((socket, index) => {
            const socketX = (index + 1) * topSocketSpacing + nodeBoxMargin;
            socket.cen = {x: socketX, y: nodeBoxMargin};
            socket.normal = {x: socketX, y: nodeBoxMargin - normalLength};
            checkSocketMove(socket);
        });
        bottomSockets.forEach((socket, index) => {
            const socketX = (index + 1) * bottomSocketSpacing + nodeBoxMargin;
            socket.cen = {x: socketX, y: nodeRectHeight + nodeBoxMargin};
            socket.normal = {x: socketX, y: nodeRectHeight + nodeBoxMargin + normalLength};
            checkSocketMove(socket);
        });

        const sockets = plotArea.selectAll(".socket")
            .data(allSockets, d => d.name);
        sockets.enter()
            .append("circle")
            .attr("class", "socket")
            .attr("r", this.layout.socketRadius)
            .attr("fill", "white")
            .attr("stroke", "black")
            .attr("stroke-width", 2)
            .attr("cx", d => d.cen.x)
            .attr("cy", d => d.cen.y);
        sockets
            .attr("cx", d => d.cen.x)
            .attr("cy", d => d.cen.y);
        sockets.exit().remove();        


        function checkSocketMove(socket) {
            let socketMoved = false;
            const rect = plotArea.node().getBoundingClientRect();
            const cenXAbs = socket.cen.x + rect.left;
            const cenYAbs = socket.cen.y + rect.top;
            const xMove = Math.abs(cenXAbs - socket.cenLast.x) > 0.5;
            const yMove = Math.abs(cenYAbs - socket.cenLast.y) > 0.5;
            if (xMove || yMove) {
                socketMoved = true;
            }

            if (socketMoved) {
                socket.cenLast = {x: cenXAbs, y: cenYAbs};
                const cen = {x:cenXAbs, y:cenYAbs};
                const normal = {x: socket.normal.x + rect.left, y: socket.normal.y + rect.top};
                socketAbsolutePositions.find( s => s.socketName == socket.name).position.state = {socketName: socket.name, cen, normal};
            }
        }

    }
}

export { NodePlot };