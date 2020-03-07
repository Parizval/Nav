$(function () {
    let dist = 0;
    console.log(123);

    $("submit-for").click(function () {

        dist = $("#dist-for").val();
        console.log(123);
        if (dist > 0) {
            $.ajax({
                data: {
                    distance: dist,
                },
                type: "POST",
                url: "/future"
            })
                .done((data) => {
                    if (data.error) {
                        alert("Error");
                    } else {

                    }
                });
        }
    });

});