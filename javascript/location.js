function initMap() {
    // Location
    const locationCraiova = { lat: 44.330177, lng: 23.794882 };
    console.log("Location " + locationCraiova);

    // Map centered on location
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: locationCraiova,
    });

    // The marker for location
    const marker = new google.maps.Marker({
        position: locationCraiova,
        map: map,
    });
  }

