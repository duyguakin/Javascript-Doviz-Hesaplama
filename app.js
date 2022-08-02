$(document).ready(function () {
    $("#hesapla").click(function () {
        hesapla();
    });
});
function hesapla() {
    (async () => {
        const {
            value: tl
        } = await Swal.fire({
            title: 'Lütfen TL Miktarı Giriniz',
            input: 'number',
            inputPlaceholder: '₺'
        })
        if (tl) {
            $.ajax({
                url: "http://hasanadiguzel.com.tr/api/kurgetir",
                type: "GET",
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    var html = `<tr>
                        <th>Döviz Adı</th>
                        <th>${tl}₺ ile Alınabilir Miktar</th>
                        <th>${tl}₺ için Satmanız Gereken Miktar</th>
                    </tr>`;
                    for (var i = 0; i < data.TCMB_AnlikKurBilgileri.length; i++) {
                        html +=
                            `<tr>
                            <td>${data.TCMB_AnlikKurBilgileri[i].Isim} </td>
                            <td>${(tl / data.TCMB_AnlikKurBilgileri[i].ForexSelling).toFixed(5)}</td>
                            <td>${(tl / data.TCMB_AnlikKurBilgileri[i].ForexBuying).toFixed(5)}</td>
                            </tr>`;
                    }
                    $("#table").html(html);
                }
            });
        }
    })()

}