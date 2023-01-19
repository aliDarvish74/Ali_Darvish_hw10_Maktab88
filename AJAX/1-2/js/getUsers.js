let userData = [];
if (userData.length === 0) {
  for (let i = 1; i < 3; i++) {
    $.ajax({
      url: `https://reqres.in/api/users?page=${i}`,
      type: "get",
      async: false,
      success: function (response) {
        for (const user of response.data) {
          userData.push(user);
        }
      },
    });
  }
}
