Reload();
document.addEventListener('keydown', e => {
    if (e.ctrlKey && e.key === 's') {
      // Prevent the Save dialog to open
      e.preventDefault();
      Save();
    }
});
document.addEventListener('keydown', e => {
    if (e.ctrlKey && e.key === 'r') {
      // Prevent the page reloading
      e.preventDefault();
      Reload();
    }
});

async function Reload() {
    console.log("Reloading");
    let path = "/files/read" + location.pathname.slice(11);
    let content = await (await fetch(path)).text();
    document.getElementById("editor").innerText = content;
}
async function Save() {
  console.log("Saving");
  let path = "/files/write" + location.pathname.slice(11);
  let content = document.getElementById("editor").innerText;
  await fetch(path, {
    method: "POST",
    body: content
  });
}
function Replace(originalString, searchFor, replaceWith) {
  return originalString.split(searchFor).join(replaceWith);
}