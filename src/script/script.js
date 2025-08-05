
//////// chart


am4core.useTheme(am4themes_animated);
am4core.useTheme(am4themes_dataviz);

// Create chart instance
const chart = am4core.create("chartdiv", am4charts.PieChart);

// Add data
chart.data = [{
    "category": "Subject 1",
    "value": 285
}, {
    "category": "Subject 2",
    "value": 188
}, {
    "category": "Subject 3",
    "value": 176
}, {
    "category": "Subject 4",
    "value": 161
}, {
    "category": "Subject 5",
    "value": 65
}];


// Add and configure Series
const pieSeries = chart.series.push(new am4charts.PieSeries());
pieSeries.dataFields.value = "value";
pieSeries.dataFields.category = "category";
pieSeries.labels.template.disabled = true;
pieSeries.ticks.template.disabled = true;

pieSeries.hiddenState.properties.endAngle = -90;


const as = pieSeries.slices.template.states.getKey("active");
as.properties.shiftRadius = 0;


pieSeries.colors.list = [
    am4core.color("#0c2544"), // 1
    am4core.color("#64a89a"), // 2
    am4core.color("#5997e2"), // 3
    am4core.color("#D38635"), // 4
    am4core.color("#b9d3f1") // 5
];

chart.legend = new am4charts.Legend();
chart.legend.position = "bottom";
chart.legend.itemContainers.template.paddingBottom = 5;

chart.legend.valueLabels.template.disabled = true; // disable %
chart.innerRadius = am4core.percent(50);
chart.legend.labels.template.fontFamily = "Archivo";

// hide legend toggle
chart.legend.itemContainers.template.clickable = false;
chart.legend.itemContainers.template.focusable = false;
chart.legend.itemContainers.template.cursorOverStyle = am4core.MouseCurso

const label = pieSeries.createChild(am4core.Label);
label.text = "{values.value.sum}";
label.horizontalCenter = "middle";
label.verticalCenter = "middle";
label.fontSize = 64;
label.fontFamily = "Archivo";
// label.fontWeight = 700;

pieSeries.labels.template.disabled = true;
pieSeries.ticks.template.disabled = true;

chart.cursor = new am4charts.XYCursor();

const marker = chart.legend.markers.template.children.getIndex(0);
marker.cornerRadius(12, 12, 12, 12);

// countup

// How long you want the animation to take, in ms
const animationDuration = 2000;
// Calculate how long each ‘frame’ should last if we want to update the animation 60 times per second
const frameDuration = 1000 / 60;
// Use that to calculate how many frames we need to complete the animation
const totalFrames = Math.round(animationDuration / frameDuration);
// An ease-out function that slows the count as it progresses
const easeOutQuad = t => t * (2 - t);

// The animation function, which takes an Element
const animateCountUp = el => {
    let frame = 0;
    const countTo = parseInt(el.innerHTML, 10);
    // Start the animation running 60 times per second
    const counter = setInterval(() => {
        frame++;
        // Calculate our progress as a value between 0 and 1
        // Pass that value to our easing function to get our
        // progress on a curve
        const progress = easeOutQuad(frame / totalFrames);
        // Use the progress value to calculate the current count
        const currentCount = Math.round(countTo * progress);

        // If the current count has changed, update the element
        if (parseInt(el.innerHTML, 10) !== currentCount) {
            el.innerHTML = currentCount;
        }
        // If we’ve reached our last frame, stop the animation
        if (frame === totalFrames) {
            clearInterval(counter);
        }
    }, frameDuration);
};

// Run the animation on all elements with a class of ‘countup’
const countupEls = document.querySelectorAll('.num');
countupEls.forEach(animateCountUp);


// highlights
const btnContainer = document.querySelectorAll('.btn-tab');
const tabContainer = document.querySelector('.highlight-tab-container');
const highlightContent = document.querySelectorAll('.highlight-group');

tabContainer.addEventListener('click', function (e) {
    const clicked = e.target.closest('.btn-tab');

    if (!clicked) return; // prevent console error between buttons

    // remove active classes
    btnContainer.forEach(t => t.classList.remove('btn-active'));
    highlightContent.forEach(c => c.classList.remove('highlight-group-active'));

    // activate tab
    clicked.classList.add('btn-active');

    // activate content area
    document.querySelector(`.highlight-group-${clicked.dataset.tab}`).classList.add('highlight-group-active');

});

