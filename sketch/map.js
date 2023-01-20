class OpenStreetMap extends Sketch {
    setup(config) {
        config.w = 10;
        config.h = 10;
    }

    async init(config) {
        let response = await fetch('https://api-adresse.data.gouv.fr/search/?q=48+ru+du+19+janvier+92380+garches');
        let data = await response.json();

        let gps = data.features[0].geometry.coordinates;

        var map = L.map('openstreetmap').setView([gps[1], gps[0]], 13);

        var tiles = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
                'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            id: 'mapbox/light-v9',
            tileSize: 512,
            zoomOffset: -1
        }).addTo(map);

        L.marker([gps[1], gps[0]]).addTo(map);

        var ugaLayer = L.geoJSON(uga, {
            style: {
                weight: 2,
                color: "#999",
                opacity: 1,
                fillColor: "#B0DE5C",
                fillOpacity: 0.8
            }
        }).addTo(map);
    }
}

declareSketch(OpenStreetMap);
