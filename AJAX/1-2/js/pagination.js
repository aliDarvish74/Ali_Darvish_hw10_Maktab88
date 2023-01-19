const pageActive = "page-link bg-warning border-dark text-dark";

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

const renderPagination = (data) => {
  $("#paginationContainer").html(paginationGenerator(data));
  $(".page-link")
    .eq(0)
    .removeClass("bg-dark")
    .removeClass("text-warning")
    .addClass("bg-warning")
    .addClass("text-dark");
};

const pageRender = function (index, self) {
  $(".page-link")
    .removeClass("bg-warning")
    .removeClass("text-dark")
    .addClass("bg-dark")
    .addClass("text-warning");
  self.className = pageActive;
  renderUsersList(index, userData);
};
