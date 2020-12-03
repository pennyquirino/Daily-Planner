$(document).ready(function() {
  
    const test = false;
  
    // get times from moment
    const now = moment().format('MMMM Do YYYY');
  
    let nowHour24 = moment().format('H');
    let nowHour12 = moment().format('h');
  
    // set times for testing after hours
    if (test) {
      nowHour24 = 13;
      nowHour12 = 1;
    }
  
    let $dateHeading = $('#navbar-subtitle');
    $dateHeading.text(now);
    
    // use Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from 
    //<a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>

    // save icon for planner
    const saveIcon = "images/save.svg"; 
  
    // Get stored todos from localStorage
    // Parse the JSON string to an object
    let storedPlans = JSON.parse(localStorage.getItem("storedPlans"));
  
    if (test) { console.log(storedPlans); }
  
    // If plans were pulled from localStorage, update the plan array to it
    if (storedPlans !== null) {
      planTextArr = storedPlans;
    } else {
      // this should only occur on first time the app is loaded in the browser
      // default lunch at 12pm
      planTextArr = new Array(9);
      planTextArr[4] = "Lunch";
    }
  
    if (test) { console.log("full array of plned text",planTextArr); }
  
    // set variable for planner element
    let $plannerDiv = $('#plannerContainer');
    // clear existing 
    $plannerDiv.empty();
  
    if (test) { console.log("current time",nowHour12); }
  
  
    // build calendar by row for hours 9-5
    for (let hour = 9; hour <= 17; hour++) {
      // index for array use offset from hour
      let index = hour - 9;
      
      // build rows for time slots
      let $rowDiv = $('<div>');
      $rowDiv.addClass('row');
      $rowDiv.addClass('plannerRow');
      $rowDiv.attr('hour-index',hour);
    
      // time section of planner
      let $col2TimeDiv = $('<div>');
      $col2TimeDiv.addClass('col-md-2');
    
      // has time in time section of planner
      const $timeBoxSpn = $('<span>');
  
      $timeBoxSpn.attr('class','timeBox');
      
      // format hours
      let displayHour = 0;
      let ampm = "";
      if (hour > 12) { 
        displayHour = hour - 12;
        ampm = "pm";
      } else {
        displayHour = hour;
        ampm = "am";
      }
      
      //timeBox with time
      $timeBoxSpn.text(`${displayHour} ${ampm}`);
  
      // insert into col into timebox
      $rowDiv.append($col2TimeDiv);
      $col2TimeDiv.append($timeBoxSpn);
  
      // START building input portion of row
     
      let $dailyPlanSpn = $('<input>');
  
      $dailyPlanSpn.attr('id',`input-${index}`);
      $dailyPlanSpn.attr('hour-index',index);
      $dailyPlanSpn.attr('type','text');
      $dailyPlanSpn.attr('class','dailyPlan');
  
      // access index from data array for hour 
      $dailyPlanSpn.val( planTextArr[index] );
      
      
      let $col9IptDiv = $('<div>');
      $col9IptDiv.addClass('col-md-9');
  
      // add col width and row component to row
      $rowDiv.append($col9IptDiv);
      $col9IptDiv.append($dailyPlanSpn);
     
  
      // save portion of row
      let $col1SaveDiv = $('<div>');
      $col1SaveDiv.addClass('col-md-1');
  
      let $saveBtn = $('<i>');
      $saveBtn.attr('id',`saveid-${index}`);
      $saveBtn.attr('save-id',index);
      $saveBtn.attr('class',"far fa-save saveIcon");
      
      //col width and row component to row
      $rowDiv.append($col1SaveDiv);
      $col1SaveDiv.append($saveBtn);
      
      // row color based on time
      updateRowColor($rowDiv, hour);
      
     
      $plannerDiv.append($rowDiv);
    };
  
    // function to update row color depending on past, present, and future
    function updateRowColor ($hourRow,hour) { 
  
      if (test) { console.log("rowColor ",nowHour24, hour); }
  
      if ( hour < nowHour24) {
        // less than is past
        if (test) { console.log("lessThan"); }
        $hourRow.css("background-color","#B2607A")
        // greater than is future
      } else if ( hour > nowHour24) {
        if (test) { console.log("greaterthan"); }
        $hourRow.css("background-color","#FCFABF")
      } else {
        //   equal is the present hour user is in when looking at planner
        if (test) { console.log("eqaul"); }
        $hourRow.css("background-color","#E1F8FF")
      }
    };
  
    // save to local storage
 
    $(document).on('click','i', function(event) {
      event.preventDefault();  
  
      if (test) { console.log('click pta before '+ planTextArr); }
  
      let $index = $(this).attr('save-id');
  
      let inputId = '#input-'+$index;
      let $value = $(inputId).val();
  
      planTextArr[$index] = $value;
  
  
      if (test) { console.log('value ', $value); }
      if (test) { console.log('index ', $index); }
      if (test) { console.log('click pta after '+ planTextArr); }
  
      // stop shadow pulse once clicked
      $(`#saveid-${$index}`).removeClass('shadowPulse');
      localStorage.setItem("storedPlans", JSON.stringify(planTextArr));
    });  
    
    
    $(document).on('change','input', function(event) {
      event.preventDefault();  
      if (test) { console.log('onChange'); }
      if (test) { console.log('id', $(this).attr('hour-index')); }
  
      
  
      let i = $(this).attr('hour-index');
  
      // cool shadow pulse to remind user to save their added details to the planner
      $(`#saveid-${i}`).addClass('shadowPulse');
    });
  });