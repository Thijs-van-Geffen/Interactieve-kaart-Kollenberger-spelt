// layers
var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

// kaart
var map = L.map('map', {
    center: [50.90048078871611, 5.871376920796703],
    zoom: 11,
    layers: [OpenStreetMap_Mapnik],
});

var baseMaps = {
    "Topografische kaart": OpenStreetMap_Mapnik,
    "Satelliet": Esri_WorldImagery,
};

var layerControl = L.control.layers(baseMaps).addTo(map);

// style
var vlakkenStyle = {
    "color": "green",
    "weight": 5,
    "opacity": 0.8
};

// iconen
var bakkerIcon = L.icon({
    iconUrl: 'images/Brood.png',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, 0]
});

var boerIcon = L.icon({
    iconUrl: 'images/Graan.png',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, 0]
});

var molenIcon = L.icon({
    iconUrl: 'images/Molen.png',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, 0]
});

// Toevoegen data
L.geoJSON(punten, {
    onEachFeature: function(feature, layer){
        if(feature.properties.type == "bakker"){
            layer.setIcon(bakkerIcon);
        }
        else if(feature.properties.type == "molen"){
            layer.setIcon(molenIcon)
        }
        else if(feature.properties.type == "boer"){
            layer.setIcon(boerIcon)
        }
        layer.bindPopup('<table border="0" cellspacing="5"><tr><td><img src="images/' + feature.properties.afbeelding + '" width="200px"/>'  + '</br><h3>' + feature.properties.Naam + '</h3></td><td style="width:400px">' + feature.properties.context + '<p><i>"' + feature.properties.quote + '"</i></p>' + '<a href="' + feature.properties.url + '" target="_blank">website</a></td></tr></table>', {
            'maxWidth': '600'
        })
    }
}).addTo(map);

L.geoJSON(vlakken, {
    style: vlakkenStyle, 
    onEachFeature: function(feature, layer){
        layer.bindPopup('<table border="0" cellspacing="5"><tr><td><img src="images/' + feature.properties.afbeelding + '" width="200px"/>'  + '</br><h3>' + feature.properties.Naam + '</h3></td><td style="width:400px">' + feature.properties.context + '<p><i>"' + feature.properties.quote + '"</i></p>' + '<a href="' + feature.properties.url + '" target="_blank">website</a></td></tr></table>', {
        'maxWidth': '600'
    })
}}).addTo(map);

// Legenda
L.control.Legend({
    title: "Legenda",
    position: "bottomleft",
    legends: [{
        label: "De Bisschopsmolen",
        type: "image",
        url: "images/Brood.png",
    },{
        label: "De molen",
        type: "image",
        url: "images/Molen.png",
    },{
        label: "Producenten",
        type: "image",
        url: "images/Graan.png",
    },{
        label: "Percelen van de producenten",
        type: "polygon",
        sides: 4,
        color: "green",
        fill: true,
        fillOpacity: 0.8,
    }]
}).addTo(map);