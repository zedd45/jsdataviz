# Data Visualization with JavaScript
## A Book Proposal by Stephen Thomas

With the growing focus on Data Science, web developers and designers want to present attractive and compelling data visualizations on their sites. It can be quite confusing, however, to choose appropriate tools and techniques for that task. [Many](http://codegeekz.com/javascript-chart-and-graph-libraries/) are available, often with a justified reputation for a [steep learning curve](https://www.google.com/#newwindow=1&q=d3.js+learning+curve). _Data Visualization with JavaScript_, by an established author and noted industry speaker, shows readers how to create data visualizations for the web with the best tools and professional techniques.

This proposal provides details of the book, including

* The Goal: Data Visualizations without the Complexity
* The Market
* Detailed Outline
* Schedule for Completion
* Links to Writing Samples
* Tools
* Background on the Author

### The Goal: Data Visualizations without the Complexity

Stephen Thomas, the author of this book, loves data and loves to see it presented clearly and effectively. Unfortunately, in his work as a consultant and as staff member at the Georgia Institute of Technology, he continues to see both students and other web developers struggling with data visualization and web technologies. This book was conceived as a guide to help exactly those readers.

**Audience:** Novice to intermediate web designers and developers. Although not JavaScript gurus, such readers are  familiar with popular JavaScript libraries such as jQuery. They want to incorporate visualization in their web pages with a minimum of fuss and effort. They are not data visualization specialists, however, and don’t wish to invest the time and effort required to learn and use a professional data visualization framework such as D3.js.

**Purpose:** The book provides guided walkthroughs for a wide variety of data visualization examples. Each chapter focuses on particular types of visualizations, explaining their advantages and disadvantages while providing guidance on their implementation. Readers in a hurry can simply “copy-and-paste” the example code into their own application, while the accompanying explanatory material offers more in-depth coverage for readers with further interest.


### The Market

One indication of the potential market size comes from an unlikely source—the inadvertent disclosure of the in-progress version of the book. An unknown reader stumbled across the github repository storing the book’s text and noted it on Hacker News. The [post](https://news.ycombinator.com/item?id=7180804) received considerable attention, briefly making the front page of the site. Readers comments on the draft included:

> I actually stumbled on this book yesterday. I read a few chapters. What surprised me the most other than the good content if you're in the JS analytics space, but actually the fluidity and level of the writing was so much than what you usually expect to come across in what on the surface of things should be dry. It kept me going for a few more chapters. Hope this catches on.
— user “bingcrosby”

> Good Book indeed. We are learning alternative from here after d3.js and Highchart. Reading the book and will try to employ this in analytic portions of our in-house project.
— user “piyasde”

> Bravo and thanks to another new and free reference.
— user “danso”

Currently the market for books on Data Visualization and JavaScript is dominated by works covering the D3.js library with [Amazon.com](http://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=D3.js) listing no less than 7 titles. Notably, there are **no** books on Data Visualization and JavaScript other than those books covering D3.js. D3 is justifiably well-regarded by data visualization professionals (the author has extensive experience with it in real world applications), but it is a powerful and complex library. Its complexity makes D3.js inaccessible to the novice and intermediate web developers that this book targets. As the myriad of [web tutorials](https://www.google.com/#newwindow=1&q=d3.js+tutorial) (and growing library of texts) indicates, there is a strong desire within the web development community for a simple and understandable way to incorporate data visualizations within web sites. This book directly addresses that need.

### Outline

The book consists of eight chapters averaging about 15,000 words and 30-40 pages in length. Each chapter includes extensive sample code. The chapters begin with the simplest, static visualizations and conclude with guidelines for building a complete, data-driven web application. The following outline includes an introduction to each chapter and a list of its contents.

#### Chapter 1: Graphing Data

Many people think of data visualization as intricate interactive graphics of dazzling complexity. As all of us have spent time on the Internet, we've been blessed and entertained with marvelous visualizations from top  professionals working at some of the world’s best web sites. Creating effective visualizations, however, doesn't require Picasso’s artistic skills nor Turing’s programming expertise. In fact, when you consider the ultimate purpose of data visualization—helping users _understand_ data—simplicity stands out as one of the most important virtues. Simple, straightforward charts are often the easiest to understand. After all, your users have seen hundreds or thousands of bar charts, line charts, x-y plots, and the like. They know the conventions that underlie these charts, and they can effortlessly interpret any well-designed example. That makes them the first choice for planning any visualization. If a simple, static chart presents your data best, use it. You’ll spend less effort creating your visualization, and your users will spend less effort trying to understand it.

Simplicity brings an extra bonus: There are many high quality tools and libraries to help you get started. Not only can you avoid reinventing the wheel, you can be assured of a reasonably attractive presentation using nothing but the libraries’ defaults. We’ll look at several of these tools throughout the book; for this chapter the library of choice is [flotr2](www.humblesoftware.com/flotr2/). As we’ll see, flotr2 makes it easy to add standard bar charts, line charts, and pie charts to any web page. It also supports some less common chart types, and you can even extend it to create a completely custom chart just for your data. We’ll take a look at all of these techniques in the examples that follow. Here’s what we’ll learn:

* How to create a basic bar chart
* How to plot continuous data with a line chart
* How to emphasize fractions with a pie chart
* How to plot X/Y data with a scatter chart
* How to show magnitudes of X/Y data with a bubble chart
* How to display multidimensional data with a radar chart
* How to create a custom chart type

#### Chapter 2: Making Charts Interactive

In chapter 1 we saw how to create a wide variety of simple, static charts. In many cases such charts are the ideal visualization; however, they don’t take advantage of an important characteristic of the web—it’s interactivity. Sometimes you want to do more than just present data to your users; you want to give them a chance to explore the data, to focus on those elements they find particularly interesting, or to consider alternative scenarios. In those cases we can really take advantage of the web as a medium by adding interactivity to our visualizations.

Because they’re designed for the web, virtually all of the libraries and toolkits we examine in this book include support for interactivity. That’s certainly true of the flotr2 library that chapter 1 covers. But since we have a new chapter, we can take the opportunity to explore alternatives. The [Flot library](http://www.flotcharts.org/), which is based on jQuery, features exceptionally strong support for interactive and real time charts, so that’s what we’ll use for these examples.

For this chapter, we’re also going to stick with a single data source: the Gross Domestic Product (GDP) for countries worldwide. This data is publicly available from the [World Bank](http://data.worldbank.org). It may not seem like the most exciting data with which to work, but, as we’ll see, effective visualizations can bring even the most mundane data alive.

Here’s what we’ll learn:

* How to let users select the content for a chart
* How to let users zoom into a chart to see more details
* How to make a chart respond to user mouse movements
* How to dynamically get data for a chart using an AJAX service

#### Chapter 3: Integrating Charts in a Page

When we consider data visualizations for the web, we often think of featuring them prominently on the page. In many cases they _are_ the web page. That’s not always the right approach, though. The best visualizations are effective because they help the user understand the data, not because they “look pretty” on the page. Some data may be straightforward enough to present without context, but meaningful data probably isn’t. And if our presentation requires context, its visualizations are likely sharing the page with other content. When we design web pages, we should take care to balance any individual component with the page as a whole. If a single visualization is not the entire story, it shouldn’t take up all (or even most) of the space on the page. It can be challenging, however, to minimize the space a traditional chart requires. There are, after all, axes and labels and titles and legends and such to place.

Edward Tufte considered this problem in his groundbreaking work _The Visual Display of Quantitative Information,_ and he proposed a novel solution he called _sparklines._ Sparklines are charts stripped to their bare essentials. No labels, axes, titles or other elements we often see in a chart. Without these elements, sparklines can present a lot of information in very little space, even to the point where it is possible to include a chart right in the middle of a sentence. There is no need for “See figure below” or “Click for larger view.” One of Tufte’s earliest examples presents the glucose level of a medical patient; here’s a reproduction: ![](https://dl.dropboxusercontent.com/u/15059190/sparkline.png) **Glucose**

In a mere 154×20 pixels we’ve shown the patient’s current glucose level, its trend for more than two months, high and low values, and the range of normal values. This high information density makes sparklines effective any time space is a premium—inline in textual paragraphs, as cells in tables, or as part of information dashboards.

Sparklines do have disadvantages of course. They cannot provide as much fine-grained detail as a full size chart with axes and labels. They also cannot support significant interactivity, so we can’t give users a lot of flexibility in selecting data or zooming in for detail. For many visualizations, however, those concerns aren’t significant. Furthermore, as we’ll see in some of this chapter’s examples, the web gives us the chance to augment sparklines in ways not possible in print.

There are a few Javascript libraries and toolkits for creating sparklines, but we’ll focus on the most popular of them: [jQuery sparklines](http://omnipotent.net/jquery.sparkline/). As the name implies, this open source library is an extension to jQuery. The examples that follow look closely at how our web pages can add these tools and use them for information dense visualizations. Here’s what we’ll learn:

* How to create a classic sparkline for integration directly in text
* How to combine multiple sparklines to show comparisons
* How to annotate sparklines with additional details
* How to create composite charts
* How to respond to click events on the page
* How to update our charts in real time

#### Chapter 4: Creating Specialized Graphs

The first three chapters looked at different ways to create many of the common types of charts with Javascript. We saw how to create static bar, line, and scatter plots, how to make them interactive, and how to incorporate them in a complete page. Sometimes, though, a common chart type isn’t the best way to visualize your data. If that data has unique properties, or if you want to show it in an unusual way, a more specialized chart might be the most appropriate format.

Fortunately, there are many Javascript techniques and plugins to expand our visualization vocabulary beyond the standard charts. In this chapter we’ll look at approaches for several specialized chart type. We’ll see how to use

* tree maps to combine hierarchy and dimension
* heat maps to differentiate regions within an area
* Gantt charts to track projects
* network graphs to show linkages between entities
* interactive state diagrams to analyze processes

#### Chapter 5: Showing Time Lines

The most compelling visualizations often succeed because they tell a story; they extract a narrative from data and reveal that narrative to their users. And as with any narrative, _time_ provides a critical component of such visualizations. If our data consists solely of numbers, a standard bar or line chart can easily show its evolution over time. If our data is not numerical, however, standard charts probably won’t work. This chapter considers several alternatives for time-based visualizations. All are based on some variation of a time line; one linear dimension represents time, and events are places along that dimension based on when they occurred. In all of the examples we’ll consider the same underlying data, a [possible chronology of the plays of William Shakespeare](http://en.wikipedia.org/wiki/Chronology_of_Shakespeare%27s_plays).

* organizing historical time lines on a page
* a horizontally scrollable time line
* a rich, multimedia time line
 
#### Chapter 6: Visualizing Geographic Data

The data that we want to visualize often has a geographic component, as important values vary by city, region, country, or other location. That type of variability naturally leads us to consider maps, a visualization tool on which humans have relied for at least [9000 years](http://www.npr.org/2014/01/09/260918293/there-she-blew-volcanic-evidence-of-the-worlds-first-map). There are many tools to help bring that ancient tool to the interactive web, and we’ll consider a range of options from the simple to the complex. This chapter examines

* using map icon fonts for choropleth maps
* integrating SVG maps with HTML
* adding fully-interactive maps to a page

#### Chapter 7: Managing Data in the Browser

In the first six chapters we’ve looked at a lot of visualization tools and techniques, but we haven’t spent much time considering the _data_ part of data visualization. The emphasis on visualization is appropriate in many cases. Especially if the data is static, we can take all the time we need to clean and groom it before it’s even represented in Javascript. But what if we’re not so lucky. Our data may be dynamic, and we may have no choice but to retrieve the raw source directly into our Javascript application. We have much less control over data from third party REST APIs, Google Docs spreadsheets, or automatically generated CSV files. With those types of data sources, we often need to validate, reformat, recalculate, or otherwise manipulate the data in the browser.

This chapter considers a Javascript library that is particularly helpful for managing large data sets in the web browser--[Underscore.js](http://underscorejs.org). We‘ll cover several aspects of Underscore in the following sections:

* A programming style that Underscore.js encourages called “functional programming.”
* Working with simple arrays using Underscore.js utilities.
* Enhancing Javascript objects.
* Manipulating collections of objects.

#### Chapter 8: Building Data-Driven Web Applications

In this final chapter it’s time to put all the pieces together into a complete web application. Individual, isolated charts and graphs work well to enhance other content on a web page, but when data _is_ the page content, organizing and structuring our code offers significant benefits. For JavaScript, such organization often relies on a third-party Model/View framework or library, and for this chapter’s examples, we’ll rely on one of the most popular: [Backbone.js](http://backbonejs.org). We’ll create an application to visualize running data from Nike’s [Nike+](https://secure-nikeplus.nike.com/plus/) web service. The topics in the chapter are:

* Using Backbone Models to represent data.
* Getting data into Backbone Collections using a REST API.
* Presenting different perspectives on the data with Backbone Views.
* Organizing the application with Backbone Routes.

Although our examples rely specifically on Backbone.js, the principles apply equally to similar libraries and frameworks such as [AngularJS](http://angularjs.org), [Knockout](http://knockoutjs.com), and [Spine](http://spinejs.com).

### Schedule

As of March 1, the book is over 50% complete, with complete first drafts available for chapters 1, 2, 3, and 7, and first drafts nearly complete for chapters 4 and 8. The author anticipates completion of the entire text by early June 2014.

* Chapter 1 complete draft: available now
* Chapter 2 complete draft: available now
* Chapter 3 complete draft: available now
* Chapter 4 complete draft: available late March 2014
* Chapter 5 complete draft: available late April 2014
* Chapter 6 complete draft: available late May 2014
* Chapter 7 complete draft: available now
* Chapter 8 complete draft: available early June 2014

### Writing Samples

Writing samples are most readily available from the book's in-progress web site [http://sathomas.me/jsdataviz/](http://sathomas.me/jsdataviz/index.html). The author's previous books are available from [Amazon.com](http://www.amazon.com/Stephen-A.-Thomas/e/B000APYM22), and published articles are online at

* Smashing Magazine: [“Simple Responsive Images with CSS Backgrounds”](http://mobile.smashingmagazine.com/2013/07/22/simple-responsive-images-with-css-backgrounds/).
* Sitepoint.com: [“Unit Testing Backbone.js Applications”](http://www.sitepoint.com/unit-testing-backbone-js-applications/).
* UICloud: [“Web-Based Visualization”](http://ui-cloud.com/web-based-visualization-part-1-the-d3-js-key-concept/).

### Tools

The book is authored in plain text (Markdown) for ease of export to any common format including DocBook or MS Word. Visualizations are created using HTML, CSS, and JavaScript and may be extracted from web pages using common screen capture utilities. Illustrations are created in OmniGraffle and may be exported in vector (SVG, PDF, ...) or bitmap (TIFF, PNG, ...) formats.

### Author

Stephen Thomas is the author of several books on the Internet and networking technologies, most of which are listed on his [Amazon.com Authors's Page](http://www.amazon.com/Stephen-A.-Thomas/e/B000APYM22). (Note: Although previous texts have been published by John Wiley & Sons, that publisher does **not** have a right of first refusal on future works.) He has written frequently on web development and technology, including in popular online properties such as [Smashing Magazine](http://mobile.smashingmagazine.com/2013/07/22/simple-responsive-images-with-css-backgrounds/), [Sitepoint.com](http://www.sitepoint.com/unit-testing-backbone-js-applications/), and [UICloud](http://ui-cloud.com/web-based-visualization-part-1-the-d3-js-key-concept/). He maintains his own personal [blog](http://blog.sathomas.me), and has presented at conferences such as [devnexus](http://devnexus.com/s/devnexus2014/presentations#id-2493) and [Atlanta Code Camp](http://atlantacodecamp.com/2013/Sessions).

