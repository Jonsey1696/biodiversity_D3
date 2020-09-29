d3.json('../static/Resources/samples.json').then((data) => {
    
    // add all patients the the dropdown option
    var names= data.names;
    d3.select('#selDataset').selectAll('option').data(names).enter().append('option').text(function(data){
        return data;
    });

});
function optionChanged(value) {
    d3.json('../static/Resources/samples.json').then((data) => {

   
        var samp_val=data.samples;
        d3.selectAll('p').remove();

        var otuIDstring = [];
        var sampleValues = [];
        var otuLabels=[];
        var otuIds=[];

        samp_val.forEach(person => {
            if (person.id === value){
                sampleValues= person.sample_values;
                otuIds=person.otu_ids;
                otuIds.map(otu => {
                    otuIDstring.push(`OTU ${otu}`);
                });
                otuLabels=person.otu_labels;
            }
        })
        weekly=[]
        var Metadata=data.metadata;
        Metadata.forEach(person => {
            if (person.id == value){
                var demographics=Object.entries(person);
                d3.select('#sample-metadata').selectAll('p').data(demographics).enter().append('p').text(d=>{
                    return `${d[0]}: ${d[1]}`;
                })
                wash=demographics[6][1]
                
                
            }
        })
        console.log(wash)
        var trace3 ={
            domain: { x: [0, 1], y: [0, 1] },
		    value: wash,
		    type: "indicator",
		    mode: "gauge+number"
        };
        var layout3={};
        var data3=[trace3];
        Plotly.newPlot('gauge', data3, layout3);



        var trace1={
            type:'bar',
            x:sampleValues.slice(0,10).reverse(),
            y:otuIDstring.slice(0,10).reverse(),
            text: otuLabels.slice(0,10).reverse(),
            orientation: 'h'
        }

        var data=[trace1];

        var layout={};
        Plotly.newPlot('bar', data, layout)

        var trace2={
            x:otuIds,
            y:sampleValues,
            text: otuLabels,
            mode: 'markers',
            marker: {
                size: sampleValues,
                color: otuIds,
            }

        }
        var data2=[trace2];
        var layout2={
            xaxis:{
                title:'OTU IDs'
            },
            showlegend:false
        };

        Plotly.newPlot('bubble', data2, layout2);
    
    


    })    
         

};





        





