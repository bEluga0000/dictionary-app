const playSound = (url)=>{
    let audio = new Audio(url)
    audio.play()
}
const handelSearchButton = async () => {
    try {
        const dict = document.getElementById("dict")
        dict.textContent = "Loading...."
        const word = document.getElementById("search-word").value
        if (word.length == 0)
            throw new Error("Enter a word before submitting")
        else {
            const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
            if (!res)
                throw new Error("Error in getting response from the API")
            else {
                dict.textContent = ""
                const data = await res.json()
                if (data.title == "No Definitions Found")
                    throw new Error("No Definitions Found")
                console.log(data)
                for (m = 0; m < data.length; m++) {
                    if (m == 0) {
                        const dictMain = document.createElement("div")
                        dictMain.classList.add("dict-main")
                        for (n = 0; n < data[0].phonetics.length; n++) {
                            const mainSound = document.createElement("div")
                            mainSound.classList.add("main-sound")
                            const audioUrl = data[0].phonetics[n].audio;
                            mainSound.onclick = () => playSound(audioUrl);
                            mainSound.innerHTML = `<svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="size-4"
          >
            <path
              d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM18.584 5.106a.75.75 0 0 1 1.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 0 1-1.06-1.06 8.25 8.25 0 0 0 0-11.668.75.75 0 0 1 0-1.06Z"
            />
            <path
              d="M15.932 7.757a.75.75 0 0 1 1.061 0 6 6 0 0 1 0 8.486.75.75 0 0 1-1.06-1.061 4.5 4.5 0 0 0 0-6.364.75.75 0 0 1 0-1.06Z"
            />
          </svg>`
                            dictMain.appendChild(mainSound)
                            const mainContent = document.createElement("div")
                            mainContent.classList.add("main-content")
                            const mainWord = document.createElement("div")
                            const mainWordH1 = document.createElement("h1")
                            mainWordH1.textContent = data[0].word
                            mainWord.appendChild(mainWordH1)
                            mainContent.appendChild(mainWord)
                            dictMain.appendChild(mainContent)
                            const mainPhonetic = document.createElement("div")
                            const phonetic = document.createElement("h3")
                            phonetic.textContent = data[0].phonetics[n].text
                            mainPhonetic.appendChild(phonetic)
                            mainContent.appendChild(mainPhonetic)
                            dict.appendChild(dictMain)
                        }

                    }
                    let meaningsArr = data[m].meanings
                    const dictSpeech = document.createElement("div")
                    dictSpeech.classList.add("dict-speech")
                    for (i = 0; i < meaningsArr.length; i++) {
                        let parts = document.createElement("h4")
                        parts.textContent = meaningsArr[i].partOfSpeech
                        dictSpeech.appendChild(parts)
                        let definations = meaningsArr[i].definitions
                        const speechOl = document.createElement("ol")
                        // speechOl.attributes.add()
                        for (j = 0; j < definations.length; j++) {
                            let speechEle = document.createElement("li")
                            let eleMain = document.createElement("p")
                            eleMain.textContent = definations[j].definition
                            speechEle.appendChild(eleMain)
                            if (definations[j].example) {
                                let eleSen = document.createElement("p")
                                eleSen.textContent = `Example: ${definations[j].example}`
                                speechEle.appendChild(eleSen)
                            }
                            speechOl.appendChild(speechEle)
                        }
                        dictSpeech.appendChild(speechOl)
                        if (meaningsArr[i].synonyms.length > 0) {
                            const synAnto = document.createElement("div")
                            synAnto.classList.add("syn-anto")
                            let saP = document.createElement("p")
                            const saSpan = document.createElement("span")
                            saSpan.textContent = "Similar :"
                            const saWord = document.createElement("span")
                            let words = ""
                            let synonyms = meaningsArr[i].synonyms
                            for (j = 0; j < synonyms.length; j++) {
                                words += synonyms[j] + ", "

                            }
                            saWord.textContent = words
                            saP.appendChild(saSpan)
                            saP.appendChild(saWord)
                            synAnto.appendChild(saP)
                            dictSpeech.appendChild(synAnto)
                        }

                        if (meaningsArr[i].antonyms.length > 0) {
                            const synAnto = document.createElement("div")
                            synAnto.classList.add("syn-anto")
                            let saP = document.createElement("p")
                            const saSpan = document.createElement("span")
                            saSpan.textContent = "Opposite :"
                            const saWord = document.createElement("span")
                            let words = ""
                            let antonyms = meaningsArr[i].antonyms
                            for (j = 0; j < antonyms.length; j++) {
                                words += antonyms[j] + ", "

                            }
                            saWord.textContent = words
                            saP.appendChild(saSpan)
                            saP.appendChild(saWord)
                            synAnto.appendChild(saP)
                            dictSpeech.appendChild(synAnto)
                        }

                        dict.appendChild(dictSpeech)
                    }
                }
            }
        }
    } catch (e) {
        document.getElementById("dict").innerText = e.message
    }
}
document.getElementById("btn-sub").addEventListener("click", handelSearchButton)
document.addEventListener("keydown",(event)=>{
    if(event.key == "Enter")
        handelSearchButton()
})