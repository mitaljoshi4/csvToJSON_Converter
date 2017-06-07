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
                        console.log("canvas generated.");
                        $("#updateBtnDiv").show();
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
    $("#downloadDiv").toggle();
});
$(document).on("click", "#seeAllCanvas", function () {
    $("#iconCanvas").show();
});
$(document).on("click", "#downloadIcons", function () {
    generateFiles();
});
$(document).on("click", "#setBtn", function () {
    var qText = $.trim($("#quoteText").val());
    var qColor = $("#quoteColor").val();
    var bgColor = $("#canvasColor").val();
    if (mainCanvas) {
        mainCanvas.dispose();
        mdpiCanvas.dispose();
        hdpiCanvas.dispose();
        xhdpiCanvas.dispose();
        xxhdpiCanvas.dispose();
        xxxhdpiCanvas.dispose();
    }
    mainCanvas = createCanvas("mainCanvas", 100, qText, qColor, bgColor);
    mdpiCanvas = createStaticCanvas("mdpiCanvas", bgColor);
    hdpiCanvas = createStaticCanvas('hdpiCanvas', bgColor);
    xhdpiCanvas = createStaticCanvas("xhdpiCanvas", bgColor);
    xxhdpiCanvas = createStaticCanvas("xxhdpiCanvas", bgColor);
    xxxhdpiCanvas = createStaticCanvas("xxxhdpiCanvas", bgColor);
    updateAllCanvasOnChange();
});
$(document).ready(function () {
    $("#csv-file").change(handleFileSelect);
    $("#updateBtnDiv").hide();
    $("#iconCanvas").hide();
    $("#downloadDiv").hide();
});