// استبدل الرابط اللي تحت ده برابط الـ CSV اللي خدته من جوجل شيت (Publish to web)
const mySheet = "https://script.google.com/macros/s/AKfycbxiPcSexC05MJVeFohzNaNex4oDW0rVylIjAXSsV9BD1QP7v9Esg3xO8CtUh_yOOV6g/exec";

async function getSheetsData() {
    const response = await fetch(mySheet);
    const data = await response.text();
    const rows = data.split('\n').slice(1);
    const gallery = document.getElementById('apartments-gallery');
    
    gallery.innerHTML = ''; 

    rows.forEach(row => {
        const col = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/); 
        if(col.length < 11) return; 

        // الترتيب حسب جدولك (A: المدينة، B: المشروع، إلخ...)
        const city = col[0]; const project = col[1]; const bldg = col[2];
        const apt = col[3]; const floor = col[4]; const area = col[5];
        const total = col[7]; const over = col[8]; const details = col[9];
        const special = col[10]; const image = col[11];

        gallery.innerHTML += `
            <div class="property-card" data-city="${city.trim()}">
                <div class="card-img">
                    <img src="${image}" alt="صورة الشقة">
                    ${special ? `<span class="badge">${special}</span>` : ''}
                </div>
                <div class="info">
                    <h3>${project} - ${city}</h3>
                    <p>${details}</p>
                    <div class="specs">
                        <span>عمارة: ${bldg}</span> <span>شقة: ${apt}</span>
                        <span>${floor}</span> <span>${area} م²</span>
                    </div>
                    <div class="price-box">
                        <div class="total">الإجمالي: ${total}</div>
                        <div class="over">الأوفر: ${over}</div>
                    </div>
                    <button class="wa-btn" onclick="window.open('https://wa.me/9665XXXXXXXX')">تواصل واتساب</button>
                </div>
            </div>
        `;
    });
}

function filterCity(cityName) {
    const cards = document.querySelectorAll('.property-card');
    cards.forEach(card => {
        card.style.display = (card.getAttribute('data-city') === cityName) ? "block" : "none";
    });
}

window.onload = getSheetsData;
