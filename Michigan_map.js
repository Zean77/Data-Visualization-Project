d3.csv("Data/Data/Michigan_Covid_Vaccine_Data.csv").then(function(mi_data) {

  //console.log(mi_data);
  mi_data.forEach(function(data) {
    data.county =data["Person's Residence in County"];
    data.preparedness = data["Person's Residence in Preparedness Region"];
    data.jurisdiction = data["Person's Residence in Local Health Department Jurisdiction"];
    data.vaccine= data["Vaccine Type"];
    data.date=(data["Date"]);
    data.total_doses=+data["Number of Doses"];
    data.dose_num=+data["Dose Number"];
    
    console.log(data.date);

});  
   
});

  // Create function for dropdown menu

   var menu=d3.select("#selDataset");
   d3.csv("Data/Data/Michigan_Covid_Vaccine_Data.csv").then(function(mi_data) {

    //console.log(mi_data);
    mi_data.forEach(function(data) {
      data.county =data["Person's Residence in County"];
      
      console.log(data.date);
  
  });  
     
  });
      //console.log(counties);
     
     //menu.append("option").text(name);
    });
    

    function optionChanged(id) {
     
    }