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
console.log(unique);
  });

}
dropdown();


    function optionChanged(id) {
     
    }