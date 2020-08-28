document.getElementById('theform').onsubmit = function() {
    event.preventDefault();
    var t0 = performance.now()
    var input = document.getElementById('dataBox').value;

    const response = JSON.parse(input);
    var selectionArray = [];
    for ( var selection in response.selections) {
        selectionArray.push(response.selections[selection]);
    }

    var totals = [];
    for ( var group in response.groups) {
        var groupArray = response.groups[group];
        var length = groupArray.length;
        console.log(groupArray);
        var countMatched = 0;
        var selectionIndex = 0;
        for (selectionIndex = 0; selectionIndex < selectionArray.length; ++selectionIndex ) {
            for (var z=0;z<length;z++) {
                if (groupArray[z] == selectionArray[selectionIndex]) {
                    countMatched++;
                }
            }
        }
        totals.push({
            "group": group,
            "count": countMatched
        });
    }

    var maxCount = Math.max(...totals.map(e => e.count));
    var obj = totals.find(group => group.count === maxCount);
    var output = Object.entries(obj);
    document.getElementById("results").innerHTML = "<h3>The group with the highest number of matches was " + output[0][1] + " with " + output[1][1] + " matches<h3>";
    var t1 = performance.now();
    var timer = t1 - t0;
    document.getElementById("timer").innerHTML = "<h3>The code took " + timer + " milliseconds to execute";
};
