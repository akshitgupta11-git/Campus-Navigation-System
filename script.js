// ======================================================
// CAMPUS NAVIGATION SYSTEM
// Dijkstra's Shortest Path Algorithm
// ======================================================


// ======================================================
// 1. CAMPUS GRAPH
// ======================================================

const graph = {

    "Main Gate": {
        "Library": 200,
        "Admin Block": 300
    },

    "Library": {
        "Main Gate": 200,
        "Canteen": 100,
        "Computer Lab": 150
    },

    "Canteen": {
        "Library": 100,
        "Science Block": 120
    },

    "Computer Lab": {
        "Library": 150,
        "Science Block": 100,
        "Auditorium": 200
    },

    "Science Block": {
        "Canteen": 120,
        "Computer Lab": 100,
        "Admin Block": 150
    },

    "Admin Block": {
        "Main Gate": 300,
        "Science Block": 150,
        "Auditorium": 100
    },

    "Auditorium": {
        "Computer Lab": 200,
        "Admin Block": 100,
        "Sports Ground": 250
    },

    "Sports Ground": {
        "Auditorium": 250
    }

};


// ======================================================
// 2. DIJKSTRA'S ALGORITHM
// ======================================================

function dijkstra(graph, start) {

    const distances = {};
    const previous = {};
    const unvisited = [];

    // Initialize all locations
    for (let location in graph) {

        distances[location] = Infinity;
        previous[location] = null;

        unvisited.push(location);
    }

    // Distance from starting point to itself
    distances[start] = 0;


    // Process locations
    while (unvisited.length > 0) {

        let current = null;


        // Find location having smallest distance
        for (let i = 0; i < unvisited.length; i++) {

            if (
                current === null ||
                distances[unvisited[i]] < distances[current]
            ) {

                current = unvisited[i];

            }

        }


        // If remaining locations are unreachable
        if (current === null || distances[current] === Infinity) {
            break;
        }


        // Remove current location
        const index = unvisited.indexOf(current);

        unvisited.splice(index, 1);


        // Check all neighbours
        for (let neighbor in graph[current]) {

            const edgeDistance = graph[current][neighbor];

            const newDistance =
                distances[current] + edgeDistance;


            // If shorter path found
            if (newDistance < distances[neighbor]) {

                distances[neighbor] = newDistance;

                previous[neighbor] = current;

            }

        }

    }


    return {
        distances: distances,
        previous: previous
    };

}


// ======================================================
// 3. CREATE SHORTEST PATH
// ======================================================

function getPath(previous, start, destination) {

    const path = [];

    let current = destination;


    // Move backwards from destination
    while (current !== null) {

        path.unshift(current);


        if (current === start) {
            break;
        }


        current = previous[current];

    }


    // No path exists
    if (path[0] !== start) {

        return [];

    }


    return path;

}


// ======================================================
// 4. CLEAR OLD MAP HIGHLIGHTS
// ======================================================

function clearMapHighlight() {

    // Remove highlighted location classes
    const locations =
        document.querySelectorAll(
            ".location-node, .campus-location, .map-location"
        );

    locations.forEach(function (element) {

        element.classList.remove("route-active");
        element.classList.remove("selected-route");
        element.classList.remove("highlight");

    });


    // Remove highlighted edge classes
    const edges =
        document.querySelectorAll(
            ".path-line, .map-edge, .route-line"
        );

    edges.forEach(function (element) {

        element.classList.remove("route-active");
        element.classList.remove("selected-route");
        element.classList.remove("highlight");

    });

}


// ======================================================
// 5. HIGHLIGHT SHORTEST ROUTE ON MAP
// ======================================================

function highlightRoute(path) {

    clearMapHighlight();


    // Highlight locations
    path.forEach(function (location) {

        const elements =
            document.querySelectorAll(
                `[data-location="${location}"]`
            );


        elements.forEach(function (element) {

            element.classList.add("route-active");

        });

    });


    // Highlight connections between locations
    for (let i = 0; i < path.length - 1; i++) {

        const from = path[i];
        const to = path[i + 1];


        const edges =
            document.querySelectorAll(
                `[data-from="${from}"][data-to="${to}"],
                 [data-from="${to}"][data-to="${from}"]`
            );


        edges.forEach(function (edge) {

            edge.classList.add("route-active");

        });

    }

}


// ======================================================
// 6. DISPLAY RESULT
// ======================================================

function displayResult(path, distance) {

    const routeElement =
        document.getElementById("route");

    const distanceElement =
        document.getElementById("distance");

    const algorithmElement =
        document.getElementById("algorithm");


    // Display route
    routeElement.innerText =
        path.join(" → ");


    // Display distance
    distanceElement.innerText =
        "Total Distance: " +
        distance +
        " meters";


    // Display algorithm
    algorithmElement.innerText =
        "Algorithm Used: Dijkstra's Algorithm";


    // Highlight route on map
    highlightRoute(path);

}


// ======================================================
// 7. MAIN FUNCTION
// ======================================================

function findShortestPath() {

    // Get start location
    const startElement =
        document.getElementById("start");


    // Get destination
    const destinationElement =
        document.getElementById("destination");


    // Get result elements
    const routeElement =
        document.getElementById("route");

    const distanceElement =
        document.getElementById("distance");

    const algorithmElement =
        document.getElementById("algorithm");


    // Safety check
    if (
        !startElement ||
        !destinationElement ||
        !routeElement ||
        !distanceElement ||
        !algorithmElement
    ) {

        console.error(
            "Required HTML elements were not found."
        );

        return;

    }


    const start = startElement.value;

    const destination =
        destinationElement.value;


    // ==================================================
    // CHECK 1: EMPTY SELECTION
    // ==================================================

    if (start === "" || destination === "") {

        routeElement.innerText =
            "Please select both start and destination.";

        distanceElement.innerText = "";

        algorithmElement.innerText = "";

        clearMapHighlight();

        return;

    }


    // ==================================================
    // CHECK 2: SAME LOCATION
    // ==================================================

    if (start === destination) {

        routeElement.innerText =
            start;

        distanceElement.innerText =
            "Total Distance: 0 meters";

        algorithmElement.innerText =
            "Algorithm Used: Dijkstra's Algorithm";

        highlightRoute([start]);

        return;

    }


    // ==================================================
    // RUN DIJKSTRA
    // ==================================================

    const result =
        dijkstra(graph, start);


    // ==================================================
    // GET SHORTEST PATH
    // ==================================================

    const path =
        getPath(
            result.previous,
            start,
            destination
        );


    // ==================================================
    // CHECK 3: NO ROUTE
    // ==================================================

    if (path.length === 0) {

        routeElement.innerText =
            "No route available.";

        distanceElement.innerText = "";

        algorithmElement.innerText = "";

        clearMapHighlight();

        return;

    }


    // ==================================================
    // DISPLAY RESULT
    // ==================================================

    displayResult(
        path,
        result.distances[destination]
    );

}


// ======================================================
// 8. BUTTON EVENT
// ======================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const button =
            document.getElementById("findRoute");


        if (button) {

            button.addEventListener(
                "click",
                findShortestPath
            );

        }

    }
);