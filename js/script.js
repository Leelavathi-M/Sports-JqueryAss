
$(document).ready(function () {
    $(".submitbtn").mouseenter(function () {
        $(".submitbtn").css("background-color", "cyan");
    });
    $(".submitbtn").mouseleave(function () {
        $(".submitbtn").css("background-color", "lightgreen");
    });

    $("#sports").select2();

    $.validator.addMethod("numberValidate", function (value, element) {
        return this.optional(element) || value.length == 10 && value.match(/^\d{10}$/);
    }, "Please specify 10 digit valid number");

    $("#sports").select2().change(function() {
        $(this).valid();
    });

    let form = $("#myForm");
    if (form.length) {
        form.validate({
            ignore: 'input[type=hidden], .select2-input, .select2-focusser',
            // errorClass: 'error',
            // number: true,
            rules: {
                sports: "required",
                teamName: "required",
                teamContact: {
                    required: true,
                    numberValidate: true
                },
                teamLocation:"required",
                "playerName[]" : "required",
                "playerId[]"   : "required",
                "playerAge[]"  : " required"
            },
            messages: {
                sports: "Select your sports",
                teamName:  "Fill your team name",
                teamContact:  "Fill your team contact details",
                teamLocation: "Fill your team location",
                "playerName[]":"fill player name",  
                "playerId[]" : "fill player jersey number",  
                "playerAge[]" : "fill player age"
            },
            highlight: function( element, errorClass, validClass ) {
                if ( element.type === "radio" ) {
                    this.findByName( element.name ).addClass( errorClass ).removeClass( validClass );
                } else {
                    var elem = $(element);
                    if (elem.attr('readonly') == 'readonly') {
                        if (elem.hasClass("input-group-addon")) {
                           $("#" + elem.attr("id")).parent().addClass(errorClass);
                        } else {
                            $( element ).addClass( errorClass ).removeClass( validClass );
                        }
                    } else {
                        if (elem.hasClass("select2-hidden-accessible")) {
                           $("#select2-" + elem.attr("id") + "-container").parent().addClass(errorClass);
                        } else {
                            $( element ).addClass( errorClass ).removeClass( validClass );
                        }
                    }
                }
            },
            unhighlight: function( element, errorClass, validClass ) {
                if ( element.type === "radio" ) {
                    this.findByName( element.name ).removeClass( errorClass ).addClass( validClass );
                } else {
                    var elem = $(element);
                    if (elem.attr('readonly') == 'readonly') {
                        if (elem.hasClass("input-group-addon")) {
                           $("#" + elem.attr("id")).parent().removeClass(errorClass);
                        } else {
                            $( element ).addClass( errorClass ).removeClass( validClass );
                        }
                    } else {
                        if (elem.hasClass("select2-hidden-accessible")) {
                            $("#select2-" + elem.attr("id") + "-container").parent().removeClass(errorClass);
                        } else {
                            $( element ).removeClass( errorClass ).addClass( validClass );
                        }
                    }
                }
            },
            errorPlacement: function(error, element) {
                var elem = $(element);
                if (elem.attr('readonly') == 'readonly') {
                    element = $("#" + elem.attr("id")).parent();
                    error.insertAfter(element);
                } else {
                    if (elem.hasClass("select2-hidden-accessible")) {
                        element = $("#select2-" + elem.attr("id") + "-container").parent().parent().parent();
                        error.insertAfter(element);
                    } else {
                        error.insertAfter(element);
                    }
                }
            }
        });  
    }

    $(document).on('submit', '#myForm', function(e){

        e.preventDefault(); // avoid to execute the actual submit of the form.
    
        var form = $(this);
        var url = form.attr('action');
        
        $.ajax({
               type: "POST",
               url: url,
               data: form.serialize(), // serializes the form's elements.
               success: function(data)
               {
                   alert(data); // show response from the php script.
               }
             });
    
        
    });

    /* form.submit(function (e) {
        e.preventDefault();
        var form = $(this);
      
        $.ajax({
            type: "POST",
            url:'confirm.html',
            data: form.serialize(), 
            success: function()
            {
                alert('success');
            }

        });
    }); */

    removeplayer();
});

function addplayers() {
    $('#clonePlayersDiv').clone().removeClass('d-none').find('input').val('').end().appendTo('#teamplayers');
    removeplayer();
}

function removeplayer() {
    $(".remove-team-player").click(function(e) {
        $(this).closest(".playersdiv").remove();
        e.preventDefault();
    });
}



