
# Design Decisions

## 1. Why Dijkstra's Algorithm?

The campus navigation system contains weighted edges because every connection has a distance in meters.

All edge weights are positive.

Therefore, Dijkstra's Algorithm is suitable for finding the shortest route.

---

## 2. Why Not BFS?

BFS is mainly suitable for unweighted graphs where every edge has the same cost.

In this project, different paths have different distances such as:

- 100 meters
- 120 meters
- 150 meters
- 200 meters
- 300 meters

Therefore, Dijkstra's Algorithm was selected instead of BFS.

---

## 3. Graph Representation

An adjacency list was used to represent the campus graph.

Each location stores its connected locations along with their distances.

This makes the graph easy to understand and modify.

---

## 4. Edge Case: Same Start and Destination

If the user selects the same location as both start and destination, the shortest distance is:

0 meters

The system directly displays the selected location instead of running the complete route calculation.

---

## 5. Edge Case: Empty Selection

If the user does not select either the start location or destination, the system displays a message asking the user to select both locations.

---

## 6. Design Change

Initially, the project could display only the shortest route as text.

A visual route highlighting feature was added so that the user can easily understand which locations and connections form the shortest path.

The selected route is highlighted on the campus map.

---

## 7. Future Improvement

The project can be improved further by adding:

- Interactive map
- A* algorithm comparison
- User-defined locations
- Dynamic distances
- Real campus map
- Estimated walking time