// fonction permettant d'attendre le chargement du DOM
document.addEventListener("DOMContentLoaded", () => {
	//récupération des données de l'API
	fetch("https://fakestoreapi.com/products/2")
		.then((resp) => resp.json())
		.then((product) => productData(product));

	function productData(product) {
		console.log(product.description);
		console.log(product);

		//remplissage du titre en récupérant la balise de titre
		document.getElementById("productTitle").textContent = product.title;

		//CREATION DE LA BALISE img
		//récupération de la balise avec son ID
		let productImg = document.getElementById("productImg");
		//création d'une balise img avec sa classe et attribut
		let img = document.createElement("img");
		img.setAttribute("src", product.image);
		img.classList.add("imgContainer__productImg");
		//injection de la balise avec le contenu dans le DOM
		productImg.append(img);

		//balise p de descrition du produit
		document.getElementById("descriptionText").textContent = product.description;

		//BALISE p CATEGORY.

		document.getElementById("categoryText").textContent = product.category;
		if (product.category === "men's clothing") {
			document.getElementById("categoryText").style.backgroundColor = "#ffa846";
		} else {
			document.getElementById("categoryText").style.backgroundColor = "#32b436";
		}

		//Balise input Prix du produit
	}
});
