
const valmieraBounderaires = {
    top: 57.56747874410726,
    left: 25.352425077331997,
    right: 25.475881990735164,
    bottom: 57.50573251157246
}

const windowSize = {
    width: window.innerWidth,
    height: window.innerHeight
}

// load geosjon

async function loadJSON() {
    const response = await fetch('./valmiera_buildings_json/export.geojson');
    const data = await response.json();

    renderJSON(data)
}

loadJSON();

let buildings_drawn = 0;


const renderJSON = (data) => {

    var draw = SVG().addTo('body').size(windowSize.width, windowSize.height)

    const buildings = data.features

    console.log(buildings);

    for (let i = 0; i < buildings.length; i++) {

        // console.log(buildings[i]);


        if (buildings[i].geometry.type == "Polygon") {

            buildings[i].geometry.coordinates.forEach(part => {

                let stringed_coordinates = ""

                part.forEach(coordinate => {

                    let lat = mapRange(coordinate[0], valmieraBounderaires.left, valmieraBounderaires.right, 0, windowSize.width);
                    let lon = mapRange(coordinate[1], valmieraBounderaires.top, valmieraBounderaires.bottom, 0, windowSize.height);

                    let coordinates = lat + ',' + lon + ' '
                    stringed_coordinates += coordinates;


                })

                var polygon = draw.polygon(stringed_coordinates)
                polygon.fill('#f06')

                buildings_drawn++;



            });
        }




    };

    console.log(buildings_drawn + "/" + buildings.length + " drawn");



}



function mapRange(value, a, b, c, d) {
    value = (value - a) / (b - a);
    return c + value * (d - c);
}