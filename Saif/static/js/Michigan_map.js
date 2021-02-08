function buildPlot(County_input){
  d3.json("static/data/Michigan_Data.json").then(function(mi_data) {
  //console.log(mi_data['county']);
  var Data = [];
 var  Data1 = mi_data.rows;
// console.log(mi_data.rows[0][4]);
   for (var i = 0; i <Data1.length; i++) {
    var County=(mi_data.rows[i][4]);
    
    var Type =(mi_data.rows[i][5]);
    var facility=(mi_data.rows[i][6]);
    var dose_num=(mi_data.rows[i][7]);
    var vacc_num=(mi_data.rows[i][12]);
    Data.push({"County":County });
   }
 // console.log(Data);
    // mi_data.forEach(function(data) {
    //   data.year_range = data["Year Range"];
    //   data.preparedness = data["Persons Residence in Preparedness Region"];
    //   data.jurisdiction = data["Persons Residence in Local Health Department Jurisdiction"];
    //   data.county =data["Persons Residence in County"];
    //   data.vaccine = data["Vaccine Type"];
    //   data.facility = data["Facility Type"];
    //   data.dose = data["Dose Number"];
    //   data.date=(data["Date"]);
    //   data.total_doses=+data["Number of Doses"];
    //   //console.log("County:",data.county);
  
  
  // });  
  //console.log(mi_data.county);
  var filteredData = Data1.filter(function(d) 
{ 

        if( d[4] == County_input )
        { 
            return d;
        } 

    });
    
      console.log(filteredData);
      var vaccine_array = [];
      var moderna_num = 0;
      var pfizer_num = 0;
      var vaccine_total = 0;
      
      filteredData.forEach(function(data){
        data.number = +data[12];
        vaccine_total += data.number;
        if(data[5] == "Moderna" ) {
          return moderna_num += data.number;}
        else {return pfizer_num += data.number; }
  
      });
      vaccine_array.push( moderna_num, pfizer_num);
      console.log(vaccine_array);
      console.log(vaccine_total);
      vaccine_label = ["Moderna", "Pfizer"];
    
      //Make Pie chart
      var pie_data = [{
        values: vaccine_array,
        labels: vaccine_label,
        type: 'pie',
        marker: {
          colors: ['#85A9B7','#043053' ]
        },
      }];
  
      var pie_layout = {
        height: 400,
        width: 400,
        title: "Vaccine Type",
        plot_bgcolor:"black",
        paper_bgcolor:"#EEF7F4"
      };
      Plotly.newPlot('pie', pie_data, pie_layout);
  // Get each health facility
  var facilities = [];
  filteredData.forEach(function(d) {
  facilities.push(d[6]);
  });
  let unique_facility= facilities.filter((item, i, ar) => ar.indexOf(item) === i);
  // console.log(unique_facility);
  
  var facility_array=[];
  
  
  for (var i = 0; i < unique_facility.length; i++) {
    
    var filteredFacility= filteredData.filter(function(d) 
  { 
  
          if( d[6] == unique_facility[i]) 
          { 
              return d;
          } 
  
      });
      var Dates = [];
      var Doses =[]
      filteredFacility.forEach(function(data) {
        data.date = new Date(data[11]);
        Dates.push(data.date);
        Doses.push(data[12])
        
  });
  facility_array.push({Name:unique_facility[i], Date:Dates, Dose_Num:Doses});
  
  }
  //console.log(facility_array);
  var line_data = [];
  for (var i = 0; i < facility_array.length; i++) {
    trace = {
      x: facility_array[i].Date,
      y: facility_array[i].Dose_Num,
      type:'bar',
      name: facility_array[i].Name
    };
    line_data.push(trace);
  }
  //console.log(line_data);
  var line_layout = {
    title:'Doses Given Each Day',
    paper_bgcolor:"#EEF7F4"
  };
  Plotly.newPlot('line', line_data, line_layout);
  // Build Bar Chart
  var dose1 = 0;
  var dose2 = 0;
  var dose_index = [];
  filteredData.forEach(function(data){
    data.number = +data[12];
    
    if(data[7] == "First Dose" ) {
      return dose1 += data.number;}
    else {return dose2 += data.number; }
  
  });
  dose_index.push( dose1, dose2);
  console.log(dose_index);
  //var dose_label = ["First Dose", "Second Dose"];
  
  //Make Bar chart
  const barchart = c3.generate({
    bindto: '#bar',
    data: {
      columns: [
        ["First Dose", dose1],
        ['Second Dose', dose2],
    
      ],
      type: 'bar',
      colors: {
        "First Dose": '#043053',
        "Second Dose": '#85A9B7'
        
      },
    },
    title:{
      text: "Doses Administered"
    },
    bar: {
      width: {
        ratio: 0.5
      }
    }
  });
  // Select meta-data from index
  var Info = d3.select("#sample-metadata");
  //clear form
  Info.html("")
  Info.append("p").text("Total Doses to Date: " +vaccine_total);
  });
  }
  function dropdown () {
    var menu = d3.select("#selDataset");
    d3.json("static/data/Michigan_Data.json").then(function(importedData) {
      var counties = [];
      for (var i = 0; i <importedData.rows.length; i++) {
        var County=(importedData.rows[i][4]);
        counties.push(County);
        
       }
      let unique = counties.filter((item, i, ar) => ar.indexOf(item) === i);
  //console.log(unique);
    unique.forEach(function(name){
    menu.append("option").text(name);
  });
  buildPlot(unique[0]);
    });
  
  }
  dropdown();
  
  
      function optionChanged(County_input) {
        buildPlot(County_input);
       
      }
 