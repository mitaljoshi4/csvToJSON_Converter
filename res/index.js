var data, mainCanvas, hdpiCanvas, mdpiCanvas, xhdpiCanvas, xxhdpiCanvas, xxxhdpiCanvas;
function handleFileSelect(evt) {
    var file = evt.target.files[0];
    if (file != undefined) {
        var ext = file.name.slice((file.name.lastIndexOf(".") - 1 >>> 0) + 2);
        console.log(ext);
        if (ext == 'csv') {
            Papa.parse(file, {
                header: true,
                dynamicTyping: true,
                complete: function (results) {
                    data = results;
                    var outputObj = {};
                    outputObj.quotes = results.data;
                    console.log(data);
                    console.log(data.meta.fields);
                    var arr = data.meta.fields;
                    if (arr.length == 4 && arr.indexOf("id") >= 0 && arr.indexOf("author") >= 0 && arr.indexOf("quote") >= 0 && arr.indexOf("wallpaper") >= 0) {
                        $("#status").html("Pass<br />").css("color", "green");
                        // console.log(quotes);
                        $("#status").append(JSON.stringify(outputObj, null, 4));
                        console.log(JSON.stringify(outputObj, null, 4));
                        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(outputObj));
                        setUrl($("#downloadJsonLink"), dataStr, "data.json");
                        mainCanvas = createCanvas("Team Quote", $("#downloadImageLink"), "mainCanvas", 100);
                        hdpiCanvas = createCanvas("Team Quote", $("#downloadMdpiLink"), "mdpiCanvas", 10);
                        mdpiCanvas = createCanvas("Team Quote", $("#downloadHdpiLink"), 'hdpiCanvas', 15);
                        xhdpiCanvas = createCanvas("Team Quote", $("#downloadXhdpiLink"), "xhdpiCanvas", 20);
                        xxhdpiCanvas = createCanvas("Team Quote", $("#downloadXxhdpiLink"), "xxhdpiCanvas", 30);
                        xxxhdpiCanvas = createCanvas("Team Quote", $("#downloadXxxhdpiLink"), "xxxhdpiCanvas", 40);
                        $("#updateBtnDiv").show();
                        console.log("canvas generated.");
                        updateAllCanvasOnChange();
                    }
                    else {
                        $("#status").html("Please choose file containing id,quote,author and wallpaper data.").css("color", "red");
                    }
                }
            });
        }
        else {
            $("#status").html("Please choose CSV file.").css("color", "red");
        }
    }
}
$(document).on("click", "#generateBtn", function () {
    // generateFiles();
    $("#downloadDiv").show();
});
$(document).on("click", "#seeAllCanvas", function () {
    $("#iconCanvas").toggle();
});
$(document).on("click", "#downloadIcons", function () {
    generateFiles();
});
$(document).ready(function () {
    $("#csv-file").change(handleFileSelect);
    $("#updateBtnDiv").hide();
    $("#iconCanvas").hide();
    $("#downloadDiv").hide();
});