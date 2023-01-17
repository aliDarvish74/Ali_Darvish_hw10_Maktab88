const usersListContainer = document.getElementById("usersList");
const paginationContainer = document.getElementById("paginationContainer");
const userProfileModalTitle = document.getElementById("userProfileModalTitle");
const userProfileModalBody = document.getElementById("userProfileModalBody");
const userProfileModalFooter = document.getElementById(
  "userProfileModalFooter"
);
const pageActive = "page-link bg-warning border-dark text-dark";
const pageDeactive = "page-link bg-dark border-dark text-warning";
let selectedUser = null;
let newUserData = userData;

const generateProfileInformation = ({
  first_name,
  last_name,
  id,
  email,
  avatar,
}) => {
  return `
  
  <div class="row">
    <div class="col-4">
    <img src="${avatar}" alt="${id}" class = "rounded h-100 d-block mx-auto"/>
    </div>
    <div class="col-8">
      <ul class="list-group list-group-flush my-4">
        <li class="list-group-item">First Name: ${first_name}</li>
        <li class="list-group-item">Last Name: ${last_name}</li>
        <li class="list-group-item">UID: ${id}</li>
        <li class="list-group-item">Email Address: ${email}</li>
      </ul>
    </div>
    </div>
    
    `;
};

const showModalInformation = ({ first_name, last_name, id, email, avatar }) => {
  userProfileModalTitle.innerText = `${first_name} ${last_name}'s Profile`;

  const profileInfo = generateProfileInformation({
    first_name,
    last_name,
    id,
    email,
    avatar,
  });
  userProfileModalBody.innerHTML = profileInfo;
};

const handleOnClickProfileBtn = (id) => {
  const targetUser = userData.find((el) => el.id === id);
  showModalInformation(targetUser);
};

const cardGenerator = ({ id, last_name, first_name, avatar, email }) => {
  return `
        <div class="col-lg-4 col-md-6 col-12 ">
            <div class="card shadow rounded-4 bg-dark">
              <div  class="card-img-top rounded-4 w-100 rounded-bottom" style="background: url(${avatar});  background-position: center; background-size: cover; background-repeat: no-repeat; padding-top: 100% ;">
              </div>
            <div class="card-body">
              <h5 class="card-title text-center text-warning">${first_name} ${last_name}</h5>
              <p class = "text-light" style = "text-align: justify">
                ${first_name} ${last_name} is Maktab 88 user by UID of ${id}, You can easily get in touch
                with ${first_name} from ${email}
              </p>
              <ul class="list-group my-4">
                <li class="list-group-item list-group-item-dark text-dark">UID: ${id}</li>
                <li class="list-group-item list-group-item-dark text-dark">Email : ${email}</li>
              </ul>
                    <button
                        onclick="handleOnClickProfileBtn(${id})" 
                        class="btn btn-warning rounded-3 w-100"
                        data-bs-toggle="modal" data-bs-target="#userProfileModal"
                    >
                        Profile
                    </button>
                </div>
            </div>
        </div>
    `;
};
const usersListGenerator = (index, data) => {
  let usersListBody = "";

  for (let i = index; i < index + 6; i++) {
    if (!data[i]) {
      break;
    }
    usersListBody += cardGenerator(data[i]);
  }
  return usersListBody;
};

const renderUsersList = (index, data) => {
  usersListContainer.innerHTML = usersListGenerator(index, data);
};

renderUsersList(0, newUserData);

/********************************************** */
/*********** Pagination Start *********** */

// Generate Pagination
const paginationGenerator = (data) => {
  let paginationBody = "";
  const pageCount = Math.ceil(data.length / 6);
  let startIndex = 0;
  for (let i = 0; i < pageCount; i++) {
    paginationBody += `
    <li class="page-item">
      <a
        class="page-link bg-dark border-dark text-warning"
        href="#"
        onclick="pageRender(${startIndex},this)"
        >${i + 1}</a
      >
    </li>`;
    startIndex += 6;
  }
  return paginationBody;
};

// Render Pagination
const renderPagination = (data) => {
  paginationContainer.innerHTML = paginationGenerator(data);
  document.querySelectorAll(".page-link")[0].classList = pageActive;
};

renderPagination(newUserData);

// Render Page

const pageRender = function (index, self) {
  let pageBtns = document.querySelectorAll(".page-link");
  for (const btn of pageBtns) {
    btn.className = pageDeactive;
  }
  self.className = pageActive;
  renderUsersList(index, newUserData);
};

/***********************************
 * Filter Users
 */

const filterUsers = function (self) {
  const searchKey = self.value.toLowerCase();
  newUserData = userData.filter((item) => {
    for (const value of Object.values(item)) {
      if (value.toString().toLowerCase().includes(searchKey)) {
        return true;
      }
    }
  });
  renderUsersList(0, newUserData);
  renderPagination(newUserData);
};
