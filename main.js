const selectElement= document.querySelector("select");
const intro = document.querySelector("p.intro")
const dateParagraph = document.querySelector("p.date");
const tempMessageParagraph = document.querySelector("p.temp-message");
const rainMessageParagraph = document.querySelector("p.rain-message")

let jData;
(async() =>{
    const data= await fetch("https://danepubliczne.imgw.pl/api/data/synop")
    jData= await data.json()

    jData.forEach(el =>{
        const optionElement= document.createElement("option")
        optionElement.setAttribute("value" , `${el.stacja}`)
        optionElement.textContent = el.stacja
        selectElement.appendChild(optionElement)
    })
})()

const displayCityData= city =>{
    if (city !== "unknown") {

        const result = jData.filter(el => el.stacja === city)
        const {stacja, data_pomiaru, godzina_pomiaru, temperatura, suma_opadu} = result[0]
        intro.textContent = `Wyświetlam pogodę dla miasta ${stacja}`
        dateParagraph.textContent = `Data i godzina pomiaru: ${data_pomiaru}  ${godzina_pomiaru}:00`
        tempMessageParagraph.textContent = `Temperatura: ${temperatura} °C`
        rainMessageParagraph.textContent = `Suma opadu: ${suma_opadu}`
    }

}

selectElement.addEventListener("click", (e)=> displayCityData(e.target.value))