function createCanvas(iconText, element, canId, fontSize) {
    canvas = new fabric.Canvas(canId, {
        preserveObjectStacking: true
    });
    canvas.backgroundColor = '#efefef';
    var text = new fabric.Text("Team\nQuotes", {
        fontSize:fontSize,
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        fill: 'Blue',
        statefullCache: true,
        transparentCorners: false,
        textAlign: 'center'
    });
    canvas.add(text);
    text.center();
    canvas.setActiveObject(text);
    canvas.renderAll();
    var imgUrl = canvas.toDataURL('png');
    setUrl(element, imgUrl, "icon.png");
}