const topicSearch = document.getElementById("topicSearch");
const topicCards = document.querySelectorAll(".topic-card");
const topicButtons = document.querySelectorAll(".link-btn");
const hrTopicSelect = document.getElementById("hrTopic");
const intakeForm = document.getElementById("intakeForm");
const confirmationBox = document.getElementById("confirmationBox");

if (topicSearch) {
  topicSearch.addEventListener("input", function () {
    const searchValue = topicSearch.value.toLowerCase().trim();

    topicCards.forEach((card) => {
      const searchableText = card.dataset.topic.toLowerCase();
      const title = card.querySelector("h3").textContent.toLowerCase();
      const description = card.querySelector("p").textContent.toLowerCase();

      const isMatch =
        searchableText.includes(searchValue) ||
        title.includes(searchValue) ||
        description.includes(searchValue);

      card.style.display = isMatch ? "block" : "none";
    });
  });
}

topicButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const topic = button.dataset.fill;
    hrTopicSelect.value = topic;
    document.getElementById("call-intake").scrollIntoView({ behavior: "smooth" });
  });
});

if (intakeForm) {
  intakeForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const employeeName = document.getElementById("employeeName").value.trim();
    const hrTopic = document.getElementById("hrTopic").value.trim();
    const issueSummary = document.getElementById("issueSummary").value.trim();

    if (!employeeName || !hrTopic || !issueSummary) {
      alert("Please complete Employee Name, HR Topic, and Issue Summary.");
      return;
    }

    confirmationBox.classList.remove("hidden");
    intakeForm.reset();
    confirmationBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
}
