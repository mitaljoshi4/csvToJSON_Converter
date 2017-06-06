
function setUrl(element, path, filename) {
    $(element).attr("href", path);
    $(element).attr("download", filename);
}
function createCanvas(iconText, element, canId, fontSize) {
    canvas = new fabric.Canvas(canId, {
        preserveObjectStacking: true
    });
    canvas.backgroundColor = '#efefef';
    var text = new fabric.Text("Team\nQuotes", {
        fontSize: fontSize,
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        fill: 'Blue',
        statefullCache: true,
        transparentCorners: false,
        textAlign: 'center'
    });
    canvas.add(text);
    text.center();
    canvas.renderAll();
    return canvas;
}
function updateAllCanvasOnChange() {
    mainCanvas.on({
        'object:modified': function (e) {

            e.target.center();
            e.target.setCoords();
            mainCanvas.renderAll();

            var mainScaleX = e.target.scaleX;
            var mainScaleY = e.target.scaleY;

            //creaete canvases

            modify(hdpiCanvas, mainScaleX, mainScaleY);
            modify(mdpiCanvas, mainScaleX, mainScaleY);
            modify(xhdpiCanvas, mainScaleX, mainScaleY);
            modify(xxhdpiCanvas, mainScaleX, mainScaleY);
            modify(xxxhdpiCanvas, mainScaleX, mainScaleY);

            console.log("Scaling updated.");
        }
    });

}


//TODO: write a function to dispose all current static canvas and create/duplicate static canvas for given parameter;

function modify(canvasData, scaleXData, scaleYData) {
    canvasData._objects[0].scaleX = scaleXData;
    canvasData._objects[0].scaleY = scaleYData;
    canvasData._objects[0].setCoords();
    canvasData._objects[0].center();
    canvasData._objects[0].setCoords();
    canvasData.renderAll();
}
function generateFiles() {
var zip = new JSZip();

    var img = zip.folder("mipmap-hdpi");
    var imgData = $("#hdpiCanvas")[0].toDataURL('png');
    var base64result = imgData.split(',')[1];
    img.file("icon.png", base64result, { base64: true });

    img = zip.folder("mipmap-mdpi");
    imgData = $("#mdpiCanvas")[0].toDataURL('png');
    base64result = imgData.split(',')[1];
    img.file("icon.png", base64result, { base64: true });

    img = zip.folder("mipmap-xhdpi");
    imgData = $("#xhdpiCanvas")[0].toDataURL('png');
    base64result = imgData.split(',')[1];
    img.file("icon.png", base64result, { base64: true });

    img = zip.folder("mipmap-xxhdpi");
    imgData = $("#xxhdpiCanvas")[0].toDataURL('png');
    base64result = imgData.split(',')[1];
    img.file("icon.png", base64result, { base64: true });

    img = zip.folder("mipmap-xxxhdpi");
    imgData = $("#xxxhdpiCanvas")[0].toDataURL('png');
    base64result = imgData.split(',')[1];
    img.file("icon.png", base64result, { base64: true });


    zip.generateAsync({ type: "blob" }).then(function (content) {
        console.log(content);
        saveAs(content, "icons.zip");
    });

    $("#downloadDiv").show();
}