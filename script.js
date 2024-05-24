  $(document).ready(function() {
    $('#datepicker').datepicker();
  
    // Add cursor style on show event
    $('#datepicker').on('show', function(e) {
      $(this).addClass('hand-cursor');  // Add 'hand-cursor' class on show
    });
  
    // Remove cursor style on hide event
    $('#datepicker').on('hide', function(e) {
      $(this).removeClass('hand-cursor'); // Remove 'hand-cursor' class on hide
    });
  });
  

  