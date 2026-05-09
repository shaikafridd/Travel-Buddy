// map.js
document.addEventListener('DOMContentLoaded', () => {
    if (typeof maptilersdk !== 'undefined') {
        maptilersdk.config.apiKey = mapToken;

        // Ensure we have coordinates before trying to center the map
        if (!listingData.geometry || !listingData.geometry.coordinates) {
            console.error("No coordinates found for this listing.");
            return;
        }

        const map = new maptilersdk.Map({
            container: 'map',
            style: maptilersdk.MapStyle.STREETS,
            center: listingData.geometry.coordinates, // Correct: [lng, lat]
            zoom: 9
        });

        new maptilersdk.Marker({ color: "red" })
            .setLngLat(listingData.geometry.coordinates)
            .setPopup(
                new maptilersdk.Popup({ offset: 25 })
                    .setHTML(`<h4>${listingData.location}</h4><p>Exact location will be shown after booking..</p>`)
            )
            .addTo(map);

    } else {
        console.error("MapTiler SDK failed to load.");
    }
});