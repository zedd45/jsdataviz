### Responding to Click Events

Throughout this chapter we’ve looked at how to a lot of visual information in a small space, making it easier to integrate the visualization within a web page. The basic sparkline by itself is very efficient, and previous examples have added annotations and composites to increase the information density further. Sometimes, however, there’s just no way to fit all the possible data in a small enough space. Even in these cases, though, the interactive nature of the web can help us out. Our web page can start with a compact visualization but expand to a different view—one with richer details—with a simple click or tap.

Indeed the compact quality of sparklines seems to invite interaction. In every usability test I’ve performed that included sparklines on a web page, the participants invariably clicked on the chart. That was true even when there were no other details that the page could provide and the participants had no idea what to expect in response to their clicks. It is almost as if users inevitably click on sparklines just to see what happens.

This example continues our stock market example. We’ll begin with the same basic stock price chart we’ve seen before, but enhance it to provide extensive details when users click on the chart region.

Just as in this chapter’s [first example](#id1), we need to include the sparklines and jQuery libraries in our web. Because we’re visualizing the same data as in the previous example, we’ll also want to set up the data array exactly as in that example. The HTML markup, however, can be much simpler. All we need is a simple `<div>` to hold the chart.

```language-markup
<div id="stock"></div>
```

#### Step 1: Add the Chart

Adding the chart to our markup is easy with the sparklines library. We can use the jQuery `.map()` function to extract the adjusted close value from our `stock` array.

```language-javascript
$('#stock').sparkline($.map(stock, function(wk) { return wk.adj_close; }));
```

The static chart shows the stock performance nicely.

<figure id='click-chart1'></figure>

#### Step 2: Handle Click Events

The sparklines library makes it easy for us to handle click events. When users click on a chart region, the library generates a custom `sparklineClick` event. The event data includes all the normal click properties, plus information about where on the chart the user clicked. To be notified of clicks, we define a handler for that custom event.

```language-javascript
$('#stock')
    .sparkline($.map(stock, function(wk) { return wk.adj_close; }))
    .on('sparklineClick', function(ev) {
        var sparkline = ev.sparklines[0],
        region = sparkline.getCurrentRegionFields();
        /* region.x and region.y are the coordinates of the click */
    });
```

Now that we’re set up to receive `sparklineClick` events, we can write the code to respond to them. For our example, let’s reveal a detailed financial analysis widget. Many web services, including Yahoo and Google, have similar widgets, but we’ll use one from WolframAlpha. As is typical, WolframAlpha provides code for the widget as an HTML `<iframe>`. We can wrap that `<iframe>` in our own `<div>` and place it immediately after the chart. The contents are initially hidden, so we can set a `display` property of `none`. (The snippet below omits the details of the `<iframe>` element for clarity.)

```language-markup
<div id="stock"></div>
<div id="widget" style="display:none"><iframe></iframe></div>
```

Now our event handling code can reveal the widget using the jQuery `show()` function.

```language-javascript
  .on('sparklineClick', function(ev) {
    $("#widget").show();
  });
```

That works to reveal the details, but the resulting presentation isn’t quite elegant.

<div>&nbsp;</div>
<div id="click-chart2"></div>
<div id="popup2" style="width:600px;height:600px;display:none">
<iframe class="wolframAlphaWidgetResults" id="wolframAlphaWidgetResults44381" width="100%" frameborder="0" style="background-color: transparent; height: 600px; background-position: initial initial; background-repeat: initial initial; " src="http://www.wolframalpha.com/widget/input/?input=%5B%2F%2Fstock%3Aaapl%2F%2F%5D&amp;id=a80a2e4562755353141f214b5ad28081"></iframe>
</div>

#### Step 3: Improve the Transitions

Instead of simply revealing the widget beneath the chart, it would be better to have the widget replace the chart. And if we’re going to do that, we’ll also want to give the users a chance to restore the chart and hide the widget. For that last function, we can include a special `<div>` for controlling the widget’s visibility. As the example below shows, the only content we need for this controller is a close symbol floated right. Just like the widget itself, the controller is initially hidden.

```language-markup
<div id="stock"></div>
<div id="widget-control" style="width:600px;display:none">
    <a href="#" style="float:right">&times;</a>
</div>
<div id="widget" style="width:600px;display:none">
    <iframe></iframe>
</div>
```

Now when the user clicks on the chart, we can hide the chart, reveal the controller, and reveal the widget.

```language-javascript
.on('sparklineClick', function(ev) {
    $("#widget").show();
    $("#widget-control").show();
    $("#stock").hide();
});
```

Next we intercept clicks on the close symbol in the widget controller. We first prevent default event handling; otherwise the browser will disconcertingly jump to the top of the page. Then we hide the widget and its controller while revealing the chart again.

```language-javascript
$("#widget-control a").click(function(ev) {
    ev.preventDefault();
    $("#widget").hide();
    $("#widget-control").hide();
    $("#stock").show();
})
```

Finally, we need to give the user some indication that this interaction is possible. On the chart, we can override the sparklines library’s default tooltip to let users know that more details are available.

```language-javascript
$('#stock')
    .sparkline(
        $.map(stock, function(wk) { return wk.adj_close; }),
        { tooltipFormatter: function() {return "Click for details"; } }
    );
```

And for the widget controller, we simple add a `title` attribute.

```language-markup
<div id="stock"></div>
<div id="widget-control" style="width:600px;display:none">
    <a href="#" title="Click to hide" style="float:right">&times;</a>
</div>
<div id="widget" style="width:600px;display:none">
    <iframe></iframe>
</div>
```

These additions give us a simple sparkline chart that expands to a wealth of details with a single click. The close symbol in the upper right lets users return to the more compact sparkline.

<div>&nbsp;</div>
<div id="click-chart3"></div>
<div id="popup3-control" style="width:600px;display:none">
  <a href="#" title="Click to hide" style="float:right">&times;</a>
</div>
<div id="popup3" style="width:600px;height:620px;display:none">
<iframe class="wolframAlphaWidgetResults" id="wolframAlphaWidgetResults44381" width="100%" frameborder="0" style="background-color: transparent; height: 600px; background-position: initial initial; background-repeat: initial initial; " src="http://www.wolframalpha.com/widget/input/?input=%5B%2F%2Fstock%3Aaapl%2F%2F%5D&amp;id=a80a2e4562755353141f214b5ad28081"></iframe>
</div>

#### Step 4: Animation

For a final touch to our visualization, let’s do something about the abrupt hiding and revealing of the visualization components. A smoother animation will help our users follow the transition, and jQuery makes it easy enough to implement. There are lots of animation effects available in the jQuery UI library, but the basic functionality of jQuery’s core is fine for this example. We simply replace the `show()` and `hide()` functions with `slideDown()` and `slideUp()` respectively.

```language-javascript
.on('sparklineClick', function(ev) {
    $("#widget").slideDown();
    $("#widget-control").slideDown();
    $("#stock").slideDown();
});
$("#widget-control a").click(function(ev) {
    ev.preventDefault();
    $("#widget").slideDown();
    $("#widget-control").slideDown();
    $("#stock").slideDown();
})
```

At this point we can call our visualization complete. The compact sparkline smoothly transitions to detailed information on a click, and those details transition back to the sparkline when they’re closed.

<div>&nbsp;</div>
<div id="click-chart4"></div>
<div id="popup4-control" style="width:600px;display:none">
  <a href="#" title="Click to hide" style="float:right">&times;</a>
</div>
<div id="popup4" style="width:600px;height:620px;display:none">
<iframe class="wolframAlphaWidgetResults" id="wolframAlphaWidgetResults44381" width="100%" frameborder="0" style="background-color: transparent; height: 600px; background-position: initial initial; background-repeat: initial initial; " src="http://www.wolframalpha.com/widget/input/?input=%5B%2F%2Fstock%3Aaapl%2F%2F%5D&amp;id=a80a2e4562755353141f214b5ad28081"></iframe>
</div>



<script>
contentLoaded.done(function() {

var stock = [
  { date: "2012-01-03", open: 409.40, high: 422.75, low: 409.00, close: 422.40, volume: 10283900, adj_close: 416.26 },
  { date: "2012-01-09", open: 425.50, high: 427.75, low: 418.66, close: 419.81, volume:  9327900, adj_close: 413.70 },
  { date: "2012-01-17", open: 424.20, high: 431.37, low: 419.75, close: 420.30, volume: 10673200, adj_close: 414.19 },
  { date: "2012-01-23", open: 422.67, high: 454.45, low: 419.55, close: 447.28, volume: 17397900, adj_close: 440.77 },
  { date: "2012-01-30", open: 445.71, high: 460.00, low: 445.39, close: 459.68, volume: 10817600, adj_close: 452.99 },
  { date: "2012-02-06", open: 458.38, high: 497.62, low: 458.20, close: 493.42, volume: 17778800, adj_close: 486.24 },
  { date: "2012-02-13", open: 499.53, high: 526.29, low: 486.63, close: 502.12, volume: 28314900, adj_close: 494.82 },
  { date: "2012-02-21", open: 506.88, high: 522.90, low: 504.12, close: 522.41, volume: 18499900, adj_close: 514.81 },
  { date: "2012-02-27", open: 521.31, high: 548.21, low: 516.28, close: 545.18, volume: 22964000, adj_close: 537.25 },
  { date: "2012-03-05", open: 545.42, high: 547.74, low: 516.22, close: 545.17, volume: 23951800, adj_close: 537.24 },
  { date: "2012-03-12", open: 548.98, high: 600.01, low: 547.00, close: 585.57, volume: 32158400, adj_close: 577.05 },
  { date: "2012-03-19", open: 598.37, high: 609.65, low: 589.05, close: 596.05, volume: 24402100, adj_close: 587.38 },
  { date: "2012-03-26", open: 599.79, high: 621.45, low: 595.26, close: 599.55, volume: 22840000, adj_close: 590.83 },
  { date: "2012-04-02", open: 601.83, high: 634.66, low: 600.38, close: 633.68, volume: 23635600, adj_close: 624.46 },
  { date: "2012-04-09", open: 626.13, high: 644.00, low: 603.51, close: 605.23, volume: 26127500, adj_close: 596.43 },
  { date: "2012-04-16", open: 610.06, high: 620.25, low: 570.42, close: 572.98, volume: 34975300, adj_close: 564.65 },
  { date: "2012-04-23", open: 570.61, high: 618.00, low: 555.00, close: 603.00, volume: 27794600, adj_close: 594.23 },
  { date: "2012-04-30", open: 597.80, high: 598.40, low: 565.17, close: 565.25, volume: 17607600, adj_close: 557.03 },
  { date: "2012-05-07", open: 561.50, high: 575.88, low: 558.73, close: 566.71, volume: 15505800, adj_close: 558.47 },
  { date: "2012-05-14", open: 562.57, high: 567.51, low: 522.18, close: 530.38, volume: 20281200, adj_close: 522.67 },
  { date: "2012-05-21", open: 534.50, high: 576.50, low: 534.05, close: 562.29, volume: 19540000, adj_close: 554.11 },
  { date: "2012-05-29", open: 570.90, high: 581.50, low: 560.52, close: 560.99, volume: 17166000, adj_close: 552.83 },
  { date: "2012-06-04", open: 561.50, high: 580.58, low: 548.50, close: 580.32, volume: 14813900, adj_close: 571.88 },
  { date: "2012-06-11", open: 587.72, high: 588.50, low: 566.70, close: 574.13, volume: 14293200, adj_close: 565.78 },
  { date: "2012-06-18", open: 570.96, high: 590.00, low: 570.37, close: 582.10, volume: 12654100, adj_close: 573.63 },
  { date: "2012-06-25", open: 577.30, high: 584.00, low: 565.61, close: 584.00, volume: 10630300, adj_close: 575.51 },
  { date: "2012-07-02", open: 584.73, high: 614.34, low: 583.60, close: 605.88, volume: 13795700, adj_close: 597.07 },
  { date: "2012-07-09", open: 605.30, high: 619.87, low: 592.68, close: 604.97, volume: 15001100, adj_close: 596.17 },
  { date: "2012-07-16", open: 605.12, high: 615.35, low: 603.15, close: 604.30, volume: 12013700, adj_close: 595.51 },
  { date: "2012-07-23", open: 594.40, high: 609.68, low: 570.00, close: 585.16, volume: 19578500, adj_close: 576.65 },
  { date: "2012-07-30", open: 590.92, high: 617.98, low: 587.82, close: 615.70, volume: 13593200, adj_close: 606.74 },
  { date: "2012-08-06", open: 617.29, high: 625.00, low: 615.26, close: 621.70, volume:  8955900, adj_close: 615.29 },
  { date: "2012-08-13", open: 623.39, high: 648.19, low: 623.25, close: 648.11, volume: 11240200, adj_close: 641.43 },
  { date: "2012-08-20", open: 650.01, high: 674.88, low: 648.11, close: 663.22, volume: 20349200, adj_close: 656.38 },
  { date: "2012-08-27", open: 679.99, high: 680.87, low: 657.25, close: 665.24, volume: 10987500, adj_close: 658.38 },
  { date: "2012-09-04", open: 665.76, high: 682.48, low: 664.50, close: 680.44, volume: 12724300, adj_close: 673.42 },
  { date: "2012-09-10", open: 680.45, high: 696.98, low: 656.00, close: 691.28, volume: 20736000, adj_close: 684.15 },
  { date: "2012-09-17", open: 699.35, high: 705.07, low: 693.62, close: 700.09, volume: 14332600, adj_close: 692.87 },
  { date: "2012-09-24", open: 686.86, high: 695.12, low: 660.35, close: 667.10, volume: 20459000, adj_close: 660.22 },
  { date: "2012-10-01", open: 671.16, high: 676.75, low: 650.65, close: 652.59, volume: 18290000, adj_close: 645.86 },
  { date: "2012-10-08", open: 646.88, high: 647.56, low: 623.55, close: 629.71, volume: 21378800, adj_close: 623.21 },
  { date: "2012-10-15", open: 632.35, high: 652.79, low: 609.62, close: 609.84, volume: 18514400, adj_close: 603.55 },
  { date: "2012-10-22", open: 612.42, high: 635.38, low: 591.00, close: 604.00, volume: 24908300, adj_close: 597.77 },
  { date: "2012-10-31", open: 594.88, high: 603.00, low: 574.75, close: 576.80, volume: 17508000, adj_close: 570.85 },
  { date: "2012-11-05", open: 583.52, high: 590.74, low: 533.72, close: 547.06, volume: 26312500, adj_close: 543.89 },
  { date: "2012-11-12", open: 554.15, high: 554.50, low: 505.75, close: 527.68, volume: 25590900, adj_close: 524.62 },
  { date: "2012-11-19", open: 540.71, high: 572.00, low: 539.88, close: 571.50, volume: 18856200, adj_close: 568.19 },
  { date: "2012-11-26", open: 575.90, high: 594.25, low: 572.26, close: 585.28, volume: 18505600, adj_close: 581.89 },
  { date: "2012-12-03", open: 593.65, high: 594.59, low: 518.63, close: 533.25, volume: 28073100, adj_close: 530.16 },
  { date: "2012-12-10", open: 525.00, high: 549.56, low: 505.58, close: 509.79, volume: 23891500, adj_close: 506.84 },
  { date: "2012-12-17", open: 508.93, high: 534.90, low: 501.23, close: 519.33, volume: 20790100, adj_close: 516.32 },
  { date: "2012-12-24", open: 520.35, high: 524.25, low: 504.66, close: 509.59, volume: 11496300, adj_close: 506.64 },
  { date: "2012-12-31", open: 510.53, high: 535.40, low: 509.00, close: 532.17, volume: 23553300, adj_close: 529.09 },
];

$('#click-chart1').sparkline(
    $.map(stock, function(wk) { return wk.adj_close; }),
    {
        height: 40,
        width: 200,
        lineColor: "#745eb7",
        fillColor: "#95a7e8",
        spotColor: false,
        minSpotColor: "#fca44e",
        maxSpotColor: "#fca44e",
    }
);

$('#click-chart2')
  .sparkline(
    $.map(stock, function(wk) { return wk.adj_close; }),
    {
        height: 40,
        width: 200,
        lineColor: "#745eb7",
        fillColor: "#95a7e8",
        spotColor: false,
        minSpotColor: "#fca44e",
        maxSpotColor: "#fca44e",
    }
  ).on('sparklineClick', function(ev) {
    $("#popup2").show();
  });

$('#click-chart3')
  .sparkline(
    $.map(stock, function(wk) { return wk.adj_close; }),
    {
        height: 40,
        width: 200,
        lineColor: "#745eb7",
        fillColor: "#95a7e8",
        spotColor: false,
        minSpotColor: "#fca44e",
        maxSpotColor: "#fca44e",
        disableHighlight: true,
        tooltipFormatter: function() {return "Click for details"; }
    }
  ).on('sparklineClick', function(ev) {
    $("#popup3").show();
    $("#popup3-control").show();
    $('#click-chart3').hide();
  });
  $("#popup3-control a").click(function(ev) {
    ev.preventDefault();
    $("#popup3").hide();
    $("#popup3-control").hide();
    $('#click-chart3').show();
  })

$('#click-chart4')
  .sparkline(
    $.map(stock, function(wk) { return wk.adj_close; }),
    {
        height: 40,
        width: 200,
        lineColor: "#745eb7",
        fillColor: "#95a7e8",
        spotColor: false,
        minSpotColor: "#fca44e",
        maxSpotColor: "#fca44e",
        disableHighlight: true,
        tooltipFormatter: function() {return "Click for details"; }
    }
  ).on('sparklineClick', function(ev) {
    $("#popup4").slideDown();
    $("#popup4-control").slideDown();
    $('#click-chart4').slideUp();
  });
  $("#popup4-control a").click(function(ev) {
    ev.preventDefault();
    $("#popup4").slideUp();
    $("#popup4-control").slideUp();
    $('#click-chart4').slideDown();
  })

});
</script>
