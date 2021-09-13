// Create the buildChart function.
function buildCharts(sample) {
  // Use d3.json to load the samples.json file 
  d3.json("samples.json").then((data) => {
    console.log(data);

    // Create a variable that holds the samples array. 
    var samples = data.samples;
    // Create a variable that filters the samples for the object with the desired sample number.
    var samplesArray = samples.filter(sampleObj => sampleObj.id === sample);
    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var metadata = data.metadata;
    var metadataArray = metadata.filter(sampleObj => sampleObj.id === sample);
    // Create a variable that holds the first sample in the array.
    var sampleResult = samplesArray[0];

    // 2. Create a variable that holds the first sample in the metadata array.
    var metadataResult = metadataArray[0];

    // Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otu_ids = sampleResult.otu_ids;
    var otu_labels = sampleResult.otu_labels;
    var sample_values = sampleResult.sample_values;

    // 3. Create a variable that holds the washing frequency.
    var level = parseFloat(metadataResult.wfreq);
    // Create the yticks for the bar chart.
    var yticks = otu_ids.slice(0,10).map(otuId => 'OTU ' + otuId).reverse();

    // Use Plotly to plot the bar data and layout.
    // Create the trace for the bar chart. 
    var barData = [{
      x: sample_values.slice(0,10).reverse(),
      y: yticks,
      text: otu_labels.slice(0,10).reverse(),
      type: "bar",
      orientation: "h"
    }];
    // Create the layout for the bar chart. 
    var barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      margin: {t: 30, l:150}
    };
    // Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout);
    
    // Use Plotly to plot the bubble data and layout.
    // Create the trace for the bubble chart.
    var bubbleData = [{
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker: {
        size: sample_values,
        color: otu_ids,
        colorscale: "Earth"
      }
    }];

    // Create the layout for the bubble chart.
    var bubbleLayout = {
      title: "Bacteria Cultures Per Sample",
      hovermode: "closest",
      xaxis: {title: "OTU ID"},
      margin: {t: 30}
    };

    // Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);
   
    
    // 4. Create the trace for the gauge chart.
    var gaugeData = [{
      domain: { x:[0,1], y:[0,1]},
      value: level,
      title: {text: "<h3>Belly Button Washing Frequence<small>Scrubs per Week</small></h3>"},
      type: "indicator",
      mode: "gauge+number",
      guage:{
        bar: { color: "dimgray" },
        axis: { range: [null, 10], tickvals:[0,2,4,6,8,10]},
        steps: [
          { range: [0, 2], color: "lightcoral" },
          { range: [2, 4], color: "sandybrown" },
          { range: [4, 6], color: "lemonchiffon" },
          { range: [6, 8], color: "lightgreen" },
          { range: [8, 10], color: "darkseagreen" }
        ],
      }
    }];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { width: 300, height: 450, margin: {t: 30, b: 0}
     
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", gaugeData, gaugeLayout);
  });
}
