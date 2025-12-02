export const DoaUcapan = () => {
    document.addEventListener("DOMContentLoaded", async function() {
    const scriptURL = "https://script.google.com/macros/s/AKfycbwdCJUNB86lSZdN4SyxaRQo6DTdDeROUFxxAe3-yRq5cTVeaT9-gENyGOaXv1Cux6M/exec";
    const formRsvp = document.getElementById("form-rsvp"); 
    const paginationControls = document.getElementById("pagination-controls");
    const commentsDiv = document.getElementById("comments");
    const btnKirim = formRsvp.querySelector('button[type="submit"]');
    const idUndangan = "wehweh-blehbleh";

    let ALL_COMMENTS = [];
    let currentPage = 1;
    const COMMENTS_PER_PAGE = 4;

    // --- DISPLAY COMMENTS ---
    function displayComments(page) {
        commentsDiv.innerHTML = '';

        const totalComments = ALL_COMMENTS.length;
        const startIndex = (page - 1) * COMMENTS_PER_PAGE;
        const endIndex = Math.min(startIndex + COMMENTS_PER_PAGE, totalComments);

        const commentsToShow = ALL_COMMENTS.slice(startIndex, endIndex);
        commentsToShow.forEach(comment => {
            const div = document.createElement("div");
            div.className = "comment-item";
            div.innerHTML = `
                <p><b>${comment.nama}</b> <span class="kehadiran-badge ${comment.kehadiran === 'Hadir' ? 'hadir':'tidakhadir'}">${comment.kehadiran}</span></p>
                <p>${comment.ucapan}</p>
                <hr>`;
            commentsDiv.appendChild(div);
        });

        renderPaginationControls();
    }

    // --- RENDER PAGINATION ---
    function renderPaginationControls() {
        const totalPages = Math.ceil(ALL_COMMENTS.length / COMMENTS_PER_PAGE);
        if (totalPages <= 1) {
            paginationControls.innerHTML = '';
            return;
        }

        paginationControls.innerHTML = `
            <button onclick="goToPage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>Previous</button>
            <span>${currentPage}/${totalPages}</span>
            <button onclick="goToPage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>Next</button>
        `;
    }

    // --- NAVIGASI HALAMAN ---
    window.goToPage = function(page) {
        const totalPages = Math.ceil(ALL_COMMENTS.length / COMMENTS_PER_PAGE);
        if (page < 1 || page > totalPages) return;
        currentPage = page;
        displayComments(currentPage);
        // formRsvp.scrollIntoView({ behavior: 'smooth' });
    }

    // --- FETCH COMMENTS ---
    async function fetchComments() {
        try {
            const response = await fetch(scriptURL + "?id=" + idUndangan);
            const text = await response.text(); 
            console.log("Raw response:", text);
            const data = JSON.parse(text);
            // const data = await response.json();
            ALL_COMMENTS = data.reverse();
            displayComments(currentPage);
        } catch (err) {
            console.error("Gagal mengambil data komentar:", err);
            commentsDiv.innerHTML = "<p>Gagal memuat komentar. Silakan coba lagi.</p>";
        }
    }

    // --- SUBMIT FORM ---
    formRsvp.addEventListener("submit", async function(e) {
        e.preventDefault();
        const formData = new FormData(formRsvp);
        btnKirim.disabled = true;
        btnKirim.textContent = 'Mengirim...';
        try {
            const response = await fetch(scriptURL, { method: 'POST', body: formData });
            if (!response.ok) throw new Error(`Status: ${response.status}`);
            formRsvp.reset();
            currentPage = 1;
            await fetchComments();
            formRsvp.scrollIntoView({ behavior: 'smooth' });
        } catch (err) {
            console.error("Gagal mengirim data:", err);
            alert("Terjadi kesalahan: " + err.message);
        } finally {
            btnKirim.disabled = false;
            btnKirim.textContent = 'Kirim';
        }
    });

    // --- INIT ---
    fetchComments();
});
}