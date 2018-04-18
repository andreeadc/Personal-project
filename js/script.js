$(document).ready(function() {
  
var scrollLink = $('.scroll');
  
    // Smooth scrolling
    scrollLink.click(function(e) {
        e.preventDefault();
        $('body,html').animate({
          scrollTop: $(this.hash).offset().top
        }, 1000);
    });
  
    // Active link switching

    $(window).scroll(function() {
    var scrollbarLocation = $(this).scrollTop();
    
    scrollLink.each(function() {
      
      var sectionOffset = $(this.hash).offset().top - 20;
      
      if ( sectionOffset <= scrollbarLocation ) {
        $(this).css('color','white');
        $(this).siblings().css('color','#cc6666');
      }
    })
    
    })

    
    $(document).ready(function() {
        // Transition effect for navbar 
        $(window).scroll(function() {
          // checks if window is scrolled more than 500px, adds/removes scrolled class
          if($(this).scrollTop() > 500) { 
              $('#navbar').addClass('scrolled');
          } else {
              $('#navbar').removeClass('scrolled');
          }
        });
    });


})