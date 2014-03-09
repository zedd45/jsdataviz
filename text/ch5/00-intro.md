## Chapter 5: Showing Time Lines

The most compelling visualizations often succeed because they tell a story; they extract a narrative from data and reveal that narrative to their users. And as with any narrative, _time_ provides a critical component of such visualizations. If our data consists solely of numbers, a standard bar or line chart can easily show its evolution over time. If our data is not numerical, however, standard charts probably won’t work. This chapter considers several alternatives for time-based visualizations. All are based on some variation of a time line; one linear dimension represents time, and events are places along that dimension based on when they occurred. In all of the examples we’ll consider the same underlying data, a [possible chronology of the plays of William Shakespeare](http://en.wikipedia.org/wiki/Chronology_of_Shakespeare%27s_plays).

We’ll look at three very different approaches for adding time lines to web pages. One option relies on a JavaScript library, and it follows a process similar to many other visualizations in the book. The other two techniques, however, offer a different perspective. In one, we won’t use a visualization library at all. Instead we’ll build a time line with basic JavaScript, HTML, and CSS, and we’ll see how to do that both with and without jQuery. The final example shows the other extreme. It relies on a full featured web component.

* How to use a library to create time lines.
* How to create timelines without a library using only JavaScript, HTML, and CSS.
* How to integrate a time line component in a web page.
