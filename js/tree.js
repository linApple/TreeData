(function(window, $) {
    "use strict";
    var defaultSet = {
        node: {},
        key: "",
        color: ""
    };


    function Node(key, left, right, color) {
        this.left = typeof left === "object" ? left : defaultSet.node;
        this.right = typeof right === "object" ? right : defaultSet.node;
        this.key = typeof key === "undefined" ? defaultSet.key : key;
        this.color = typeof color === "undefined" ? defaultSet.color : color;
    }


    function writeTree2(node) {
        node.left == defaultSet.node ? console.log(node.key) : writeTree2(node.left);
        if (node.left != defaultSet.node)
            console.log(node.key);
        if (node.right != defaultSet.node) {
            writeTree2(node.right);
        }
    }

    function getTreeHeight(node) {
        function fc(node, height) {
            if (typeof node == "undefined") {
                return height - 1;
            }
            if (node.left == defaultSet.node && node.right == defaultSet.node) {
                return height;
            }
            var leftHeight = fc(node.left, height+1);
            var rightHeight = fc(node.right, height+1);
            return leftHeight > rightHeight ? leftHeight : rightHeight;
        }
        return fc(node,1);
    }

    /*****生成二叉查找树*****/
    function createBinarySearTree(data, root) {
        var r = new Node(data[root]);
        var pointer = r;
        for (var i = 0; i < data.length; i++) {
            if (i == root)
                continue;
            var flag = true;
            pointer = r;
            while (flag) {
                if (data[i] == pointer.key) {
                    console.error("key重复");
                    return;
                }
                var p = data[i] > pointer.key ? pointer.right : pointer.left;
                if (p == defaultSet.node) {
                    var newNode = new Node(data[i]);
                    data[i] > pointer.key ? pointer.right = newNode : pointer.left = newNode;
                    flag = false;
                } else {
                    pointer = p;
                }
            }
        }
        return r;
    }


    window.treeCreator = {
        binarySear: createBinarySearTree,
        writeTree2: writeTree2,
        getTreeHeight:getTreeHeight
    };

}(window, jQuery))
