const selectElement= document.querySelector("select");

const dateParagraph = document.querySelector("p.date");
const tempMessageParagraph = document.querySelector("p.temp-message");
const rainMessageParagraph = document.querySelector("p.rain-message")

let jData;
(async() =>{
    const data= await fetch("https://danepubliczne.imgw.pl/api/data/synop")
    jData= await data.json()

    jData.forEach(el =>{
        const optionElement= document.createElement("option")

        optionElement.textContent = el.stacja
        selectElement.appendChild(optionElement)
    })
})()

const displayCityData= city =>{
    if (city) {

        const result = jData.filter(el => el.stacja === city)
        const { data_pomiaru, godzina_pomiaru, temperatura, suma_opadu, stacja} = result[0]

        dateParagraph.textContent = `Data i godzina pomiaru: ${data_pomiaru}  ${godzina_pomiaru}:00 dla miasta ${stacja}`
        tempMessageParagraph.textContent = `Temperatura: ${temperatura} °C`
        rainMessageParagraph.textContent = `Suma opadu: ${suma_opadu}`
    }

}

selectElement.addEventListener("change", (e)=> displayCityData(e.target.value))