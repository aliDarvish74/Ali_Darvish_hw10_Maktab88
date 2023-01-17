$(() => {
  $("#response , #request , #statusContainer").hide();
  $("#submitBtn").attr("disabled", "true");
  $("#typeSelector").on({
    change: function (e) {
      $("#response , #request , #statusContainer").hide();
      if ($(this).val() === "get") {
        $("#response , #statusContainer").fadeIn();
        $("#submitBtn").removeAttr("disabled");
      }
      if ($(this).val() === "post") {
        $("#response , #statusContainer, #request").fadeIn();
        $("#submitBtn").removeAttr("disabled");
      }
      if ($(this).val() === "default") {
        $("#submitBtn").attr("disabled", "true");
      }
    },
  });
  $("#submitBtn").on({
    click: function (e) {
      e.preventDefault();
      $("#status").val("");
      if ($("#urlInput").val() === "") {
        $("#responseBody").val(
          `No URL entered. Cannot send any ${$("#typeSelector").val()} request`
        );
        return;
      }

      if ($("#typeSelector").val() === "get") {
        $.ajax({
          url: $("#urlInput").val(),
          type: "get",
          success: function (res, _stText, xhr) {
            $("#responseBody").val(JSON.stringify(res.data));
            $("#status").val(
              `Plain Text: ${xhr
                .getResponseHeader("content-type")
                .substring(
                  0,
                  xhr.getResponseHeader("content-type").indexOf(";")
                )}, Status: ${xhr.status}`
            );
          },
          error: function (err) {
            console.log(err);
            $("#responseBody").val(err.statusText);
            $("#status").val(
              `Response Type: ${err
                .getResponseHeader("content-type")
                .substring(
                  0,
                  err.getResponseHeader("content-type").indexOf(";")
                )}, Status: ${err.status}`
            );
          },
        });
        return;
      }

      if ($("#typeSelector").val() === "post") {
        $.ajax({
          url: $("#urlInput").val(),
          type: "post",
          data: $("#requestBody").val(),
          contentType: "application/json",
          success: function (res, _stText, xhr) {
            $("#responseBody").val(JSON.stringify(res));
            $("#status").val(
              `Plain Text: ${xhr
                .getResponseHeader("content-type")
                .substring(
                  0,
                  xhr.getResponseHeader("content-type").indexOf(";")
                )}, Status: ${xhr.status}`
            );
          },
          error: function (err) {
            $("#responseBody").val(err.statusText);
            $("#status").val(
              `Response Type: ${err
                .getResponseHeader("content-type")
                .substring(
                  0,
                  err.getResponseHeader("content-type").indexOf(";")
                )}, Status: ${err.status}`
            );
          },
        });
      }
      //     $.ajax({
      //       url: $("#urlInput").val(),
      //       type: $("#typeSelector").val(),
      //       data: $("#requestBody").val(),
      //       contentType: "application/json",
      //       success: function (res, _statusText, header) {
      //         console.log(header);

      //         $("#responseBody").val(JSON.stringify(res.data));
      //         $("#status").val(
      //           `Response Type: ${header
      //             .getResponseHeader("content-type")
      //             .substring(
      //               0,
      //               header.getResponseHeader("content-type").indexOf(";")
      //             )}, Status: ${header.status}`
      //         );
      //       },
      //       error: function (err) {
      //         $("#responseBody").val(err.statusText);
      //         $("#status").val(
      //           `Response Type: ${err.getResponseHeader("content-type")}, Status: ${
      //             err.status
      //           }`
      //         );
      //       },
      //     });
    },
  });
});
