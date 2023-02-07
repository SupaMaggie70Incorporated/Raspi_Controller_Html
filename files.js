async function DirectoryClicked(event) {
    let parent = event.target.parentNode; // Parent of button
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
        html += `<li data-type="directory" name="${directories[i]}"><button onclick="DirectoryClicked(event)">${directories[i]}/</button></li>`;
    }
    for(var i = 0;i < files.length;i++) {
        html += `<li data-type="file" name="${files[i]}"><button onclick="FileClicked(event)">${files[i]}</button></li>`;
    }
    node.innerHTML = html;
    parent.appendChild(node);
}
function FileClicked(event) {
    let node = event.target.parentNode;
    console.log(`File ${GetPath(node)} was clicked`);
}
function DeletePressed(event) {
    let self = event.target.parentNode;
    let path = GetPath(element);
}
function OpenPressed(event) {

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