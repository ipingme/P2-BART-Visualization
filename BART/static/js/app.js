// function buildMetadata(sample) {

//   // @TODO: Complete the following function that builds the metadata panel

//   // Use `d3.json` to fetch the metadata for a sample
//     d3.json(`/metadata/${sample}`).then((data) => {
//         // Use d3 to select the panel with id of `#sample-metadata`
//         var PANEL = d3.select('#sample-metadata');

//         // Use `.html("") to clear any existing metadata
//         PANEL.html("");
//         // Use `Object.entries` to add each key and value pair to the panel
//         // Hint: Inside the loop, you will need to use d3 to append new
//         // tags for each key-value in the metadata.
//         Object.entries(data).forEach(([key, value]) => {
//           PANEL.append("h6").text(`${key}:${value}`);
//         })
//         // BONUS: Build the Gauge Chart
//         //  buildGauge(data.WFREQ);

//     })
  
// }

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  d3.json(`/samples/${sample}`).then((data) => {
    // @TODO: Build a Bubble Chart using the sample data
    const day  = data.day;
    const hour  = data.hour;
    const station = data.station;
    const sample_values = data.sample_values;
    // // @TODO: Build a Pie Chart
    // let bubbleLayout = {
    //   margin: { t: 0 },
    //   hovermode: "closests",
    //   xaxis: { title: "OTU ID"}
    // }

    // let bubbleData = [
    //   {
    //     x: otu_ids,
    //     y: sample_values,
    //     text: otu_labels,
    //     mode: "markers",
    //     marker: {
    //       size: sample_values,
    //       color: otu_ids,
    //       colorscale: "Earth"
    //     }
    //   }
    // ]

    // Plotly.plot("bubble", bubbleData, bubbleLayout);

    // var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']


    // Plotly.d3.csv('../db/Finalset.csv', (err, rows) => {
      // let barData = [
      //   {
      //     y: sample_values,
      //     x: hour,
      //     name: station,
      //     type: "bar"
      //   }
      // ];

      // // var data = days.map(y => {
      // //   var d = rows.filter(r => r.Day === y)
        
      // //   return {
      // //     type: 'bar',
      // //     name: y,
      // //     x: d.map(r => r.Station),
      // //     y: d.map(r => r.Total)
      // //   }
      // // })
      // let layout = {barmode: 'stack'};

      // Plotly.plot('chart', barData, layout)
    // }) 

    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).

    let pieData = [
      {
        values: sample_values,
        labels: day,
        hovertext: station,
        hoverinfo: "hovertext",
        type: "pie"
      }
    ];


    let pieLayout = {
      margin: {t: 0, l: 0}
    };

    Plotly.plot("pie", pieData, pieLayout);

    let pieData2 = [
      {
        values: sample_values,
        labels: hour,
        hovertext: station,
        hoverinfo: "hovertext",
        type: "pie"
      }
    ];

    let pieLayout2 = {
      margin: {t: 0, l: 0}
    };

    Plotly.plot("pie2", pieData2, pieLayout2);

    let trace = [
    {
      x: hour,
      y: sample_values,
      mode: 'none',
      fill: 'tonexty',
      type: 'scatter'
    }
  ];
    
    // let linedata = [ trace ];

    var linelayout = {
      xaxis: {
        showgrid: false,
        autotick: false,
        ticks: 'outside',
        tick0: 0,
        dtick: 1,
        tickwidth: 2,
        tickcolor: '#000'
      },
      yaxis: {
        showgrid: false
      }
    };
    
    Plotly.plot('area', trace, linelayout);

  })
}

function buildCharts2() {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  d3.json(`/all`).then((data) => {
    // @TODO: Build a Bubble Chart using the sample data
    const day  = data.day;
    const hour  = data.hour;
    const station = data.station;
    const sample_values = data.sample_values;
      // let barData = [
      //   {
      //     y: sample_values,
      //     x: hour,
      //     name: station,
      //     type: "bar"
      //   }
      // ];

      // // let layout = {barmode: 'bar'};

      // Plotly.plot('chart', barData)

      var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']


      // Plotly.d3.csv('../db/Finalset.csv', (err, rows) => {
      
        // const unique = (value, index, self) => {
        //   return self.indexOf(value) === index
        // }
        
        // const days = rows.map(r => r.Day)
        // const uniqueDays = [...new Set(days)]
        
        // console.log(days)
        // console.log(uniqueDays)
      
        var bardata = days.map(y => {
          var d = data.filter(r => r.Day === y)
          
          return {
            type: 'bar',
            name: y,
            x: d.map(r => r.Station),
            y: d.map(r => r.Total)
            // orientation: 'h'
          }
        })

        let layout = {barmode: 'stacked'};
      
        Plotly.newPlot('chart', bardata, layout)
      }) 


}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildCharts2(firstSample);
    // buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  // buildCharts2(newSample);
  // buildMetadata(newSample);
}

// Initialize the dashboard
init();
