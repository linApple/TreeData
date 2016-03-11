(function(window) {

    function arrSwap(arr, x, y) {
        var tmp = arr[x];
        arr[x] = arr[y];
        arr[y] = tmp;
    }

    function bubbleSort(arr) {
        var tmp;
        for (var i = 0; i < arr.length; i++) {
            for (var j = 0; j < arr.length - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    arrSwap(arr, j, j + 1);
                }
            }
        }
    }

    window.arrSort = {
        bubble: bubbleSort
    };


}(window))
