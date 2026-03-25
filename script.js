const tabs = document.querySelectorAll(".tab");
const tabContents = document.querySelectorAll(".tab-content");
const hrTopic = document.getElementById("hrTopic");
const topicGuidance = document.getElementById("topicGuidance");
const quickFillButtons = document.querySelectorAll(".quick-fill");
const generateSummaryBtn = document.getElementById("generateSummaryBtn");
const clearAllBtn = document.getElementById("clearAllBtn");
const summaryBox = document.getElementById("summaryBox");
const saveContextBtn = document.getElementById("saveContextBtn");

const guidanceMap = {
  "Benefits": {
    intro: "Use this script when the employee is asking about medical, dental, vision, enrollment, dependents, or eligibility.",
    questions: [
      "Are you calling about enrollment, eligibility, or a current benefit issue?",
      "What plan or coverage is affected?",
      "Is this for the employee or a dependent?",
      "Is there a deadline or open enrollment date involved?"
    ],
    script: "I can help document your benefits question and determine whether this can be resolved now or needs to be routed to the benefits team."
  },
  "Payroll": {
    intro: "Use this script for paycheck issues, tax form questions, direct deposit, deductions, and pay discrepancies.",
    questions: [
      "Which pay period is affected?",
      "Is the issue related to missing pay, incorrect pay, or deductions?",
      "Has the employee already reviewed their pay statement?",
      "Does this require payroll correction follow-up?"
    ],
    script: "Let me review the payroll concern with you and make sure we document the impacted pay period and the specific issue."
  },
  "Leave of Absence": {
    intro: "Use this script for FMLA, disability, parental leave, sick leave, and return-to-work questions.",
    questions: [
      "Is the employee requesting a new leave or calling about an existing leave?",
      "What type of leave is involved?",
      "Are there any dates or documentation deadlines?",
      "Is the employee currently out of work or planning future leave?"
    ],
    script: "I’ll capture the leave details and confirm whether additional forms, documentation, or routing are needed."
  },
  "Employee Relations": {
    intro: "Use this script for workplace concerns, conflict issues, complaints, and sensitive employee relations matters.",
    questions: [
      "Is the concern related to a manager, coworker, or workplace event?",
      "Is the issue ongoing or tied to a specific incident?",
      "Has this already been reported elsewhere?",
      "Does this require immediate escalation?"
    ],
    script: "I’ll document the concern carefully and determine whether it needs to be escalated for employee relations review."
  },
  "Policy Question": {
    intro: "Use this script when the employee is seeking clarification on an HR or workplace policy.",
    questions: [
      "Which policy or policy area is the employee asking about?",
      "Is the question general or tied to a specific situation?",
      "Has the employee already reviewed the handbook or posted guidance?",
      "Does the question affect a current employment action?"
    ],
    script: "I can help capture the policy question and determine the right HR team for clarification if needed."
  },
  "Employment Verification": {
    intro: "Use this script for employment status, dates of service, title confirmation, or verification guidance.",
    questions: [
      "Who is requesting the verification?",
      "What information is being requested?",
      "Is the employee seeking process guidance or status?",
      "Is there a time-sensitive deadline involved?"
    ],
    script: "Let me document the verification request and confirm the correct process and next steps."
  },
  "Onboarding / Training": {
    intro: "Use this script for orientation, required learning, onboarding tasks, or training assignments.",
    questions: [
      "Is the employee new, transferring, or following up on assigned training?",
      "What onboarding or training item is missing or unclear?",
      "Is the issue blocking access or employment readiness?",
      "Does the request require coordination with another team?"
    ],
    script: "I’ll note the onboarding or training issue and identify whether it can be resolved directly or routed."
  },
  "Other": {
    intro: "Use this script for HR issues that do not fit the standard categories.",
    questions: [
      "Can you briefly describe the HR issue?",
      "Is this tied to a deadline or active employment matter?",
      "Has the employee contacted HR previously about this issue?",
      "Does the request need transfer or escalation?"
    ],
    script: "I’ll document the request and help determine the most appropriate HR path."
  }
};

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.tab;

    tabs.forEach((t) => t.classList.remove("active"));
    tabContents.forEach((content) => content.classList.remove("active"));

    tab.classList.add("active");
    document.getElementById(target).classList.add("active");
  });
});

