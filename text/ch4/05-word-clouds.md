### Revealing Language Patterns with Word Clouds

If the data you want to visualize consists of words instead of numbers, ...

[wordcloud2](http://timdream.org/wordcloud2.js)

> Note: As is the case with a few of the more advanced libraries we’ve examined, wordcloud2 doesn’t really function very well in older web browsers such as Internet Explorer version 8 and earlier. Since wordcloud2 itself requires a modern browser, we’ll take advantage of some modern JavaScript features in this example.

#### Step 1: Include the Required Libraries

The wordcloud2 library does not depend on any other JavaScript libraries, so we don’t need any other included scripts. It is not, however, available no common Content Distribution Networks. Consequently, we’ll have to serve it from our own web host.

```language-markup
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <script src="js/wordcloud2.js"></script>
  </body>
</html>
```

> Note: To keep our example focused on the visualization, we’ll use a word list that doesn’t need any special preparation. If you’re working with natural language as spoken or written, however, you might wish to process the text to identify alternate forms of the same word. For example, you might want to count “hold holds held” as three instances of “hold” rather than three separate words. This type of processing obviously depends greatly on the particular language. If you’re working in English and Chinese, though, the same developer that created wordcloud2 has also released the [WordFreq](http://timdream.org/wordfreq/) JavaScript library that performs exactly this type of analysis.

#### Step 2: Prepare the Data

For this example we’ll look at the different tags users associate with their questions on the popular [Stack Overflow](http://stackoverflow.com). That site lets users pose programming questions that the community tries to answer. Tags provide a convenient way to categorize the questions so that, for example, users can focus their attention. By constructing a word cloud (perhaps better named a “tag cloud”) we can quickly show the relative popularity of different programming topics.

If you wanted to develop this example into a real application, you could access the Stack Overflow data in real time using the site’s API. For our example, though, we’ll use a static snapshot. Here’s how it starts:

```language-javascript
var tags = [
    ["c#", 601251],
    ["java", 585413],
    ["javascript", 557407],
    ["php", 534590],
    ["android", 466436],
    ["jquery", 438303],
    ["python", 274216],
    ["c++", 269570],
    ["html", 259946],
...
```

You can see the complete list in the book’s [source code](https://github.com/sathomas/jsdataviz).

The format that wordcloud2 expects is quite simple. The list of words is an array, and each word within the list is also an array. These inner arrays have the word itself as the first item and a size for that word as the second item. For example, the array element `["javascript", 56]` would tell wordcloud2 to draw “javascript” with a height of 56 pixels.

Our data is almost in the appropriate format already, but we do need to convert counts to drawing sizes. The specific algorithm will depend both on the size of the visualization and the raw values. A simple approach we can use with our data is to simply divide the count values by 10000. In chapter 2, we saw how jQuery’s `.map()` function makes it easy to process all the elements in an array. It turns out that modern browsers have the same functionality built in, so we can use the native version of `.map()` even without jQuery. (Chapter 2 uses jQuery’s version of `.map()` because jQuery can support older browsers. Since this example is limited to modern browsers, we can safely use the native version.)

```language-javascript
var list = tags.map(function(word) { return [word[0], Math.round(word[1]/10000)]; });
```

After executing this code, our `list` variable will contain the following:

```language-javascript
[
  ["c#", 60],
  ["java", 59],
  ["javascript", 56],
  ["php", 53],
  ["android", 47],
  ["jquery", 44],
  ["python", 27],
  ["c++", 27],
  ["html", 26],
```

#### Step 3: Add the Required Markup

The wordcloud2 library can build its graphics either using the HTML `<canvas>` interface or in pure HTML. As we’ve seen with many graphing libraries, `<canvas>` is a convenient interface for creating graphic elements. For word clouds, however, there aren’t many benefits to using `<canvas>`. Native HTML, on the other hand, let’s use all the standard HTML tools (such as CSS style sheets or JavaScript event handling). That’s the approach we’ll take in this example. When using native HTML, we do have to make sure that the containing element has a `position: relative` style, as wordcloud2 counts on that when placing the words in their proper location in the cloud.

```language-markup
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <div id="cloud" style="position:relative;"></div>
    <script src="js/wordcloud2.js"></script>
  </body>
</html>
```

#### Step 4: Create a Simple Cloud

With these preparations in place, creating a simple word cloud is about as easy it can get. We call the wordcloud2 library and tell it the HTML element in which to draw the cloud, and the list of words for the cloud’s data.

```language-javascript
WordCloud(document.getElementById("cloud"), {list: list});
```

Even with nothing other than default values, wordcloud2 creates an attractive visualization.

<div id="cloud-1" style="width:800px;height:450px;position:relative;"></div>

The wordcloud2 interface also provides many options for customizing the visualization. As expected, you can set colors and fonts, but you can also change the shape of the cloud (even providing a custom polar equation), rotation limits, internal grid sizing, and many others.

#### Step 5: Add Interactivity

If you ask wordcloud2 to use the `<canvas>` interface, it gives you a couple of callback hooks that your code can use to respond to user interactions. With  native HTML, however, we aren’t limited to just the callbacks that wordcloud2 provides. To demonstrate we can add a simple interaction to respond to mouse clicks on words in the cloud.

First we’ll want to let users know that interactions are supported by changing the mouse cursor when they hover over a cloud word.

```language-css
#cloud span {
    cursor: pointer;
}
```

Next let’s add an extra element to the markup where we can display information about any clicked word.

```language-markup
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <div id="cloud" style="position:relative;"></div>
    <div id="details"><div>
    <script src="js/wordcloud2.js"></script>
  </body>
</html>
```

Then we define a function that can be called when the user clicks. Because our function will be called for any clicks on the cloud (including clicks on empty space), it will first check to see if the target of the click was really a word.

```language-javascript
var clicked = function(ev) {
    if (ev.target.nodeName === "SPAN") {
    }
}
```

If the user did click on a word, we can find out what word by looking at the `textContent` property of the event target.

```language-javascript
var clicked = function(ev) {
    if (ev.target.nodeName === "SPAN") {
        var tag = ev.target.textContent;
    }
}
```

To find that tag in our original array, we’d like to use something like the jQuery `.grep()` method that chapter 2 describes. Unfortunately, although there is such a native method defined (`.find()`) very few browsers (even modern browsers) currently support it. We could resort to a standard `for` or `forEach` loop, but there is an alternative that many consider an improvement over that approach. It relies on the `.some()` method, an array method that modern browsers do support today. The `.some()` method passes every element of an array to an arbitrary function and stops when that function returns true. Here’s how we can use it to find the clicked tag in our `tags` array.

```language-javascript
var clicked = function(ev) {
    if (ev.target.nodeName === "SPAN") {
        var tag = ev.target.textContent;
        var clickedTag;
        tags.some(function(el) { 
            if (el[0] === tag) {
                clickedTag = el; 
                return true;  // This causes the .some() loop to terminate
            }
            return false;
        });
    }
}
```

We can use the return value of the `.some()` method to make sure the clicked element was found in the array. If it was, we can update the extra information below the cloud.

```language-javascript
var clicked = function(ev) {
  var details = "";
  if (ev.target.nodeName === "SPAN") {
      var tag = ev.target.textContent,
          clickedTag;
      if (tags.some(function(el) { if (el[0] === tag) {clickedTag = el; return true;} return false; })) {
          details = "There were " + clickedTag[1] + " Stack Overflow questions tagged '" + tag + "'";
      }
  }
  document.getElementById("details").innerText = details;
}
```

And finally we tell the browser to call our handler when a user clicks on anything in the cloud container.

```language-javascript
document.getElementById("cloud").addEventListener("click", clicked)
```

With these few lines of code, our word cloud is now interactive.

<style>
#cloud-2 span {
    cursor: pointer;
}
</style>

<div id="cloud-2" style="width:800px;height:450px;position:relative;"></div>
<div id="details-2" style="text-align:center;font-size:17px;font-weight:bold;line-height:24px;"><div>

<script>
contentLoaded.done(function() {

var tags = [
 ["c#", 601251],
 ["java", 585413],
 ["javascript", 557407],
 ["php", 534590],
 ["android", 466436],
 ["jquery", 438303],
 ["python", 274216],
 ["c++", 269570],
 ["html", 259946],
 ["mysql", 226906],
 ["ios", 216765],
 ["asp.net", 209653],
 ["css", 199932],
 ["sql", 192739],
 ["iphone", 190382],
 [".net", 179522],
 ["objective-c", 172609],
 ["ruby-on-rails", 152860],
 ["c", 129998],
 ["ruby", 97414],
 ["sql-server", 91050],
 ["ajax", 85036],
 ["xml", 84295],
 ["regex", 81991],
 ["arrays", 80728],
 ["wpf", 80062],
 ["asp.net-mvc", 79697],
 ["database", 70777],
 ["linux", 70772],
 ["json", 70396],
 ["django", 68893],
 ["vb.net", 63061],
 ["windows", 62042],
 ["xcode", 60950],
 ["eclipse", 60512],
 ["string", 54249],
 ["facebook", 53745],
 ["html5", 51015],
 ["ruby-on-rails-3", 50109],
 ["r", 49842],
 ["multithreading", 49806],
 ["winforms", 46643],
 ["wordpress", 46632],
 ["image", 45910],
 ["forms", 41984],
 ["performance", 40607],
 ["osx", 40401],
 ["visual-studio-2010", 40228],
 ["spring", 40207],
 ["node.js", 40041],
 ["excel", 39973],
 ["algorithm", 38661],
 ["oracle", 38565],
 ["swing", 38255],
 ["git", 37842],
 ["linq", 37489],
 ["asp.net-mvc-3", 36902],
 ["apache", 35533],
 ["web-services", 35385],
 ["wcf", 35242],
 ["perl", 35138],
 ["entity-framework", 34139],
 ["sql-server-2008", 33827],
 ["visual-studio", 33664],
 ["bash", 33139],
 ["hibernate", 32263],
 ["actionscript-3", 31760],
 ["ipad", 29476],
 ["matlab", 29210],
 ["qt", 28918],
 ["cocoa-touch", 28753],
 ["list", 28556],
 ["cocoa", 28385],
 ["file", 28200],
 ["sqlite", 28114],
 [".htaccess", 28006],
 ["flash", 27908],
 ["api", 27480],
 ["angularjs", 27042],
 ["jquery-ui", 26906],
 ["function", 26485],
 ["codeigniter", 26426],
 ["mongodb", 26223],
 ["class", 25925],
 ["silverlight", 25878],
 ["tsql", 25706],
 ["css3", 25535],
 ["delphi", 25421],
 ["security", 25325],
 ["google-maps", 24919],
 ["vba", 24301],
 ["internet-explorer", 24270],
 ["postgresql", 24236],
 ["jsp", 24224],
 ["shell", 24184],
 ["google-app-engine", 23892],
 ["oop", 23634],
 ["sockets", 23464],
 ["validation", 23429],
 ["unit-testing", 23249]
];

WordCloud(document.getElementById('cloud-1'), {
  backgroundColor: "#f3f3f3",
  fontFamily: '"Lato","Helvetica Neue",Helvetica,Arial,sans-serif',
  list : tags.map(function(word) { return [word[0], Math.round(word[1]/5000)]; })
});

WordCloud(document.getElementById('cloud-2'), {
  backgroundColor: "#f3f3f3",
  fontFamily: '"Lato","Helvetica Neue",Helvetica,Arial,sans-serif',
  list : tags.map(function(word) { return [word[0], Math.round(word[1]/5000)]; })
});

var clicked = function(ev) {
  if (ev.target.nodeName === "SPAN") {
    var tag = ev.target.textContent;
    var tagElem;
    if (tags.some(function(el) { if (el[0] === tag) {tagElem = el; return true;} return false; })) {
    document.getElementById("details-2").innerText = "There were " + tagElem[1] + 
        " Stack Overflow questions tagged '" + tag + "'";
    }
  } else {
    document.getElementById("details-2").innerText = "";
  }
}
document.getElementById("cloud-2").addEventListener("click", clicked)


});
</script>