
function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  d3.json(`/samples/${sample}`).then((data) => {
    // @TODO: Build a Pie Chart using the sample data
    const day  = data.day;
    const hour  = data.hour;
    const station = data.station;
    const sample_values = data.sample_values;
    // // @TODO: Build a Pie Chart
    

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

    

  })
}
function buildCharts2() {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  d3.json(`/all`).then((data) => {

    const day  = data.day;
    const hour  = data.hour;
    const station = data.station;
    const sample_values = data.sample_values;


      var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

      
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
      
        Plotly.newPlot('chart', bardata, layout);

        
      // var hours = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
      var stations = [
        "12TH",
        "16TH",
        "19TH",
        "24TH",
        "ASHB",
        "BALB",
        "BAYF",
        "CAST",
        "CIVC",
        "COLM",
        "COLS",
        "CONC",
        "DALY",
        "DBRK",
        "DELN",
        "DUBL",
        "EMBR",
        "FRMT",
        "FTVL",
        "GLEN",
        "HAYW",
        "LAFY",
        "LAKE",
        "MCAR",
        "MLBR",
        "MONT",
        "NBRK",
        "NCON",
        "OAKL",
        "ORIN",
        "PHIL",
        "PITT",
        "PLZA",
        "POWL",
        "RICH",
        "ROCK",
        "SANL",
        "SBRN",
        "SFIA",
        "SHAY",
        "SSAN",
        "UCTY",
        "WCRK",
        "WDUB",
        "WOAK"
      ];

      var linedata = stations.map(y => {
        var d2 = data.filter(r => r.Station === y)
        
        return {
          type: 'scatter',
          fill: 'tonexty',
          mode: 'none',
          name: y,
          x: d2.map(r => r.Hour),
          y: d2.map(r => r.Total)
          // orientation: 'h'
        }
      })
      // let trace = [
      //   {
      //     x: hour,
      //     y: sample_values,
      //     mode: 'none',
      //     fill: 'tonexty',
      //     type: 'scatter'
      //   }
      // ];
        
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
        
        Plotly.plot('area', linedata, linelayout);

      }) 


}

// function buildCharts3() {

//   // @TODO: Use `d3.json` to fetch the sample data for the plots
//   d3.json(`/all`).then((data) => {
//     // @TODO: Build a Bubble Chart using the sample data
//     const day  = data.day;
//     const hour  = data.hour;
//     const station = data.station;
//     const sample_values = data.sample_values;


//       var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      
//         var bardata = days.map(y => {
//           var d = data.filter(r => r.Day === y)
          
//           return {
//             type: 'bar',
//             name: y,
//             x: d.map(r => r.Station),
//             y: d.map(r => r.Total)
//           }
//         })

//         let layout = {barmode: 'stacked'};
      
//         Plotly.newPlot('chart', bardata, layout)
//       }) 


// }

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
    buildCharts2();
    // buildCharts3();
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
