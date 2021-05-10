function showGeneratedSubtitle(){
    const subtitle = localStorage.getItem("generatedSubtitle");
    const subtitleElement = document.getElementById("subtitle");
    subtitleElement.innerText = subtitle;
    console.log("Generated subtitle " + subtitle);

}

window.addEventListener('DOMContentLoaded', () => showGeneratedSubtitle());

