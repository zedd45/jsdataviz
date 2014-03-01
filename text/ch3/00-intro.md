## Chapter 3: Integrating Charts in a Page

When we consider data visualizations for the web, we often think of featuring them prominently on the page. In many cases they _are_ the web page. That’s not always the right approach, though. The best visualizations are effective because they help the user understand the data, not because they “look pretty” on the page. Some data may be straightforward enough to present without context, but meaningful data probably isn’t. And if our presentation requires context, its visualizations are likely sharing the page with other content. When we design web pages, we should take care to balance any individual component with the page as a whole. If a single visualization is not the entire story, it shouldn’t take up all (or even most) of the space on the page. It can be challenging, however, to minimize the space a traditional chart requires. There are, after all, axes and labels and titles and legends and such to place.

  <p style="display: inline-block;">
    <span id="sparkline-intro">
        170,134,115,128,168,166,122,81,56,39,97,114,114,130,151,
        184,148,145,134,145,145,145,143,148,224,181,112,111,129,
        151,131,131,131,114,112,112,112,124,187,202,200,203,237,
        263,221,197,184,185,203,290,330,330,226,113,148,169,148,
        78,96,96,96,77,59,22,22,70,110,128
    </span>
    <span style="color:red">&nbsp;128&nbsp;</span>
    <strong>Glucose</strong>
  </p>
</div>




contentLoaded.done(function() {

$('#sparkline-intro').sparkline('html',{
  lineColor: "rgb(68, 68, 68)",
  fillColor: false,
  disableHiddenCheck: true,
  defaultPixelsPerValue: 1,
  spotColor: "red",
  minSpotColor: "red",
  maxSpotColor: "red",
  normalRangeMin: 82,
  normalRangeMax: 180,
});


});
</script>