/* Apply-edits: applies text edits saved from edit-mode.html.
   Runs before main.js so content is corrected at parse time.
   Edits are keyed by element id; saved in localStorage "wm_edits". */
(function () {
  try {
    var raw = localStorage.getItem("wm_edits");
    if (!raw) return;
    var edits = JSON.parse(raw);
    if (!edits || !Object.keys(edits).length) return;
    var apply = function () {
      Object.keys(edits).forEach(function (id) {
        var el = document.getElementById(id);
        if (el) el.textContent = edits[id];
      });
    };
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", apply);
    } else {
      apply();
    }
  } catch (e) {
    console.warn("[apply-edits] failed:", e);
  }
})();
