$(function() {
    // Datepicker
    $(".datepicker").datepicker({
        dateFormat: 'dd.mm.yy'
    });    
    
    // Show Notes if Tasks are in storage
    if($('.task').length){
        $('#main').addClass('hasTasks');
    }

    // Toggle Style
    var checkStyle = localStorage.getItem('style');
    if(checkStyle == "v2"){
        $('body').addClass('v2');
    } else{
        $('body').removeClass('v2');
    }

    $('#toggle-styles').click(function(){
        if($('body').hasClass('v2')){
            $('body').removeClass('v2');
            localStorage.setItem('style', '');
        } else{
            $('body').addClass('v2');
            localStorage.setItem('style', 'v2');
        }
    });

    // Toggle Finished Tasks
    var checkStyle = localStorage.getItem('showHidden');
    if(checkStyle == true){
        $('body').addClass('showHidden');
    } else{
        $('body').removeClass('showHidden');
    }

    $('#sort-finished').click(function(){
        if($('body').hasClass('showHidden')){
            $('body').removeClass('showHidden');
            localStorage.setItem('showHidden', false);
        } else{
            $('body').addClass('showHidden');
            localStorage.setItem('showHidden', true);
        }
    });
});