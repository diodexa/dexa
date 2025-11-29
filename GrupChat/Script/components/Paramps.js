

export function NamaTamu () {
    const urlParams = new URLSearchParams(window.location.search);
    const nama = urlParams.get('to') || 'Nama Tamu';
    const sambutanText = document.querySelector('#Sambutan');
     sambutanText.innerHTML = `<p>Hai, selamat bergabung ya ${nama} <br> ini undangan ya bukan grup chat beneran.</p> <br>
        <span class="waktu">10:55</span>`

}
