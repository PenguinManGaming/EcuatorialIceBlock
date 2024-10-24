const randomNumber = (min, max) => Math.floor(Math.random() * (max - min) + min);
const readUrl = () => {
	let args = window.location.search
	let res = null
	if (args.split("&").length > 0)
		res = {}
	args.split("&").forEach(arg => {
		let argParse = arg.split("=")
		res[argParse[0].replace("?","")] = argParse[1]
	})
	return res
}
const loadJsonContent = async (path, does, doenst) => {
	fetch(path).then((response) => response.json()).then((content) => {
		does(content)
	}).catch(error => {doenst(error);console.error(error)})
}