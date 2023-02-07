async function refresh_list() {
    let htmlelement = document.getElementById("devicelist")
    let innerHTML = await (await fetch("/network-devices-as-html")).text()
    htmlelement.innerHTML = innerHTML
}
async function refresh_viewer(id) {
    let htmlelement = document.getElementById("deviceviewer")
    let innerHTML = await (await fetch("/network-devices-as-html/" + id)).text()
    htmlelement.innerHTML = innerHTML
}
refresh_list()
console.log("Hello world!")