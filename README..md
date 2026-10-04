# Campus Navigation System

## Project Overview

Campus Navigation System is a Data Structures and Algorithms project that finds the shortest route between two locations on a campus.

The campus is represented as a weighted graph where:

- Locations are represented as vertices (nodes).
- Connections between locations are represented as edges.
- Distance between locations is represented as edge weight.

The project uses Dijkstra's Algorithm to calculate the shortest path.

---

## Features

- Select a starting location.
- Select a destination.
- Find the shortest route.
- Display the complete route.
- Display total distance.
- Highlight the selected route on the campus map.
- Display the algorithm used.
- Handle same start and destination.
- Handle invalid selections.

---

## Campus Locations

The project contains the following locations:

1. Main Gate
2. Library
3. Canteen
4. Computer Lab
5. Science Block
6. Admin Block
7. Auditorium
8. Sports Ground

---

## Algorithm Used

### Dijkstra's Algorithm

Dijkstra's Algorithm is used because the campus graph contains weighted edges and all distances are positive.

The algorithm calculates the shortest distance from the selected starting location to all other locations.

After calculating the distances, the previous-location information is used to reconstruct the shortest route.

---

## Example

If the user selects:

Start:

Main Gate

Destination:

Sports Ground

The system calculates:

Main Gate → Admin Block → Auditorium → Sports Ground

Total Distance:

650 meters

---

## Graph Representation

The campus is represented using an adjacency list.

Example:

```text
Main Gate
 ├── Library (200m)
 └── Admin Block (300m)

Library
 ├── Main Gate (200m)
 ├── Canteen (100m)
 └── Computer Lab (150m)