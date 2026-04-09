const mySheet = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTkKf1gSkh0cYANV04B3bTDtBCfyMuhVaUAasBsjeTR20lJPYXebPsM_WWlCENnxatM0s0hH3WVIRXw/pub?output=csv";

async function getSheetsData() {
    try {
        const response = await fetch(mySheet);
        const data = await response.text();
        const rows = data.split('\n').slice(1);
        const gallery = document.getElementById('apartments-gallery');
        gallery.innerHTML = ''; 

        rows.forEach(row => {
            const col = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/); 
            if(col.length < 10) return; 

            const city = col[0].trim();
            const project = col[1].trim();
            const details = col[9].trim();
            const image = col[11].trim(); // رابط الصورة

            gallery.innerHTML += `
                <div class="property-card" data-city="${city}">
                    <img src="${image}" onerror="this.src='https://via.placeholder.com/300x200?text=AL-FAYROUZ'">
                    <div class="info">
                        <h3>${project}</h3>
                        <p>${city}</p>
                        <p>${details}</p>
                        <button class="wa-btn" onclick="window.open('https://wa.me/2010XXXXXXXX')">واتساب</button>
                    </div>
                </div>`;
        });
    } catch (e) { console.log("خطأ في البيانات"); }
}

function filterCity(cityName) {
    const cards = document.querySelectorAll('.property-card');
    cards.forEach(card => {
        card.style.display = (card.getAttribute('data-city') === cityName) ? "block" : "none";
    });
}
window.onload = getSheetsData;
