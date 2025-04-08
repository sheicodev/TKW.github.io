async function getSpotifyToken() {
    const clientId = "fada157a184c44a9a40e917ba5e0d12a";  
    const clientSecret = "8fd7508dd9a14e648e3cb30d33e468d3";  

    const credentials = btoa(`${clientId}:${clientSecret}`);
    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Authorization": `Basic ${credentials}`,
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "grant_type=client_credentials"
    });

    const data = await response.json();
    return data.access_token;
}

async function updateStreams() {
    const accessToken = await getSpotifyToken();

    // Lấy tất cả các div.textcontent có ID (ID chính là Spotify Artist ID)
    document.querySelectorAll('.textcontent[id]').forEach(async (element) => {
        const artistId = element.id; // Lấy ID của textcontent (Spotify Artist ID)

        const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
            headers: { "Authorization": `Bearer ${accessToken}` }
        });

        if (response.ok) {
            const data = await response.json();
            const monthlyStreams = data.followers.total.toLocaleString();
            element.querySelector("h5").textContent = `${monthlyStreams} Người Theo Dõi`;
        } else {
            element.querySelector("h5").textContent = "Không thể lấy dữ liệu";
        }
    });
}

// Chạy khi trang tải xong
window.onload = updateStreams;

