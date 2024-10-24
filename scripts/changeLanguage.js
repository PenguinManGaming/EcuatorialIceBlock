const lang_pref = "lang_pref"

async function loadLanguage () {
	let idList = document.querySelectorAll('*[id]')
	dictionary = dictionaryFull[localStorage.getItem(lang_pref)]
	idList.forEach(obj => {
		let id = obj.id
		if (Object.keys(dictionary).includes(id)) {
			if (Array.isArray(dictionary[id])) {
				document.getElementById(id).innerText = dictionary[id][randomNumber(0, dictionary[id].length)]
			} else {
				document.getElementById(id).innerText = dictionary[id]
			}
		}
	})
}

window.addEventListener("DOMContentLoaded", () => {
	const changeLanguage = (lang) => localStorage.setItem("lang_pref", lang)

	const selectLang = document.getElementById("lang")

	if (localStorage.getItem(lang_pref) == null)
		localStorage.setItem(lang_pref, "en")

	selectLang.value = localStorage.getItem(lang_pref)
	loadLanguage()

	selectLang.addEventListener("change", () => {
		localStorage.setItem(lang_pref, selectLang.value)
		loadLanguage()
	})
})