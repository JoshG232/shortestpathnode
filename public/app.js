


// Button for submiting places selected
submitButton = document.getElementById("submit")
submitButton.addEventListener("click", submitValues)

function getNode(value){
	console.log(value)
}

let graph1 = {
	A: { B: 2, C: 3 },
	B: { A: 2, D: 7, E: 5 },
	C: { A: 3, F: 4 },
	D: { B: 7, E: 3, G: 2},
	E: { B: 5, D: 3, F: 3,G: 1},
	F: { C: 4, E: 1 ,G: 3},
	G: { D: 2 ,E: 1 ,F: 3}
};

function display(savedData){
	document.getElementById("route").innerHTML = "The route is "+savedData.resultsGET.path
	document.getElementById("distance").innerHTML = "The time it will take is "+ savedData.resultsGET.distance+" minutes "
	console.log("done")
}



// Getting the values and using them in another function 
async function submitValues(start,end){
    start = document.getElementById("start").value;
	end = document.getElementById("end").value
	data = [start, end]
	
    
	
	graph = await getData() //graph ting
	console.log(graph)
	
	findShortestPath(graph[0], start, end)// route ting
	
	savedData = {start, end, resultsGET}
	display(savedData)
	console.log(savedData)
	
	options = {
		method: "POST",
		headers: {
			"Content-Type":"application/json"
		},
		body: JSON.stringify(savedData),
	}
	await fetch("/api", options);
	
}

async function getData(){
	const response = await fetch("/api")
	const graph = await response.json()
	return graph
	//fuck the way node gives data back. arrays = poopoohead
}
	
const shortestDistanceNode = (distances, visited) => {
	let shortest = null;

	for (let node in distances) {
		let currentIsShortest =
			shortest === null || distances[node] < distances[shortest];
		if (currentIsShortest && !visited.includes(node)) {
			shortest = node;
		}
	}
	return shortest;
};

const findShortestPath = (graph, startNode, endNode) => {
	// establish object for recording distances from the start node
	let distances = {};
	distances[endNode] = "Infinity";
	distances = Object.assign(distances, graph[startNode]);

	// track paths
	let parents = { endNode: null };
	for (let child in graph[startNode]) {
		parents[child] = startNode;
	}

	// track nodes that have already been visited
	let visited = [];

	// find the nearest node
	let node = shortestDistanceNode(distances, visited);

	// for that node
	while (node) {
		// find its distance from the start node & its child nodes
		let distance = distances[node];
		let children = graph[node];
		// for each of those child nodes
		for (let child in children) {
			// make sure each child node is not the start node
			if (String(child) === String(startNode)) {
				continue;
			} else {
				// save the distance from the start node to the child node
				let newdistance = distance + children[child];
				// if there's no recorded distance from the start node to the child node in the distances object
				// or if the recorded distance is shorter than the previously stored distance from the start node to the child node
				// save the distance to the object
				// record the path
				if (!distances[child] || distances[child] > newdistance) {
					distances[child] = newdistance;
					parents[child] = node;
				}
			}
		}
		// move the node to the visited set
		visited.push(node);
		// move to the nearest neighbor node
		node = shortestDistanceNode(distances, visited);
	}

	// using the stored paths from start node to end node
	// record the shortest path
	let shortestPath = [endNode];
	let parent = parents[endNode];
	while (parent) {
		shortestPath.push(parent);
		parent = parents[parent];
	}
	shortestPath.reverse();

	// return the shortest path from start node to end node & its distance
	let results = {
		distance: distances[endNode],
		path: shortestPath,
	};
	resultsGET = results
	console.log(results)
	return results;
};

// module.exports = findShortestPath;




































































































































































































// count = 0
// //Function to find shortest distance
// function FindingShortDistance (graph, start, end){
//     if (currentNode === "none"){
//         currentNode = start
//         console.log("this should be the selected node",currentNode)
//     }
    
    
//     //Using the inputs to get the graph start and end points to the split up the values
//     for (childNode in graph[currentNode]){
//         // availableNodes.push(graph[currentNode][childNode])
//         temp = graph[currentNode][childNode]
//         // console.log(temp)
//         availableNodes.unshift(temp.split(""))
//         availableNodes[0][1] = parseInt(availableNodes[0][1],10)

        
        
//     }
    
    
//     availableNodes = availableNodes.sort(function(a,b) {
//         return a[1]-b[1]
//     });
//     console.log(availableNodes)
//     currentNode = availableNodes[0][0]
//     console.log(currentNode)
//     availableNodes.shift()
//     console.log(availableNodes)

    
//     if(count === 1){
//         return 
//     }
//     else {
//         count = count + 1 
//         // FindingShortDistance(graph,currentNode,end)
//     }




    
    






// }