quickFillButtons.forEach((button) => {
  button.addEventListener("click", () => {
    hrTopic.value = button.dataset.topic;
    renderGuidance(button.dataset.topic);

    tabs.forEach((t) => t.classList.remove("active"));
    tabContents.forEach((content) => content.classList.remove("active"));

    document.querySelector('[data-tab="tab-topic"]').classList.add("active");
    document.getElementById("tab-topic").classList.add("active");
  });
});

hrTopic.addEventListener("change", () => {
  renderGuidance(hrTopic.value);
});

function renderGuidance(topic) {
  if (!topic || !guidanceMap[topic]) {
    topicGuidance.innerHTML = `
      <div class="guidance-card">
        <h3>Select a topic</h3>
        <p>Choose an HR topic in the Triage tab to display the recommended questions and script.</p>
      </div>
    `;
    return;
  }

  const data = guidanceMap[topic];

  topicGuidance.innerHTML = `
    <div class="guidance-card">
      <h3>${topic}</h3>
      <p>${data.intro}</p>
    </div>

    <div class="guidance-card">
      <h3>Suggested Questions</h3>
      <ul>
        ${data.questions.map((question) => `<li>${question}</li>`).join("")}
      </ul>
    </div>

    <div class="guidance-card">
      <h3>Suggested Script</h3>
      <p>${data.script}</p>
    </div>
  `;
}

saveContextBtn.addEventListener("click", () => {
  const employeeName = document.getElementById("employeeName").value.trim();
  const employeeId = document.getElementById("employeeId").value.trim();
  const department = document.getElementById("department").value.trim();
  const callbackNumber = document.getElementById("callbackNumber").value.trim();

  summaryBox.textContent =
    `Employee: ${employeeName || "N/A"}\n` +
    `Employee ID: ${employeeId || "N/A"}\n` +
    `Department: ${department || "N/A"}\n` +
    `Callback: ${callbackNumber || "N/A"}`;
});

generateSummaryBtn.addEventListener("click", () => {
  const employeeName = document.getElementById("employeeName").value.trim();
  const employeeId = document.getElementById("employeeId").value.trim();
  const department = document.getElementById("department").value.trim();
  const callbackNumber = document.getElementById("callbackNumber").value.trim();
  const authStatus = document.getElementById("authStatus").value.trim();
  const topic = document.getElementById("hrTopic").value.trim();
  const urgency = document.getElementById("urgency").value.trim();
  const escalation = document.getElementById("escalation").value.trim();
  const issueSummary = document.getElementById("issueSummary").value.trim();
  const actionsTaken = document.getElementById("actionsTaken").value.trim();
  const nextSteps = document.getElementById("nextSteps").value.trim();
  const disposition = document.getElementById("disposition").value.trim();
  const wrapupNotes = document.getElementById("wrapupNotes").value.trim();

  summaryBox.textContent =
    `Employee: ${employeeName || "N/A"}\n` +
    `Employee ID: ${employeeId || "N/A"}\n` +
    `Department: ${department || "N/A"}\n` +
    `Callback: ${callbackNumber || "N/A"}\n` +
    `Authentication: ${authStatus || "N/A"}\n` +
    `Topic: ${topic || "N/A"}\n` +
    `Urgency: ${urgency || "N/A"}\n` +
    `Escalation: ${escalation || "N/A"}\n` +
    `Disposition: ${disposition || "N/A"}\n\n` +
    `Issue Summary:\n${issueSummary || "N/A"}\n\n` +
    `Actions Taken:\n${actionsTaken || "N/A"}\n\n` +
    `Next Steps:\n${nextSteps || "N/A"}\n\n` +
    `Wrap-Up Notes:\n${wrapupNotes || "N/A"}`;
});

clearAllBtn.addEventListener("click", () => {
  document.querySelectorAll("input, select, textarea").forEach((field) => {
    field.value = "";
  });

  topicGuidance.innerHTML = `
    <div class="guidance-card">
      <h3>Select a topic</h3>
      <p>Choose an HR topic in the Triage tab to display the recommended questions and script.</p>
    </div>
  `;

  summaryBox.textContent = "No call summary yet.";
});
