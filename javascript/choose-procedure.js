function showGeneratedSubtitle(){
    const subtitle = localStorage.getItem("generatedSubtitle");
    const subtitleElement = document.getElementById("subtitle");
    subtitleElement.innerText = subtitle;
}

showGeneratedSubtitle();