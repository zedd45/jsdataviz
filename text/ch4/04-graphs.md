### Showing Relationships with Network Graphs

Visualizations don’t always focus on the actual data values; sometimes the most interesting aspects of a data set are the relationships among its members. The relationships between members of a social network, for example, can become the most important of that networks’s data. To visualize these types of relationships, we can use a _network graph._ Network graphs represent objects, generally known as _nodes,_ as points or circles. Lines or arcs (technically called _edges_) connect these nodes to indicate relationships.

Constructing network graphs can be a bit tricky, as the underlying mathematics are not always trivial. Fortunately the [sigmajs](http://sigmajs.org) library takes care of most of the complicated calculations. By using that library, we can create full-featured network graphs with just a little bit of JavaScript. For our example, we’ll consider one critic’s list of the [Top 25 Jazz Albums of All Time](http://www.thejazzresource.com/top_25_jazz_albums.html). Several musicians performed on more than one of these albums, and a network graph let’s us explore those connections.

#### Step 1: Include the Required Libraries

The sigmajs library does not depend on any other JavaScript libraries, so we don’t need any other included scripts. It is not, however, available no common Content Distribution Networks. Consequently, we’ll have to serve it from our own web host.

```language-markup
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <div id="graph"></div>
    <script src="js/sigma.min.js"></script>
  </body>
</html>
```

As you can see, we’ve set aside a `<div>` to hold our graph We’ve also included the Javascript library as the last part of the `<body>` element, as that provides the best browser performance.

> Note: In most of the examples in this book, we included steps you can take to make your visualizations compatible with older web browsers such as Internet Explorer 8. In this case, however, those approaches degrade performance so severely that they are rarely workable. To view the network graph visualization, your users will need a modern browser.

#### Step 2: Prepare the Data

Our data on the top 25 jazz albums looks like the following snippet. We're only showing the first couple of albums below, but you can see the full list in the book’s [source code](https://github.com/sathomas/jsdataviz).

```language-javascript
var albums = [
  {
    album: "Miles Davis - Kind of Blue",
    musicians: [
      "Cannonball Adderley",
      "Paul Chambers",
      "Jimmy Cobb",
      "John Coltrane",
      "Miles Davis",
      "Bill Evans"
    ]
  },{
    album: "John Coltrane - A Love Supreme",
    musicians: [
      "John Coltrane",
      "Jimmy Garrison",
      "Elvin Jones",
      "McCoy Tyner"
    ]
...
```

That’s not exactly the structure that sigmajs requires. We could convert it to a sigmajs JSON data structure in bulk, but there’s really no need. Instead, as we’ll see in the next step, we can simply pass data to the library one element at a time.

#### Step 3: Define the Graph’s Nodes

Now we’re ready to use the library to construct our graph. We start by initializing the library and indicating where it should construct the graph. That parameter is the `id` of the `<div>` element set aside to hold the visualization.

```language-javascript
var s = new sigma("graph");
```

Now we can continue by adding the nodes to the graph. In our case each album is a node. As we add a node to the graph, we give it a unique identifier (which must be a string), a label, and a position. Figuring out an initial position can be a bit tricky for arbitrary data. In a few steps we’ll look at an approach that makes the initial position less critical. For now, though, we’ll simply spread our albums in a circle. The `radius` value is roughly half of the width of the container. We can also give each node a different size, but for our purposes it’s fine to set every album’s size to `1`.

```language-javascript
for (var idx=0; idx<albums.length; idx++) {
    var theta = idx*2*Math.PI / albums.length;
    s.graph.addNode({
        id: ""+idx,   // Note: ‘id’ must be a string
        label: albums[idx].album,
        x: radius*Math.sin(theta),
        y: radius*Math.cos(theta),
        size: 1
    });
}
```

Finally, after defining the graph, we tell the library to draw it.

```language-javascript
s.refresh();
```

We now have a nicely drawn circle of the top 25 jazz albums of all time. In our initial attempt some of the labels may get in each other’s way, but we’ll address that shortly.

<figure id="graph-1" style="width:800px;height:450px"></figure>

Notice that the sigmajs library automatically supports panning and zooming the graph, and users can click on individual nodes to highlight their labels.

#### Step 4: Connect the Nodes with Edges

Now that we have the nodes drawn in a circle, it’s time to connect them with edges. In our case an edge, or connection between two albums, represents a musician that performed on both of the albums. To find those edges, we iterate through the albums in four stages.

1. Loop through each album as a potential source of a connection.
2. For the source album, loop through all musicians.
3. For each musician, loop through all of the remaining albums a potential targets for a connection.
4. For each target album, loop through all the musicians looking for a match.

```language-javascript
for (var srcIdx=0; srcIdx<albums.length; srcIdx++) {
  var src = albums[srcIdx];
  for (var mscIdx=0; mscIdx<src.musicians.length; mscIdx++) {
    var msc = src.musicians[mscIdx];
    for (var tgtIdx=srcIdx+1; tgtIdx<albums.length; tgtIdx++) {
      var tgt = albums[tgtIdx];
      if (tgt.musicians.some(function(tgtMsc) {return tgtMsc === msc;})) {
        s.graph.addEdge({
          id: srcIdx + "." + mscIdx + "-" + tgtIdx,
          source: ""+srcIdx,
          target: ""+tgtIdx
        })
      }
    }
  }
}
```

We’ll want to insert this code before we `refresh` the graph. When we’ve done that, we’ll have a connected circle of albums.

<figure id="graph-2" style="width:800px;height:450px"></figure>

Again, you can pan and zoom the graph to focus on different parts.

#### Step 5: Automating the Layout

So far we’ve manually placed the nodes in our graph in a circle. That’s not a terrible approach, but it can make it hard to discern some of the connections. It would be better if we could let the library calculate a more optimal layout than the simple circle. That’s exactly what we’ll do now.

The mathematics behind this approach go by the name of “force directed graphing.” In a nutshell, the algorithm proceeds by treating the graph’s nodes and edges as physical objects subject to real forces such as gravity and electromagnetism. It simulates the effect of those forces, pushing and prodding the nodes into new positions on the graph.

The underlying algorithm may be complicated, but sigmajs makes it easy to employ. First we have to add an optional plugin to the sigmajs library.

```language-markup
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <div id="graph"></div>
    <script src="js/sigma.min.js"></script>
    <script src="js/sigma.layout.forceAtlas2.min.js"></script>
  </body>
</html>
```

Now, instead of simply refreshing the graph when we’re ready to display it, we start the force directed algorithm. We also need to stop the algorithm after it’s had a chance to run for awhile. In our case 1.5 seconds (`1500 ms`) is plenty of time. The algorithm periodically refreshes the display while it performs its simulation.

```language-javascript
s.startForceAtlas2();
setTimeout(function() { s.stopForceAtlas2(); }, 1500);
```

As a result, our albums start out in their original circle, but quickly migrate to a position that makes it much easier to identify the connections. Some of the top albums are tightly connected, indicating that have many musicians in common. A few, however, remain isolated. Their musicians only make the list once.

<figure id="graph-3" style="width:800px;height:800px"></figure>

#### Step 6: Adding Interactivity

We can build on this last step by adding an additional level of interactivity. In addition to panning and zooming, we’ll let users click on individual nodes to highlight their connections. To do that we need a function that responds to clicks on the node elements.

```language-javascript
s.bind('clickNode', function(ev) {
  var nodeIdx = ev.data.node.id;
  // ...
});
```

Within that function, the `ev.data.node.id` property gives us the node that the user clicked. We can then scan through all the graph’s edges to see if they connect to that node. If the edge does connect to the node, we can change it’s color to something other than the default. (Otherwise, we change the color back to the default.)

```language-javascript
s.bind('clickNode', function(ev) {
  var nodeIdx = ev.data.node.id;
  s.graph.edges().forEach(function(edge) {
    if ((edge.target === nodeIdx) || (edge.source === nodeIdx)) {
      edge.color = '#555';
    } else {
      edge.color = '#ec5148';
    }
  });
  // ...
});
```

While we’re scanning through the edges, we can also build up a list of neighbors to the clicked node. A neighbor is a node at the other end of a connected edge.

```language-javascript
s.bind('clickNode', function(ev) {
  var nodeIdx = ev.data.node.id;
  var neighbors = [];
  s.graph.edges().forEach(function(edge) {
    if ((edge.target === nodeIdx) || (edge.source === nodeIdx)) {
      edge.color = '#555';
      neighbors.push(edge.target);
      neighbors.push(edge.source);
    } else {
      edge.color = '#ec5148';
    }
  });
});
```

To wrap up our click event handler, we can now scan through the list of nodes. If the node is a neighbor, change it’s color as well. And finally, once we’ve set all the colors appropriately, we refresh the graph.

```language-javascript
s.bind('clickNode', function(ev) {
  var nodeIdx = ev.data.node.id;
  var neighbors = [];
  s.graph.edges().forEach(function(edge) {
    if ((edge.target === nodeIdx) || (edge.source === nodeIdx)) {
      edge.color = '#555';
      neighbors.push(edge.target);
      neighbors.push(edge.source);
    } else {
      edge.color = '#ec5148';
    }
  });
  s.graph.nodes().forEach(function(node) {
    if (neighbors.some(function(n){return n === node.id})) {
      node.color = '#555';
    } else {
      node.color = '#ec5148';
    }
  });
  g.refresh();
});
```

Now we have a fully interactive network graph. Our users can pan, zoom, click, and tap to their heart’s content.

<figure id="graph-4" style="width:750px;height:750px"></figure>

<script>
contentLoaded.done(function() {

var albums = [
  {
    album: "Miles Davis - Kind of Blue",
    musicians: [
      "Cannonball Adderley",
      "Paul Chambers",
      "Jimmy Cobb",
      "John Coltrane",
      "Miles Davis",
      "Bill Evans"
    ]
  },{
    album: "John Coltrane - A Love Supreme",
    musicians: [
      "John Coltrane",
      "Jimmy Garrison",
      "Elvin Jones",
      "McCoy Tyner"
    ]
  },{
    album: "The Dave Brubeck Quartet - Time Out",
    musicians: [
      "Dave Brubeck",
      "Paul Desmond",
      "Joe Morello",
      "Eugene Write"
    ]
  },{
    album: "Duke Ellington - Ellington at Newport",
    musicians: [
      "Harry Carney",
      "John Willie Cook",
      "Duke Ellington",
      "Paul Gonsalves",
      "Jimmy Grissom",
      "Jimmy Hamilton",
      "Johnny Hodges",
      "Quentin Jackson",
      "William Anderson",
      "Ray Nance",
      "Russell Procope",
      "John Sanders",
      "Clark Terry",
      "James Woode",
      "Britt Woodman",
      "Sam Woodyar"
    ]
  },{
    album: "The Quintet - Jazz at Massey Hall",
    musicians: [
      "Dizzy Gillespie",
      "Charles Mingus",
      "Charlie Parker",
      "Bud Powell",
      "Max Roach"
    ]
  },{
    album: "Louis Armstrong - The Best of the Hot Five and Hot Seven Recordings",
    musicians: [
      "Lil Hardin Armstrong",
      "Louis Armstrong",
      "Clarence Babcock",
      "Pete Briggs",
      "Mancy Carr",
      "Baby Dodds",
      "Johnny Dodds",
      "Earl Hines",
      "Kid Ory",
      "Don Redman",
      "Fred Robinson",
      "Zutty Singleton",
      "Johnny St. Cyr",
      "Jimmy Strong",
      "John Thomas",
      "Dave Wilborn"
    ]
  },{
    album: "John Coltrane - Blue Trane",
    musicians: [
      "Paul Chambers",
      "John Coltrane",
      "Kenny Drew",
      "Curtis Fuller",
      "Philly Joe Jones",
      "Lee Morgan"
    ]
  },{
    album: "Stan Getz and João Gilberto - Getz/Gilberto",
    musicians: [
      "Milton Banana",
      "Stan Getz",
      "Astrud Gilberto",
      "João Gilberto",
      "Antonio Carlos Jobim",
      "Sebastião Neto"
    ]
  },{
    album: "Charles Mingus - Mingus Ah Um",
    musicians: [
      "Willie Dennis",
      "Booker Ervin",
      "Shafi Hadi",
      "John Handy",
      "Jimmy Knepper",
      "Charles Mingus",
      "Horace Parlan",
      "Dannie Richmond"
    ]
  },{
    album: "Erroll Garner - Concert by the Sea",
    musicians: [
     "Denzil Best",
      "Eddie Calhoun",
      "Erroll Garner"
    ]
  },{
    album: "Miles Davis - Bitches Brew",
    musicians: [
      "Don Alias",
      "Harvey Brooks",
      "Billy Cobham",
      "Chick Corea",
      "Miles Davis",
      "Jack DeJohnette",
      "Dave Holland",
      "Bennie Maupin",
      "John McLaughlin",
      "Airto Moreira",
      "Juma Santos",
      "Wayne Shorter",
      "Lenny White",
      "Larry Young",
      "Joe Zawinul"
    ]
  },{
    album: "Sonny Rollings - Saxophone Colossus",
    musicians: [
      "Tommy Flanagan",
      "Sonny Rollins",
      "Max Roach",
      "Doug Watkins"
    ]
  },{
    album: "Art Blakey and The Jazz Messengers - Moanin’",
    musicians: [
      "Art Blakey",
      "Lee Morgan",
      "Benny Golson",
      "Bobby Timmons",
      "Jymie Merritt"
    ]
  },{
    album: "Clifford Brown and Max Roach",
    musicians: [
      "Clifford Brown",
      "Harold Land",
      "George Morrow",
      "Richie Powell",
      "Max Roach"
    ]
  },{
    album: "Thelonious Monk with John Coltrane - At Carnegie Hall",
    musicians: [
      "Ahmed Abdul-Malik",
      "John Coltrane",
      "Thelonious Monk",
      "Shadow Wilson"
    ]
  },{
    album: "Hank Mobley - Soul Station",
    musicians: [
      "Art Blakey",
      "Paul Chambers",
      "Wynton Kelly",
      "Hank Mobley"
    ]
  },{
    album: "Cannonball Adderly - Somethin’ Else",
    musicians: [
      "Cannonball Adderley",
      "Art Blakey",
      "Miles Davis",
      "Hank Jones",
      "Sam Jones"
    ]
  },{
    album: "Wayne Shorter - Speak No Evil",
    musicians: [
      "Ron Carter",
      "Herbie Hancock",
      "Freddie Hubbard",
      "Elvin Jones",
      "Wayne Shorter"
    ]
  },{
    album: "Miles Davis - Birth of the Cool",
    musicians: [
      "Bill Barber",
      "Nelson Boyd",
      "Kenny Clarke",
      "Junior Collins",
      "Miles Davis",
      "Kenny Hagood",
      "Al Haig",
      "J. J. Johnson",
      "Lee Konitz",
      "John Lewis",
      "Al McKibbon",
      "Gerry Mulligan",
      "Max Roach",
      "Gunther Schuller",
      "Joe Shulman",
      "Sandy Siegelstein",
      "Kai Winding"
    ]
  },{
    album: "Herbie Hancock - Maiden Voyage",
    musicians: [
      "Ron Carter",
      "George Coleman",
      "Herbie Hancock",
      "Freddie Hubbard",
      "Tony Williams"
    ]
  },{
    album: "Vince Guaraldi Trio- A Boy Named Charlie Brown",
    musicians: [
      "Colin Bailey",
      "Monty Budwig",
      "Vince Guaraldi"
    ]
  },{
    album: "Eric Dolphy - Out to Lunch",
    musicians: [
      "Richard Davis",
      "Eric Dolphy",
      "Freddie Hubbard",
      "Bobby Hutcherson",
      "Tony Williams"
    ]
  },{
    album: "Oliver Nelson - The Blues and the Abstract Truth",
    musicians: [
      "George Barrow",
      "Paul Chambers",
      "Eric Dolphy",
      "Bill Evans",
      "Roy Haynes",
      "Freddie Hubbard",
      "Oliver Nelson"
    ]
  },{
    album: "Dexter Gordon - Go",
    musicians: [
      "Sonny Clark",
      "Dexter Gordon",
      "Billy Higgins",
      "Butch Warren"
    ]
  },{
    album: "Sarah Vaughan with Clifford Brown",
    musicians: [
      "Joe Benjamin",
      "Clifford Brown",
      "Roy Haynes",
      "Jimmy Jones",
      "John Malachi",
      "Herbie Mann",
      "Paul Quinichette",
      "Sarah Vaughan",
      "Ernie Wilkins"
    ]
  }
];

var s1 = new sigma("graph-1");
s1.settings({
	defaultLabelColor: '#444444',
  defaultNodeColor: '#ffa44f',
	font: "Lato, 'Helvetica Neue', Helvetica, Arial, sans-serif",
  sideMargin: 50,
  zoomMin: 1.0,
  zoomMax: 1.0
});
for (var idx=0; idx<albums.length; idx++) {
    var theta = idx*2*Math.PI / albums.length;
    s1.graph.addNode({
        id: ""+idx,   // Note: ‘id’ must be a string
        label: albums[idx].album,
        x: 200*Math.sin(theta),
        y: 200*Math.cos(theta),
        size: 1
    });
}
s1.refresh();

var s2 = new sigma("graph-2");
s2.settings({
	defaultLabelColor: '#444444',
  defaultNodeColor: '#ffa44f',
	font: "Lato, 'Helvetica Neue', Helvetica, Arial, sans-serif",
  sideMargin: 50,
  zoomMin: 1.0,
  zoomMax: 1.0
});
for (var idx=0; idx<albums.length; idx++) {
    var theta = idx*2*Math.PI / albums.length;
    s2.graph.addNode({
        id: ""+idx,   // Note: ‘id’ must be a string
        label: albums[idx].album,
        x: 200*Math.sin(theta),
        y: 200*Math.cos(theta),
        size: 1
    });
}
for (var srcIdx=0; srcIdx<albums.length; srcIdx++) {
  var src = albums[srcIdx];
  for (var mscIdx=0; mscIdx<src.musicians.length; mscIdx++) {
    var msc = src.musicians[mscIdx];
    for (var tgtIdx=srcIdx+1; tgtIdx<albums.length; tgtIdx++) {
      var tgt = albums[tgtIdx];
      if (tgt.musicians.some(function(tgtMsc) {return tgtMsc === msc;})) {
        s2.graph.addEdge({
          id: srcIdx + "." + mscIdx + "-" + tgtIdx,
          source: ""+srcIdx,
          target: ""+tgtIdx
        })
      }
    }
  }
}
s2.refresh();

s3 = new sigma("graph-3");
s3.settings({
	defaultLabelColor: '#444444',
  defaultNodeColor: '#ffa44f',
	font: "Lato, 'Helvetica Neue', Helvetica, Arial, sans-serif",
  sideMargin: 50,
  zoomMin: 1.0,
  zoomMax: 1.0
});
for (var idx=0; idx<albums.length; idx++) {
    var theta = idx*2*Math.PI / albums.length;
    s3.graph.addNode({
        id: ""+idx,   // Note: ‘id’ must be a string
        label: albums[idx].album,
        x: Math.sin(theta),
        y: Math.cos(theta),
        size: 1
    });
}
for (var srcIdx=0; srcIdx<albums.length; srcIdx++) {
  var src = albums[srcIdx];
  for (var mscIdx=0; mscIdx<src.musicians.length; mscIdx++) {
    var msc = src.musicians[mscIdx];
    for (var tgtIdx=srcIdx+1; tgtIdx<albums.length; tgtIdx++) {
      var tgt = albums[tgtIdx];
      if (tgt.musicians.some(function(tgtMsc) {return tgtMsc === msc;})) {
        s3.graph.addEdge({
          id: srcIdx + "." + mscIdx + "-" + tgtIdx,
          source: ""+srcIdx,
          target: ""+tgtIdx
        })
      }
    }
  }
}
setTimeout(function() {s3.startForceAtlas2();}, 5000);
setTimeout(function() {s3.stopForceAtlas2();},  7000);

var s4 = new sigma("graph-4");
s4.settings({
	defaultLabelColor: '#444444',
  defaultNodeColor: '#ffa44f',
	font: "Lato, 'Helvetica Neue', Helvetica, Arial, sans-serif",
  sideMargin: 50,
  zoomMin: 1.0,
  zoomMax: 1.0
});
for (var idx=0; idx<albums.length; idx++) {
    var theta = idx*2*Math.PI / albums.length;
    s4.graph.addNode({
        id: ""+idx,   // Note: ‘id’ must be a string
        label: albums[idx].album,
        x: Math.sin(theta),
        y: Math.cos(theta),
        size: 1
    });
}
for (var srcIdx=0; srcIdx<albums.length; srcIdx++) {
  var src = albums[srcIdx];
  for (var mscIdx=0; mscIdx<src.musicians.length; mscIdx++) {
    var msc = src.musicians[mscIdx];
    for (var tgtIdx=srcIdx+1; tgtIdx<albums.length; tgtIdx++) {
      var tgt = albums[tgtIdx];
      if (tgt.musicians.some(function(tgtMsc) {return tgtMsc === msc;})) {
        s4.graph.addEdge({
          id: srcIdx + "." + mscIdx + "-" + tgtIdx,
          source: ""+srcIdx,
          target: ""+tgtIdx
        })
      }
    }
  }
}
setTimeout(function() {s4.startForceAtlas2();}, 8000);
setTimeout(function() {s4.stopForceAtlas2();},  9500);
var lastClicked = null;
s4.bind('clickNode', function(ev) {
  var nodeIdx = ev.data.node.id;
  var highlight = [];
  if (lastClicked !== ev.data.node.id) {
    lastClicked = ev.data.node.id;
    highlight.push(ev.data.node.id);
  } else {
    lastClicked = null;
  }
  s4.graph.edges().forEach(function(edge) {
    if (highlight.length && 
        ((edge.target === nodeIdx) || (edge.source === nodeIdx)) ) {
      edge.color = '#97aceb';
      highlight.push(edge.target);
      highlight.push(edge.source);
  } else {
      edge.color = '#ffa44f';
    }
  });
  s4.graph.nodes().forEach(function(node) {
    if (highlight.length && highlight.some(function(n){return n === node.id})) {
      node.color = '#97aceb';
    } else {
      node.color = '#ffa44f';
    }
  });
  s4.refresh();
});


});
</script>