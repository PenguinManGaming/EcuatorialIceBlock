const tags = ["h1", "h2", "h3", "h4", "h5", "a", "b", "p", "option", "span", "td", "th"]

const runeButton = document.getElementById("EnableRunes")

function convertToRunes (txt) {
	return txt.replaceAll("ng", "ᛝ")
	.replaceAll("ae", "ᚫ")
	.replaceAll("ea", "ᛠ")
	.replaceAll("ia", "ᛡ")
	.replaceAll("oe", "ᛟ")
	.replaceAll("eo", "ᛇ")
	.replaceAll("th", "ᚦ")
	.replaceAll("f","ᚠ")
	.replaceAll("u","ᚢ")
	.replaceAll("o","ᚩ")
	.replaceAll("ō","ᚩ")
	.replaceAll("rr","ᚱ")
	.replaceAll("r","ᚱ")
	.replaceAll("cc","ᚳ")
	.replaceAll("c","ᚳ")
	.replaceAll("k","ᚳ")
	.replaceAll("q","ᚳ")
	.replaceAll("g","ᚷ")
	.replaceAll("w","ᚹ")
	.replaceAll("h","ᚻ")
	.replaceAll("n","ᚾ")
	.replaceAll("i","ᛁ")
	.replaceAll("j","ᛄ")
	.replaceAll("p","ᛈ")
	.replaceAll("x","ᛉ")
	.replaceAll("s","ᛋ")
	.replaceAll("z","ᛋ")
	.replaceAll("t","ᛏ")
	.replaceAll("b","ᛒ")
	.replaceAll("v","ᛒ")
	.replaceAll("e","ᛖ")
	.replaceAll("m","ᛗ")
	.replaceAll("l","ᛚ")
	.replaceAll("d","ᛞ")
	.replaceAll("a","ᚪ")
	.replaceAll("ñ","ᚾᚣ")
	.replaceAll("ā","ᚪ")
	.replaceAll("y","ᚣ")
}

function toRunes (e) {
	if (e.childNodes.length <= 1) {
		e.dataset.alt_text = e.textContent
		e.textContent = convertToRunes(e.textContent.toLowerCase())
	} else {
		e.dataset.alt_text = e.innerHTML
		e.childNodes.forEach((element) => {
			if (element.id == undefined) {
				e.innerHTML = e.innerHTML.replaceAll(element.textContent, convertToRunes(element.textContent.toLowerCase()))
			} else {
				element.dataset.alt_text = element.textContent
			}
		})
	}
}

const deRunes = (e) => {
	if (e.childNodes.length <= 1) {
		if (e.dataset.alt_text != null)
			e.textContent = e.dataset.alt_text
	} else {
		if (e.dataset.alt_text != null)
			e.innerHTML = e.dataset.alt_text
	}
}

function runefy() {
	if (localStorage.getItem("eng_rune") == "0" || localStorage.getItem("eng_rune") == null) {
		localStorage.setItem("eng_rune", "1")
		runeButton.textContent = "ᛞᛁᛋᛒᛚᛖ ᚱᚢᚾᛖᛋ"
		document.querySelectorAll("pre").forEach((e) => {toRunes(e)})
		tags.forEach((tag) => {
			document.querySelectorAll(tag).forEach((e) => {toRunes(e)})
		})
	} else {
		localStorage.setItem("eng_rune", "0")
		runeButton.textContent = "Enable runes"
		document.querySelectorAll("pre").forEach((e) => {deRunes(e)})
		tags.forEach((tag) => {
			document.querySelectorAll(tag).forEach((e) => {deRunes(e)})
		})
	}
}

function displayButton () {
	runeButton.addEventListener("click", () => {
		runefy()
	})
	if (localStorage.getItem("lang_pref") == "en") {
		runeButton.style.display = "inline-block"
		if (localStorage.getItem("eng_rune") == "0" || localStorage.getItem("eng_rune") == null) {
			runeButton.textContent = "Enable runes"
		} else {
			runeButton.textContent = "ᛞᛁᛋᛒᛚᛖ ᚱᚢᚾᛖᛋ"
			tags.forEach((tag) => {
				document.querySelectorAll(tag).forEach((e) => {toRunes(e)})
			})
		}
	} else {
		localStorage.setItem("eng_rune", "0")
		runeButton.style.display = "none"
		tags.forEach((tag) => {
			document.querySelectorAll(tag).forEach((e) => {deRunes(e)})
		})
	}
}

window.addEventListener("DOMContentLoaded", () => {
	if (localStorage.getItem("lang_pref") == "en") {
		runeButton.style.display = "inline-block"
	} else {
		runeButton.style.display = "none"
	}
	const selectLang = document.getElementById("lang")
	if (selectLang != undefined)
		selectLang.addEventListener("change", displayButton)
	if (localStorage.getItem("eng_rune") == "1")
		tags.forEach((tag) => {document.querySelectorAll(tag).forEach((e) => {toRunes(e)})})
	displayButton()
})