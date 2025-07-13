document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("joinForm");
  const downloadBtn = document.getElementById("downloadBtn");

  // Load from localStorage if exists
  let submissions = JSON.parse(localStorage.getItem("narsnSubmissions")) || [];

  // Save to localStorage
  function saveToLocalStorage() {
    localStorage.setItem("narsnSubmissions", JSON.stringify(submissions));
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      institution: form.institution.value.trim(),
      interest: form.interest.value.trim()
    };

    submissions.push(data);           // Add new submission
    saveToLocalStorage();             // Save to localStorage

    alert("Submission added! Click 'Download All Submissions' to save as CSV.");
    form.reset();
  });

  downloadBtn.addEventListener("click", function () {
    if (submissions.length === 0) {
      alert("No submissions yet.");
      return;
    }

    const headers = ["Full Name", "Email", "Institution", "Interest Area"];
    const rows = submissions.map(s => [
      `"${s.name}"`,
      `"${s.email}"`,
      `"${s.institution}"`,
      `"${s.interest}"`
    ]);

    const csvContent =
      headers.join(",") + "\n" +
      rows.map(r => r.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.setAttribute("href", url);
    link.setAttribute("download", "narsn_all_submissions.csv");
    link.style.display = "none";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
});
