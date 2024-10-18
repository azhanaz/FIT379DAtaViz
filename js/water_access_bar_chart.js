d3.csv("csv/water_access.csv").then(data => {
    const statesOfInterest = [
        "Johor", "Kedah", "Melaka", "Negeri Sembilan", "Pahang", 
        "Perak", "Perlis", "Pulau Pinang", "Sabah", 
        "Sarawak", "Selangor", "Terengganu", "W.P. Labuan", 
        "Kelantan"
    ];

    data.forEach(d => {
        d.proportion = +d.proportion;
        d.date = new Date(d.date); 
    });


    const stateSelect = d3.select("#state-select");
    statesOfInterest.forEach(state => {
        stateSelect.append("option").attr("value", state).text(state);
    });

    function updateGraph() {
        const selectedState = stateSelect.node().value;
        const filteredData = data.filter(d => d.state === selectedState);
        const minProportion = d3.min(filteredData, d => d.proportion);
        const maxProportion = d3.max(filteredData, d => d.proportion);

        const spec = {
            "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
            "title": `Water Access Proportion Over Time for ${selectedState}`,
            "width": "container",
            "height": 200,
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
                    "field": "proportion",
                    "type": "quantitative",
                    "title": "Proportion (%)",
                    "scale": {
                        "domain": [Math.max(0, minProportion - 5), Math.min(100, maxProportion + 5)] 
                    }
                },
                "color": {
                    "field": "strata", 
                    "type": "nominal",
                    "title": "Strata",
                    "scale": {
                        "domain": ["urban", "rural"],
                        "range": ["#1f77b4", "#ff7f0e"] 
                    }
                },
                "tooltip": [
                    {"field": "state", "type": "nominal", "title": "State"},
                    {"field": "proportion", "type": "quantitative", "title": "Proportion (%)", "format": ".2f"},
                    {"field": "date", "type": "temporal", "title": "Year", "format": "%Y"},
                    {"field": "strata", "type": "nominal", "title": "Strata"}
                ]
            },
            "config": {
                "axis": {
                    "grid": true 
                },
                "line": {
                    "interpolate": "monotone", 
                    "strokeWidth": 3 
                }
            }
        };
        vegaEmbed('#bar-vis', spec).catch(console.error);
    }
    updateGraph();
    stateSelect.on("change", updateGraph);
});
