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
// tìm nghệ sĩ
function searchArtist() {
    const input = document.getElementById("searchInput").value.toLowerCase().trim();

    const artistPages = {
        "martin garrix": "edm.html",
        "alan walker": "edm.html",
        "david guetta": "edm.html",
        "avicii": "edm.html",
        "marshmello": "edm2.html",
        "calvin harris": "edm2.html",
        "dimitri vegas and like mike": "edm2.html",
        "timmy trumpet": "edm2.html",
        "chainsmokers": "edm3.html",
        "tiesto": "edm3.html",
        "skrillex": "edm3.html",
        "kshmr": "edm3.html",
        "hardwell": "edm4.html",
        "alok": "edm4.html",
        "steve aoki": "edm4.html",
        "oliver heldens": "edm4.html",
        "afrojack": "edm5.html",
        "armin van buuren": "edm5.html",
        "zedd": "edm5.html",
        "fisher": "edm5.html",
        "fujii kaze": "Jpop.html",
        "kenshi yonezu": "Jpop.html",
        "yorushika": "Jpop.html",
        "radwimps": "Jpop.html",
        "ado": "Jpop2.html",
        "yoasobi": "Jpop2.html",
        "kanaboon": "Jpop2.html",
        "imase": "Jpop2.html",
        "offical hige dadism": "Jpop3.html",
        "king gnu": "Jpop3.html",
        "creepy nuts": "Jpop3.html",
        "kocchi no kento": "Jpop3.html",
        "zutomayo": "Jpop4.html",
        "miki matsubra": "Jpop4.html",
        "atarashii gakko": "Jpop4.html",
        "mariya takeuchi": "Jpop4.html",
        "minabakumori": "Jpop5.html",
        "masayuki suzuki": "Jpop5.html",
        "xg": "Jpop5.html",
        "vaundy": "Jpop5.html",
        "black pink": "kpop.html",
        "exo": "kpop.html",
        "psy": "kpop.html",
        "bts": "kpop.html",
        "seventeen": "kpop2.html",
        "red velvet": "kpop2.html",
        "twice": "kpop2.html",
        "bigbang": "kpop2.html",
        "got7": "kpop3.html",
        "new jeans": "kpop3.html",
        "ikon": "kpop3.html",
        "snsd" : "kpop3.html",
        "girl's generation": "kpop3.html",
        "nct 127": "kpop4.html",
        "super junior": "kpop4.html",
        "monsta x": "kpop4.html",
        "2ne1": "kpop4.html",
        "iu": "kpop5.html",
        "aespa": "kpop5.html",
        "enhypen": "kpop5.html",
        "ateez": "kpop5.html",
        "eminem": "rap.html",
        "kendrick lamar": "rap.html",
        "drake": "rap.html",
        "nf": "rap.html",
        "future": "rap2.html",
        "j cole": "rap2.html",
        "21 savage": "rap2.html",
        "travis scott": "rap2.html",
        "dababy": "rap3.html",
        "jid": "rap3.html",
        "kanye west": "rap3.html",
        "snoop dogg": "rap3.html",
        "logic": "rap4.html",
        "tugpac": "rap4.html",
        "cardi b": "rap4.html",
        "nicki minaj": "rap4.html",
        "jay z": "rap5.html",
        "donald glover": "rap5.html",
        "hanumankind": "rap5.html",
        "asap rocky": "rap5.html",
        "a$ap rocky": "rap5.html",
        "radio head": "rock.html",
        "queen": "rock.html",
        "imagine dragons": "rock.html",
        "the beatles": "rock.html",
        "coldplay": "rock2.html",
        "linkin park": "rock2.html",
        "maroon 5": "rock2.html",
        "one republic": "rock2.html",
        "beyonce": "rock3.html",
        "elvis": "rock3.html",
        "arctic monkey": "rock3.html",
        "50 cent": "rock3.html",
        "rolling stones": "rock4.html",
        "prince": "rock4.html",
        "nirvana": "rock4.html",
        "fall out boy": "rock4.html",
        "keane": "rock5.html",
        "foster the people": "rock5.html",
        "twenty one pilots": "rock5.html",
        "slipknot": "rock5.html",
        "lady gaga": "usuk.html",
        "billie eilish": "usuk.html",
        "selena gomez": "usuk.html",
        "sza": "usuk.html",
        "sabrina carpenter": "usuk2.html",
        "taylor swift": "usuk2.html",
        "bruno mars": "usuk2.html",
        "frank ocean": "usuk2.html",
        "rihanna": "usuk3.html",
        "joji": "usuk3.html",
        "ariana grande": "usuk3.html",
        "michael jackson": "usuk3.html",
        "hozier": "usuk4.html",
        "dua lipa": "usuk4.html",
        "jvke": "usuk4.html",
        "justin bieber": "usuk4.html",
        "adele": "usuk5.html",
        "katy pery": "usuk5.html",
        "camila cabello": "usuk5.html",
        "sia": "usuk5.html",
        "sơn tùng mtp": "vpop.html",
        "tlinh": "vpop.html",
        "đen vâu": "vpop.html",
        "mck": "vpop.html",
        "hieuthuhai": "vpop2.html",
        "hoàng thuỳ linh": "vpop2.html",
        "wren evans": "vpop2.html",
        "mono": "vpop2.html",
        "amee": "vpop3.html",
        "phương mỹ chi": "vpop3.html",
        "mỹ tâm": "vpop3.html",
        "pháo": "vpop3.html",
        "erik": "vpop4.html",
        "dương domic": "vpop4.html",
        "justatee": "vpop4.html",
        "bray": "vpop4.html",
        "rhymastic": "vpop5.html",
        "ngọt": "vpop5.html",
        "jack": "vpop5.html",
        "low g": "vpop5.html",
    };

    let found = false;

    for (let name in artistPages) {
        if (name.includes(input)) {
            window.location.href = artistPages[name];
            found = true;
            break;
        }
    }

    if (!found) {
        alert("Không tìm thấy nghệ sĩ nào khớp!");
    }
}