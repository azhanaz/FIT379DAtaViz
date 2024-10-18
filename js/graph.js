d3.csv("csv/water_production.csv").then(data => {
    const states = ["Kelantan", "Johor", "Kedah", "Melaka", "Negeri Sembilan", "Pahang", "Perak", "Perlis", "Pulau Pinang", "Sabah", "Sarawak", "Selangor", "Terengganu", "W.P. Labuan"];
    const filteredData = data.filter(d => states.includes(d.state));

    const spec = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        "title": "Water Production Over Time by State",
        "width": "container",

        "data": {
            "values": filteredData
        },
        "mark": "line",
        "encoding": {
            "x": {
                "field": "date",
                "type": "temporal",
                "title": "Year",
                "axis": {
                    "format": "%Y",
                    "tickCount": "year"  
                }
            },
            "y": {
                "field": "value",
                "type": "quantitative",
                "title": "Water Production (Value)"
            },
            "color": {
                "field": "state", 
                "type": "nominal",
                "title": "State",
                "scale": {
                    "scheme": "category20"  
                }
            },
            "tooltip": [
                {"field": "date", "type": "temporal", "title": "Year"},
                {"field": "value", "type": "quantitative", "title": "Water Production"},
                {"field": "state", "type": "nominal", "title": "State"}
            ]
        }
    };

    vegaEmbed('#vis', spec).catch(console.error);
});
