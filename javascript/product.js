// fonction permettant d'attendre le chargement du DOM
document.addEventListener("DOMContentLoaded", () => {
	//récupération des données de l'API
	fetch("https://fakestoreapi.com/products/1")
		.then((resp) => resp.json())
		.then((product) => productData(product));

	function productData(product) {
		//remplissage du titre en récupérant la balise de titre
		document.getElementById("productTitle").textContent = product.title;

		//récupération de la balise avec son ID
		let productImg = document.getElementById("productImg");

		//création d'une balise img avec sa classe
		let img = document.createElement("img");
		img.setAttribute("src", product.image);
		img.classList.add("imgContainer__productImg");

		//injection de la balise avec le contenu dans le DOM
		productImg.append(img);
	}
});
