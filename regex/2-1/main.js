const nameFormat = /^([a-zA-Z]){1,30}$/;
const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
const passwordFormat =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/gm;

const formValidator = () => {
  $(".form-text").removeClass("text-danger");

  if (!$("#firstName").val().trim().match(nameFormat)) {
    $("#firstNameHelp").addClass("text-danger");
  }

  if (!$("#lastName").val().trim().match(nameFormat)) {
    $("#lastNameHelp").addClass("text-danger");
  }

  if (!$("#email").val().trim().match(emailFormat)) {
    $("#emailHelp").addClass("text-danger");
  }

  if (!$("#password").val().trim().match(passwordFormat)) {
    $("#passwordHelp").addClass("text-danger");
  }
};
