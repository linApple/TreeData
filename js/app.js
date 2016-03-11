(function(window, $) {
    "use strict";

    function createRandomNums(num) {
        var result = new Array();
        result[0] = Math.round(Math.random() * 1000);
        for (var i = 1; i < num; i++) {
            var flag = false;
            var b = Math.round(Math.random() * 1000);
            while (flag == false) {
                var m = 0;
                for (; m < i; m++) {
                    if (result[m] == b) {
                        b = Math.round(Math.random() * 1000);
                        break;
                    }
                }
                if (m >= i) {
                    flag = true;
                }
            }
            result[i] = b;
        }
        return result;
    }




    $(function() {
        var selector = {
            nodeNum: $("#nodeNum"),
            createGo: $("#createGo")
        };
        selector.createGo.click(function() {
            var num = parseInt(selector.nodeNum.val());
            if (num > 1000) {
                console.error("too large");
                return;
            }
            var arr = createRandomNums(num);
            var node = treeCreator.binarySear(arr, 0);
            treeCreator.writeTree2(node);


        });

    });



}(window, jQuery))
