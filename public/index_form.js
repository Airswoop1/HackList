/**
 * Created by airswoop1 on 5/3/14.
 */

$(document).ready(function() {

    var MaxInputs       = 8; //maximum input boxes allowed
    var InputsWrapper   = $("#InputsWrapper"); //Input boxes wrapper ID
    var AddButton       = $("#AddMoreButton"); //Add button ID

    var x = InputsWrapper.length; //initlal text box count
    var FieldCount=1; //to keep track of text box added

    $(AddButton).click(function (e)  //on add input button click
    {
        if(x <= MaxInputs) //max input box allowed
        {
            FieldCount++; //text box added increment
            //add input box
            $(InputsWrapper).append('<div><input type="text" name="apis[]" id="field_'+ FieldCount +'" value="Text '+ FieldCount +'"/><a href="#" class="removeclass">&times;</a></div>');
            x++; //text box increment
        }
        return false;
    });

    $("body").on("click",".removeclass", function(e){ //user click on remove text
        if( x > 1 ) {
            $(this).parent('div').remove(); //remove text box
            x--; //decrement textbox
        }
        return false;
    })

});