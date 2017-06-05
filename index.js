var data;
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
                        createCanvas("Team Quote", $("#downloadMdpiLink"), "mdpiCanvas",10);
                        createCanvas("Team Quote", $("#downloadHdpiLink"), 'hdpiCanvas',15);
                        createCanvas("Team Quote", $("#downloadXhdpiLink"), "xhdpiCanvas",20);
                        createCanvas("Team Quote", $("#downloadXxhdpiLink"), "xxhdpiCanvas",30);
                        createCanvas("Team Quote", $("#downloadXxxhdpiLink"), "xxxhdpiCanvas",40);
                        $("#downloadDiv").show();
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
function setUrl(element, path, filename) {
    $(element).attr("href", path);
    $(element).attr("download", filename);
}
$(document).ready(function () {
    $("#csv-file").change(handleFileSelect);
    $("#downloadDiv").hide();
});