(function(window, $) {
    "use strict";
    var constant = {
        node: {},
        nodeHtml: {},
        lineHtml: {},
        minDis: 0, //底层间距
        height: 0, //每层高度
        level: 0 //高度，从1开始
    };

    function getY(h) {
        return h * constant.height;
    }

    function getX(h, j) {
        function getStartY(h) {
            if (h == constant.level - 1)
                return 0;
            return getStartY(h + 1) + 0.5 * Math.pow(2, constant.level - h - 2) * constant.minDis;
        }
        return getStartY(h) + Math.pow(2, constant.level - h - 1) * constant.minDis * (j - 1);
    }

    function TreeGraphy(node, minDis, height, level) {
        constant.node = node;
        constant.minDis = minDis;
        constant.height = height;
        constant.level = level;
        $.ajax({
            url: "templete/node.html",
            type: "get",
            async: false,
            success: function(data) {
                constant.nodeHtml = $(data);
            }
        });
        $.ajax({
            url: "templete/line.html",
            type: "get",
            async: false,
            success: function(data) {
                constant.lineHtml = $(data);
            }
        });
    }

    TreeGraphy.prototype.start = function() {
        function traverse(node, h, j) {
            if (!$.isEmptyObject(node.left)) {
                traverse(node.left, h + 1, 2 * j - 1);
            }
            var nodeHtml = constant.nodeHtml.clone();
            var l = (node.key + "").length;
            if (l == 1) {
                nodeHtml.find("text").attr("x", 15);
            } else if (l == 2) {
                nodeHtml.find("text").attr("x", 10);
            } else {
                nodeHtml.find("text").attr("x", 5);
            }
            nodeHtml.find("text").text(node.key);
            var top = getY(h),
                left = getX(h, j);
            nodeHtml.css("top", top + "px").css("left", left + "px");
            node.y = top;
            node.x = left;
            $("body").after(nodeHtml);
            if (!$.isEmptyObject(node.right)) {
                traverse(node.right, h + 1, 2 * j);
            }
        }

        function dravelLine(node) {
            if (!$.isEmptyObject(node.left)) {
                var nodeHtml = constant.lineHtml.clone();
                nodeHtml
                    .css("top", node.y + 20)
                    .css("left", node.left.x + 20)
                    .attr("width",node.x -node.left.x-40)
                    .attr("height",node.left.y-node.y-40)
                    .find("line")
                    .attr("x1", node.x -node.left.x-40)
                    .attr("y1", 0)
                    .attr("x2", 0)
                    .attr("y2", node.left.y-node.y-40);
                $("body").after(nodeHtml);
                dravelLine(node.left);
            }
            if (!$.isEmptyObject(node.right)) {
                var nodeHtml = constant.lineHtml.clone();
                nodeHtml.find("line").attr("x1", node.x + 20).attr("y1", node.y + 20).attr("x2", node.right.x - 20).attr("y2", node.right.y - 20);
                nodeHtml
                    .css("top", node.y + 20)
                    .css("left", node.x + 20)
                    .attr("width",node.right.x -node.x-40)
                    .attr("height",node.right.y-node.y-40)
                    .find("line")
                    .attr("x1", 0)
                    .attr("y1", 0)
                    .attr("x2", node.right.x -node.x-40)
                    .attr("y2", node.right.y-node.y-40);
                $("body").after(nodeHtml);
                dravelLine(node.right);
            }
        }
        traverse(constant.node, 0, 1);
        dravelLine(constant.node);
    }

    window.TreeGraphy = TreeGraphy;


}(window, jQuery))
