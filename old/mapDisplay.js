// Step 1: Fetch the GeoJSON data
fetch('malaysia_state.geojson')
    .then(response => response.json())
    .then(geojsonData => {
        // Step 2: Access and log the data from the GeoJSON file
        console.log("GeoJSON Data:", geojsonData);

        // Example: Loop through each feature (state) and log the state name
        geojsonData.features.forEach(feature => {
            console.log("State Name:", feature.properties.name);
        });

        // Step 3: Define the Vega-Lite specification using the fetched GeoJSON data
        const mapSpec = {
            "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
            "width": 1000,
            "height": 800,
            "data": {
                "values": geojsonData.features, // Use the fetched GeoJSON data
                "format": {
                    "type": "json"
                }
            },
            "mark": {
                "type": "geoshape",
                "stroke": "black",   // Set outline color
                "strokeWidth": 1     // Set outline width
            },
            "projection": {
                "type": "mercator"   // Use Mercator projection
            },
            "encoding": {
                "shape": {
                    "field": "geometry", // Set the shape from geometry
                    "type": "geojson"
                },
                "tooltip": [
                    {
                        "field": "properties.name",  // Access the state name for tooltip
                        "type": "nominal",
                        "title": "State"
                    }
                ]
            }
        };

        // Step 4: Embed the map into the div with id 'map'
        vegaEmbed('#map', mapSpec).then(result => {
            console.log("Map successfully rendered.");
        }).catch(console.error);
    })
    .catch(error => {
        console.error("Error fetching GeoJSON data:", error);
    });
