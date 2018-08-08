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
                    createJSON(results, function (isSuccess, outputObj) {
                        if (isSuccess) {
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
                    })

                }
            });
        }
        else {
            $("#status").html("Please choose CSV file.").css("color", "red");
        }
    }
}

function createJSON(results, callback) {
    data = results;
    console.log(data);
    console.log(data.meta.fields);
    var arr = data.meta.fields;
    var outputObj = {};
    var quoteArray = [];
    var authorArray = [];
    var myData = data.data;
    if (arr.length == 9 && arr.indexOf("id") >= 0 && arr.indexOf("category") >= 0 && arr.indexOf("author") >= 0 && arr.indexOf("quote") >= 0 && arr.indexOf("wallpaper") >= 0 && arr.indexOf("authorid") >= 0 && arr.indexOf("authorbio") >= 0 && arr.indexOf("authorimage") >= 0 && arr.indexOf("authorshortbio") >= 0) {
        for (var i = 1; i <= myData.length; i++) {
            var j = i - 1;
            var quoteObj = {
                "id": myData[j].id,
                "quote": myData[j].quote,
                "author": myData[j].author,
                "wallpaper": myData[j].wallpaper,
                "author_id": ((myData[j].authorid != '') ? myData[j].authorid : 0),
                "category": myData[j].category
            }
            quoteArray.push(quoteObj);
            if (myData[j].authorid != "") {
                var authors = {
                    "author_id": myData[j].authorid,
                    "author_name": myData[j].author,
                    "author_shortDescription": myData[j].authorshortbio,
                    "author_bio": myData[j].authorbio,
                    "author_image": myData[j].authorimage
                }
                if (authorArray.length != 0) {
                    var isExists = false;
                    for (var k = 0; k < authorArray.length; k++) {
                        if (authorArray[k].author_id == myData[j].authorid) {
                            isExists = true;
                        } else {
                            if (k == (authorArray.length - 1) && isExists == false){
                                authorArray.push(authors);
                            }
                        }
                    }
                }else{
                    authorArray.push(authors);
                }
            }
        }
        outputObj.quotes = quoteArray;
        outputObj.authors = authorArray;
        callback(true, outputObj);
    } else {
        callback(false, {});
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