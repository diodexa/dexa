
export const NamaTamu = () => {

    const urlParams = new URLSearchParams(window.location.search);
    const nama = urlParams.get('to') || 'Tamu Undangan';
    
    
    const sambutanText = document.querySelector('#Tamu');
    sambutanText.innerHTML = `${nama}`.replace(/,$/,',') ;
}