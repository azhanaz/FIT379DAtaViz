const stateColors = {
    "Johor": { population: 3794000.0, color: "#FF0000" },  
    "Selangor": { population: 6555400.0, color: "#D50000" },  
    "Sabah": { population: 3833000.0, color: "#C62828" },  
    "Sarawak": { population: 2822200.0, color: "#E57373" },  
    "Perak": { population: 2508900.0, color: "#FF8A80" },  
    "Kedah": { population: 2194100.0, color: "#FF5252" }, 
    "Pulau Pinang": { population: 1774400.0, color: "#FF1744" },  
    "Kelantan": { population: 1928800.0, color: "#FF6F60" },  
    "Melaka": { population: 937500.0, color: "#EF5350" },  
    "Negeri Sembilan": { population: 1129100.0, color: "#FFB3B3" },  
    "Pahang": { population: 1684600.0, color: "#FF9999" },  
    "Perlis": { population: 255400.0, color: "#FFCCCC" },
    "Terengganu": { population: 1275100.0, color: "#FF4D4D" },  
    "W.P. Labuan": { population: 100100.0, color: "#FF7F7F" } 
};



console.log(stateColors);


const tooltipData = Object.entries(stateColors).map(([state, { population }]) => ({
    state,
    population
}));

const mapSpec = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "width": "700",
    "height": "490",
    "projection": { "type": "mercator" },
    "layer": [
        {
            "data": {
                "url": "geo/malaysia.topojson",
                "format": { "type": "topojson", "feature": "states" }
            },
            "mark": { "type": "geoshape", "stroke": "#fff" },
            "encoding": {
                "color": {
                    "field": "properties.Name", "title": "State",
                    "type": "nominal",
                    "scale": {
                        "domain": Object.keys(stateColors),
                        "range": Object.values(stateColors).map(d => d.color)
                    }
                },
                "tooltip": [
                    { "field": "properties.Name", "type": "nominal", "title": "State" },
                    { "field": "population", "type": "quantitative", "title": "Population" }
                ]
            },
            "transform": [
                {
                    "type": "lookup",
                    "from": {
                        "data": {
                            "values": tooltipData
                        },
                        "key": "state",
                        "fields": ["States"]
                    },
                    "as": ["population"] 
                }
            ]
        }
    ]
};

vegaEmbed('#map-vis', mapSpec).then(result => {
    console.log(result);
}).catch(console.error);
