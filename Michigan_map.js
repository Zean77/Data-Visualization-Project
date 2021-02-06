d3.csv("Data/Data/Michigan_Covid_Vaccine_Data.csv").then(function(mi_data) {
 
  mi_data.forEach(function(data) {
    data.year_range = data["Year Range"];
    data.preparedness = data["Persons Residence in Preparedness Region"];
    data.jurisdiction = data["Persons Residence in Local Health Department Jurisdiction"];
    data.county =data["Persons Residence in County"];
    data.vaccine = data["Vaccine Type"];
    data.facility = data["Facility Type"];
    data.dose = data["Dose Number"];
    data.date=(data["Date"]);
    data.total_doses=+data["Number of Doses"];
    //console.log("County:",data.county);


});  
var filteredData = mi_data.filter(function(d) 
{ 

        if( d["Persons Residence in County"] == "Delta") 
        { 
            return d;
        } 

    });
    //console.log(filteredData);
    var vaccine_array = [];
    var moderna_num = 0;
    var pfizer_num = 0;
    
    filteredData.forEach(function(data){
      data.number = +data["Number of Doses"];

      if(data['Vaccine Type'] == "Moderna" ) {
        return moderna_num += data.number;}
      else {return pfizer_num += data.number; }

    });
    vaccine_array.push("Moderna", moderna_num, "Pfizer", pfizer_num);
    console.log(vaccine_array);
  
});

function dropdown () {
  var menu=d3.select("#selDataset");
  d3.csv("Data/Data/Michigan_Covid_Vaccine_Data.csv").then(function(importedData) {
    var counties = [];
    importedData.forEach(function(d) {
      d.county =d["Persons Residence in County"];
   counties.push(d.county);
    });
    let unique = counties.filter((item, i, ar) => ar.indexOf(item) === i);
//console.log(unique);
  unique.forEach(function(name){
  menu.append("option").text(name);
});
  });

}
dropdown();


    function optionChanged(county) {
     
    }