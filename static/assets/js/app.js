$(document).ready(function() {

    $("#traffic-slider").hide();
    $("#crowd-slider").hide();
    $("#greenery-slider").hide();
    $("#danger-message").hide();
    $("#warning-message").hide();
    // $("#map_output").hide();
    $("#feedback").hide();

    function ratingEnable() {


        $('#crowd-feed').barrating('show', {
            theme: 'bars-movie'
        });

        $('#crowd-feed').barrating('set', '4');

        $('#greenery-feed').barrating('show', {
            theme: 'bars-movie'
        });

        $('#greenery-feed').barrating('set', '4');

        $('#noise-feed').barrating('show', {
            theme: 'bars-movie'
        });

        $('#safety-feed').barrating('show', {
            theme: 'bars-movie'
        });
        $('#safety-feed').barrating('set', '4');

        $('#noise-feed').barrating('set', '4');
        $('#crowd-feed').barrating('show', {
            theme: 'bars-movie'
        });

        $('#crowd-feed').barrating('set', '4');
        $('#overall-feed').barrating('show', {
            theme: 'bars-movie'
        });

        $('#overall-feed').barrating('set', '4');

        var currentRating = $('#example-fontawesome-o').data('current-rating');

        $('.stars-example-fontawesome-o .current-rating')
            .find('span')
            .html(currentRating);

        $('.stars-example-fontawesome-o .clear-rating').on('click', function(event) {
            event.preventDefault();

            $('#example-fontawesome-o')
                .barrating('clear');
        });

        $('#example-fontawesome-o').barrating({
            theme: 'fontawesome-stars-o',
            showSelectedRating: false,
            initialRating: currentRating,
            onSelect: function(value, text) {
                if (!value) {
                    $('#example-fontawesome-o')
                        .barrating('clear');
                } else {
                    $('.stars-example-fontawesome-o .current-rating')
                        .addClass('hidden');

                    $('.stars-example-fontawesome-o .your-rating')
                        .removeClass('hidden')
                        .find('span')
                        .html(value);
                }
            },
            onClear: function(value, text) {
                $('.stars-example-fontawesome-o')
                    .find('.current-rating')
                    .removeClass('hidden')
                    .end()
                    .find('.your-rating')
                    .addClass('hidden');
            }
        });
    }

    function ratingDisable() {
        $('select').barrating('destroy');
    }

    $('.rating-enable').click(function(event) {
        event.preventDefault();

        ratingEnable();

        $(this).addClass('deactivated');
        $('.rating-disable').removeClass('deactivated');
    });

    $('.rating-disable').click(function(event) {
        event.preventDefault();

        ratingDisable();

        $(this).addClass('deactivated');
        $('.rating-enable').removeClass('deactivated');
    });

    ratingEnable();
    $("#traffic").click(function() {

        if ($(this).is(":checked")) {
            $("#traffic-slider").show();
        } else {
            $("#traffic-slider").hide();
        }

    });

    $("#crowd").click(function() {

        if ($(this).is(":checked")) {
            $("#crowd-slider").show();
        } else {
            $("#crowd-slider").hide();
        }

    });


    $("#greenery").click(function() {

        if ($(this).is(":checked")) {
            $("#greenery-slider").show();

        } else {
            $("#greenery-slider").hide();
        }

    });

    $("#submit").click(function() {
        $("#map_output").html();
        on();
        let crowdPriority = $("#crowd-priority").val();
        let trafficPriority = $("#traffic-priority").val();

        let greeneryPriority = $("#greenery-priority").val();
        let distance = $("#dist").val();
        if (!$("#traffic").is(":checked")) {
            trafficPriority = 0;
        }

        if (!$("#crowd").is(":checked")) {
            crowdPriority = 0;
        }
        if (!$("#greenery").is(":checked")) {
            greeneryPriority = 0;
        }

        // alert(greeneryPriority);
        console.log($('#traffic').is(":checked"));

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function(position) {
                lat = position.coords.latitude;
                long = position.coords.longitude;
                $.ajax({
                    data: {
                        distance: distance,
                        lati: lat,
                        longi: long,
                        Crowd: crowdPriority,
                        Traffic: trafficPriority,
                        Greenery: greeneryPriority,
                    },
                    type: "POST",
                    url: "/MapData"
                })


                .done(function(data) {
                    if (data.error) {
                        alert("Error");
                    } else {
                        // $("#submit").attr("data-dismiss", "modal");

                        off();
                        if (data.danger) {
                            $("#danger-message").show();
                            $('#danger-message').text(data.danger);
                        }

                        if (data.warning) {
                            $("#warning-message").show();
                            $('#warning-message').text(data.warning);
                        }
                        // alert("Map  Generated");
                        let src = data.map_name;
                        src = '/static/' + src;
                        console.log(src);
                        $("#map_output").html('<iframe src="' + src + '" height = "1000" width = "1000" ></iframe > ');
                        $("#feedback").show();
                    }
                });
            });
        } else {
            console.log("Browser doesn't support geolocation!");
        }


        //  event.preventDefault();

    });


    $("#FeedBack").click(function() {


        $.ajax({
            data: {
                OverallFeed: $("#overall-feed").val(),
                Safety: $("#safety-feed").val(),
                Noise: $("#noise-feed").val(),
                Greenery: $("#greenery-feed").val(),
                Crowd: $("#crowd-feed").val()

            },
            type: "POST",
            url: "/FeedBack"
        })

        .done(function(data) {
            if (data.error) {
                alert("Error");
            } else {
                // $("#pick-modal").modal("hide");

                // alert("Map  Generated");
                // $("#map_output").show();
                // $("#feedback").show();
            }
        });

    });

});

function on() {
    document.getElementById("overlay").style.display = "block";
}

function off() {
    document.getElementById("overlay").style.display = "none";
}