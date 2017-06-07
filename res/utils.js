
function setUrl(element, path, filename) {
    $(element).attr("href", path);
    $(element).attr("download", filename);
}
function createCanvas(canId, fontSize, qText, qColor, bgcolor) {
    canvas = new fabric.Canvas(canId, {
        preserveObjectStacking: true
    });
    canvas.backgroundColor = bgcolor;
    var text = new fabric.Text(qText, {
        fontSize: fontSize,
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        fill: qColor,
        statefullCache: true,
        transparentCorners: false,
        textAlign: 'center'
    });
    canvas.add(text).setActiveObject(text);
    text.center();
    text.setCoords();
    canvas.renderAll();
    return canvas;
}
function updateAllCanvasOnChange() {
    updateIcons(mainCanvas.getActiveObject());
    mainCanvas.on({
        'object:modified': function (e) {
            updateIcons(e.target);
        }
    });

}
function createStaticCanvas(canId, bgcolor) {

    canvas = new fabric.StaticCanvas(canId, {
        preserveObjectStacking: true
    });
    canvas.backgroundColor = bgcolor;
    canvas.renderAll();
    return canvas;
}

function updateIcons(e) {
    e.center();
    e.setCoords();
    mainCanvas.renderAll();
    var mainScaleX = e.scaleX;
    var mainScaleY = e.scaleY;
    var angle = e.angle;
    var obj = fabric.util.object.clone(e);
    var color = mainCanvas.backgroundColor;
    modify(mdpiCanvas, mainScaleX / 10.67, mainScaleY / 10.67, obj, color);
    modify(hdpiCanvas, mainScaleX / 7.11, mainScaleY / 7.11, obj, color);
    modify(xhdpiCanvas, mainScaleX / 5.33, mainScaleY / 5.33, obj, color);
    modify(xxhdpiCanvas, mainScaleX / 3.56, mainScaleY / 3.56, obj, color);
    modify(xxxhdpiCanvas, mainScaleX / 2.67, mainScaleY / 2.67, obj, color);
    console.log("Scaling updated.");
}
function modify(canvasData, scaleXData, scaleYData, object, bgclr) {
    canvasData.clear();
    canvasData.backgroundColor = bgclr;
    object.left = 0;
    object.top = 0;
    object.setCoords();
    canvasData.add(object);
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