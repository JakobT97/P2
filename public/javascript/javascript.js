/*right click floor*/

let div = document.getElementById("floor");

div.addEventListener(
  "mouseover",
  function (event) {
    document.oncontextmenu = rightClick;
    document.onclick = hideMenu;

    function hideMenu() {
      document.getElementById("floormenu").style.display = "none";
    }

    function rightClick(e) {
      e.preventDefault();

      if (document.getElementById("floormenu").style.display == "block") {
        hideMenu();
      } else {
        var menu = document.getElementById("floormenu");
        menu.style.display = "block";
        menu.style.left = e.pageX + "px";
        menu.style.top = e.pageY + "px";
      }
    }
  },
  false
);

/*Disable rightclick, outside floor */

div.addEventListener(
  "mouseout",
  function (event) {
    document.oncontextmenu = rightClick;

    function rightClick(e) {
      if (document.getElementById("floormenu").style.display == "none") {
        hideMenu();
      }
    }
  },
  false
);

/***************************************************"New Function"*********************************************************/

/*PC1 properties*/

let PC = {
    status: "off",
    ontime: 0,
  };
  
  document.getElementById("PC1").style.filter = "grayscale(100%)";
  
  const contextMenu = document.getElementById("context-menu");
  const item1 = document.getElementById("item-1");
  item1.innerHTML = "status: " + PC.status;
  
  const item2 = document.getElementById("item-2");
  item2.innerHTML = "runtime: " + PC.ontime;
  
  function changeStatus() {
    if (PC.status == "off") {
      PC.status = "on";
      item1.innerHTML = "status: " + PC.status;
      document.getElementById("PC1").style.filter = "grayscale(0%)";
      PContimeInterval = setInterval(PContime, 1000);
      UpdatePower = setInterval(UpdateTotalPower, 1000);
    } else if (PC.status == "on") {
      clearInterval(PContimeInterval);
      clearInterval(UpdatePower);
      PC.status = "off";
      item1.innerHTML = "status: " + PC.status;
      document.getElementById("PC1").style.filter = "grayscale(100%)";
    }
  }
  
  function PContime() {
    PC.ontime++;
    item2.innerHTML = "runtime: " + PC.ontime;
  }
  
  /* Energy consumption section */
  
  //Total power consumption
  TotalPowerConsumption = 0;
  
  //Power consumption of all PCs
  TotalPCConsumption = 0;
  
  //Energy consumption for a PC
  PC_kWs = 0.00038;
  
  function UpdateTotalPower() {
    //Power consumption of all PCs updated every second
    TotalPCConsumption += PC.ontime * PC_kWs;
  
    //Total power consumption updated every second
    TotalPowerConsumption += TotalPCConsumption;
  
    //Console.log for test purposes
    console.log(TotalPowerConsumption);
  }


/* Energy consumption section */
window.onload = function () {

    var dps = []; // dataPoints
    var chart = new CanvasJS.Chart("chartContainer", {
      title :{
        text: "Dynamic Graph"
      },
      data: [{
        type: "line",
        dataPoints: dps
      }]
    });
    
    var xVal = PC.ontime; //runtime
    var yVal = TotalPowerConsumption; //totalPowerConsumption
    var updateInterval = 1000; //milliseconds between updating graph
    var dataLength = 10; // number of dataPoints visible at any point
    
    var updateChart = function (count) {
    
      count = count || 1;
    
      for (var j = 0; j < count; j++) {
        yVal = TotalPowerConsumption; // Math.round(5 + Math.random() *(-5-5));//yVal + PC_kws
        dps.push({
          x: xVal,
          y: yVal
        });
        xVal++;
      }
    
      if (dps.length > dataLength) {
        dps.shift();
      }
    
      chart.render();
    };
    
    updateChart(dataLength);
    setInterval(function(){updateChart()}, updateInterval);
    
    }