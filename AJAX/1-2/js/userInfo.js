const generateUserInformation = (
  { id, first_name, last_name, email, avatar },
  edit = false,
  create = false
) => {
  const obj = { id, first_name, last_name, email };
  return `
        <div class="col-md-3">
          <div class="container p-3 border-end border-warning rounded-4">
            <div
              style="
                background: url(${!create ? avatar : "./resources/blank.png"});
                background-position: center;
                background-repeat: no-repeat;
                background-size: cover;
                padding-top: 100%;
              "
              class="rounded-3 shadow"
            ></div>
          </div>
        </div>
        <div class="col-md-9">
          <div class="container">
            <ul class="list-group">
            ${Object.entries(obj)
              .map(([key, value]) => {
                return `
              <li class="list-group-item py-3 bg-dark">
                <label class="w-100" for="${key}"
                  ><span class="d-inline-block text-warning ps-4" style="width: 20%"
                    >${key.split("_").join(" ")} :</span
                  >
                  <input
                    type="text"
                    id="${key}"
                    class="w-75 rounded py-1 px-2"
                    placeholder="${key.split("_").join(" ")}"
                    ${
                      !create
                        ? `value ="${value}"
                    ${!edit ? "disabled" : ""}`
                        : ""
                    }
                    
                  />
                </label>
              </li>
                `;
              })
              .join("")}
              
            </ul>
          </div>
        </div>
        <div class="row align-items-center justify-content-center mt-4">
        ${
          !create
            ? !edit
              ? `<div class="col-2">
        <button onclick="renderUpdate(${id})" class="btn btn-primary w-100">Update</button>
      </div>
      <div class="col-2">
        <button onclick="deleteUser(${id})" class="btn btn-danger w-100">Delete</button>
      </div>
      <div class="col-2">
        <button onclick="backToHome()" class="btn btn-outline-info w-100">Back</button>
      </div>`
              : `<div class="col-2">
      <button onclick="updateUser(${id})" class="btn btn-success w-100">Save</button>
    </div>
    <div class="col-2">
      <button onclick="readUserData(${id})" class="btn btn-outline-warning w-100">Cancel</button>
    </div>`
            : `
    <div class="col-2">
      <button onclick="createUser()" class="btn btn-success w-100">Create</button>
    </div>
    <div class="col-2">
      <button onclick="backToHome()" class="btn btn-outline-warning w-100">Cancel</button>
    </div>
    `
        }
          
        </div>
        <p class="w-75 mx-auto p-3 text-center text-warning rounded-4 mt-3 fs-5 " id="errorMsg"></p>
  `;
};

const readUserData = (id) => {
  const targetUser = userData.find((user) => user.id === Number(id));
  $("#paginationContainer , #usersList").fadeOut();
  $("#userInfo").html(generateUserInformation(targetUser)).fadeIn();
};

const backToHome = () => {
  $("#userInfo").html("").fadeOut();
  $("#paginationContainer , #usersList").fadeIn();
};

const deleteUser = (id) => {
  userData = userData.filter((user) => user.id !== id);
  renderUsersList(0, userData);
  renderPagination(userData);
  backToHome();
};

const renderUpdate = (id) => {
  const targetUser = userData.find((user) => user.id === Number(id));
  $("#userInfo").html(generateUserInformation(targetUser, true)).fadeIn();
  $("#userInfo input").eq(0).attr("disabled", "true");
};

const emailFormat = /^\w+\.*\w*@\w{2,}\.\w{2,}$/gm;
const nameFormat = /^([A-Za-z])+$/gm;

const updateUser = (id) => {
  let message = "";
  for (const input of $("#userInfo input")) {
    if ($(input).val() === "") {
      $(input).css({
        border: "2px solid red",
      });
      setTimeout(() => {
        $(input).css({
          border: "2px solid black",
        });
      }, 1000);
      message += input.id.split("_").join(" ") + ", ";
    }
  }
  if (message) {
    $("#errorMsg").text(
      `All inputs must be filled! Empty field(s): ${message}`
    );
    setTimeout(() => {
      $("#errorMsg").text("");
    }, 3000);
    return;
  }

  if (!emailFormat.test($("input#email").val())) {
    $("input#email").css({
      border: "2px solid red",
    });
    setTimeout(() => {
      $("input#email").css({
        border: "2px solid black",
      });
    }, 1000);
    $("#errorMsg").text("You must enter a valid email!");
    setTimeout(() => {
      $("#errorMsg").text("");
    }, 3000);
    return;
  }

  let updatedUser = {};
  for (const input of $("#userInfo input")) {
    updatedUser[input.id] = $(input).val();
  }
  updatedUser.id = Number(updatedUser.id);
  userData = userData.map((user) => {
    if (user.id === id) {
      return { ...user, ...updatedUser };
    }
    return user;
  });
  renderUsersList(0, userData);
  renderPagination(userData);
  backToHome();
};

const renderCreateUser = () => {
  $("#paginationContainer , #usersList").fadeOut();
  $("#userInfo")
    .html(generateUserInformation(userData[0], true, true))
    .fadeIn();
  document.querySelector("input#id").type = "number";
};

const createUser = () => {
  let message = "";
  for (const input of $("#userInfo input")) {
    if ($(input).val() === "") {
      $(input).css({
        border: "2px solid red",
      });
      setTimeout(() => {
        $(input).css({
          border: "2px solid black",
        });
      }, 1000);
      message += input.id.split("_").join(" ") + ", ";
    }
  }
  if (message) {
    $("#errorMsg").text(
      `All inputs must be filled! Empty field(s): ${message}`
    );
    setTimeout(() => {
      $("#errorMsg").text("");
    }, 3000);
    return;
  }

  if (
    Number(
      $("input#id").val() < 1 || !Number.isInteger(Number($("input#id").val()))
    )
  ) {
    $("input#id").css({
      border: "2px solid red",
    });
    setTimeout(() => {
      $("input#id").css({
        border: "2px solid black",
      });
    }, 1000);
    $("#errorMsg").text("You must enter a natural number for id!");
    setTimeout(() => {
      $("#errorMsg").text("");
    }, 3000);
    return;
  }

  if (!!userData.find((item) => item.id === Number($("input#id").val()))) {
    $("input#id").css({
      border: "2px solid red",
    });
    setTimeout(() => {
      $("input#id").css({
        border: "2px solid black",
      });
    }, 1000);
    $("#errorMsg").text("Duplicate Id found please enter a unique ID!");
    setTimeout(() => {
      $("#errorMsg").text("");
    }, 3000);
    return;
  }

  if (!emailFormat.test($("input#email").val())) {
    $("input#email").css({
      border: "2px solid red",
    });
    setTimeout(() => {
      $("input#email").css({
        border: "2px solid black",
      });
    }, 1000);
    $("#errorMsg").text("You must enter a valid email!");
    setTimeout(() => {
      $("#errorMsg").text("");
    }, 3000);
    return;
  }

  let createdUser = {};
  createdUser.avatar = "./resources/blank.png";
  for (const input of $("#userInfo input")) {
    createdUser[input.id] = $(input).val();
  }
  createdUser.id = Number(createdUser.id);
  userData.push(createdUser);

  renderUsersList(0, userData);
  renderPagination(userData);
  backToHome();
};
