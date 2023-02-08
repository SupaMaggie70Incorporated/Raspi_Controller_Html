const fileOptionsString = `
<div class="options">
    <button class="option" onclick="EditClicked(event.target.parentNode.parentNode)">Edit</button>
    <button class="option" onclick="RenameClicked(event.target.parentNode.parentNode)">Rename</button>
    <button class="option" onclick="DownloadFileClicked(event.target.parentNode.parentNode)">Download</button>
    <button class="option" onclick="DeleteClicked(event.target.parentNode.parentNode)">Delete</button>
</div>
`
const directoryOptionsString = `
<div class="options">
    <button class="option" onclick="UploadClicked(event.target.parentNode.parentNode)">Upload</button>
    <button class="option" onclick="RenameClicked(event.target.parentNode.parentNode)">Rename</button>
    <button class="option" onclick="DownloadDirectoryClicked(event.target.parentNode.parentNode)">Download</button>
    <button class="option" onclick="DeleteClicked(event.target.parentNode.parentNode)">Delete</button>
</div>
`


async function DirectoryClicked(parent) {
    let children = parent.children; // Children of parent of button which includes nested files/directories
    for(const child of children) {
        if(child.getAttribute("data-type") == "nestedchildren") { // If it is the list of nested files/directories
            child.remove();
            return;
        }
    }
    let path = GetPath(parent);
    console.log(`Directory  ${path} was clicked`);
    let node = document.createElement("ul");
    node.setAttribute("data-type", "nestedchildren");
    let jsonPath = `/files/list/${path}`;
    console.log(`Fetching from ${jsonPath}`);
    let json = await (await fetch(jsonPath)).json();
    console.log(`Json: ${JSON.stringify(json)}`);
    let directories = json["directories"];
    let files = json["files"];
    let html = "";
    for(var i = 0;i < directories.length;i++) {
        html += `<li data-type="directory" name="${directories[i]}"><button onclick="DirectoryClicked(event.target.parentNode)">${directories[i]}/</button>${directoryOptionsString}</li>`;
    }
    for(var i = 0;i < files.length;i++) {
        html += `<li data-type="file" name="${files[i]}"><button onclick="FileClicked(event.target.parentNode)">${files[i]}</button>${fileOptionsString}</li>`;
    }
    node.innerHTML = html;
    parent.appendChild(node);
}
async function FileClicked(self) {
    EditClicked(self);
}
async function EditClicked(self) {
    let filePath = GetPath(self);
    console.log(filePath);
    let path = `/files/open/${filePath}`;
    console.log(path);
    window.location.href = path;
}
async function UploadClicked(self) {

}
async function RenameClicked(self) {

}
async function DownloadFileClicked(self) {
    let filepath = GetPath(self);
    let path = `/files/read/${filepath}`;
    console.log(path);
    window.open(path,"_blank");
}
async function DownloadDirectoryClicked(self) {
    let filepath = GetPath(self);
    let path = `/files/download-zip/${filepath}`;
    console.log(path);
    window.open(path,"_blank");
}
async function DeleteClicked(self) {
    let filepath = GetPath(element);
    let path = `/files/delete/${filepath}`;
    if(await (await fetch(path)).text() == "success") {
        self.remove();
    }
}
function GetPath(element) {
    var path = element.getAttribute("name");
    if (path == "C:") return "C:";
    while ((element = element.parentNode.parentNode).getAttribute("data-type") == "directory") {
        var name = element.getAttribute("name")
        path = name + "/" + path;
        if(name == "C:") break;
    }
    return path;
}