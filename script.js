const mySheet = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTkKf1gSkh0cYANV04B3bTDtBCfyMuhVaUAasBsjeTR20lJPYXebPsM_WWlCENnxatM0s0hH3WVIRXw/pub?output=csv";

async function getSheetsData() {
    try {
        const response = await fetch(mySheet);
        const data = await response.text();
        const rows = data.split('\n').slice(1);
        const gallery = document.getElementById('apartments-gallery');
        
        gallery.innerHTML = ''; 

        rows.forEach(row => {
            // تقسيم السطر مع مراعاة الفواصل داخل النصوص
            const col = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/); 
            if(col.length < 10) return; 

            const city     = col[0] ? col[0].trim() : ""; // العمود A
            const project  = col[1] ? col[1].trim() : ""; // العمود B
            const bldg     = col[2] ? col[2].trim() : ""; // العمود C
            const apt      = col[3] ? col[3].trim() : ""; // العمود D
            const floor    = col[4] ? col[4].trim() : ""; // العمود E
            const area     = col[5] ? col[5].trim() : ""; // العمود F
            const total    = col[7] ? col[7].trim() : ""; // العمود H
            const over     = col[8] ? col[8].trim() : ""; // العمود I
            const details  = col[9] ? col[9].trim() : ""; // العمود J
            const image    = col[11] ? col[11].trim() : ""; // العمود L (الصور)

            gallery.innerHTML += `
                <div class="property-card" data-city="${city}">
                    <div class="card-img">
                        <img src="${image}" alt="صورة العقار" onerror="this.src='https://via.placeholder.com/400x300?text=جاري+رفع+الصورة'">
                    </div>
                    <div class="info">
                        <h3>${project} - ${city}</h3>
                        <div class="specs">
                            <span>عمارة: ${bldg}</span> <span>شقة: ${apt}</span>
                            <span>${floor}</span> <span>${area} م²</span>
                        </div>
                        <p class="details">${details}</p>
                        <div class="price-box">
                            <div class="total">الإجمالي: ${total}</div>
                            <div class="over">الأوفر: ${over}</div>
                        </div>
                        <button class="wa-btn" onclick="window.open('https://wa.me/2010XXXXXXXX')">تواصل واتساب</button>
                    </div>
                </div>
            `;
        });
    } catch (error) {
        console.error("عذراً، حدث خطأ في تحميل البيانات:", error);
    }
}

function filterCity(cityName) {
    const cards = document.querySelectorAll('.property-card');
    cards.forEach(card => {
        card.style.display = (card.getAttribute('data-city') === cityName) ? "block" : "none";
    });
}

window.onload = getSheetsData;
