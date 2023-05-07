

let urlProduct = window.location.href; // recupération de l'url contenant notre id de produit
const splitUrl = urlProduct.split("="); // on coupe la chaine de caractères sur le motif =
idProduct = splitUrl[1]; // on associe la deuxième partie de la chaine de caractère à l'idProduct

// fonction permettant d'attendre le chargement du DOM
document.addEventListener("DOMContentLoaded", () => {
	//récupération des données de l'API
	fetch("https://fakestoreapi.com/products/" + idProduct)
		.then((resp) => resp.json())
		.then((product) => productData(product));

	function productData(product) {
		localStorage.setItem("product", JSON.stringify(product));

		let parsedProduct = JSON.parse(localStorage.getItem("product"));
		//remplissage du titre en récupérant la balise de titre
		document.getElementById("productTitle").textContent = parsedProduct.title;

		//CREATION DE LA BALISE img
		//récupération de la balise avec son ID
		let productImg = document.getElementById("productImg");
		//création d'une balise img avec sa classe et son attribut
		let img = document.createElement("img");
		img.setAttribute("src", parsedProduct.image);
		img.setAttribute("alt", "image d'un produit du site voir description");
		img.classList.add("imgContainer__productImg");
		//injection de la balise avec le contenu dans le DOM
		productImg.append(img);

		//balise p de descrition du produit
		document.getElementById("descriptionText").textContent = parsedProduct.description;

		//BALISE p CATEGORY.
		// si la category est men's product alors la couleur de la pastille sera orange sinon bleu

		document.getElementById("categoryText").textContent = parsedProduct.category;
		if (parsedProduct.category === "men's clothing") {
			document.getElementById("categoryText").style.backgroundColor = "#ffa846";
		} else {
			document.getElementById("categoryText").style.backgroundColor = "#32b436";
		}

		//Balise input Prix du produit
		// on calcule le prix de la TVA du produit avant modification
		let price = parseFloat((document.getElementById("priceInput").value = parsedProduct.price));
		let addVat = price + (price / 100) * 20;
		document.getElementById("priceVat").textContent =
			"Price (including VAT) : " + addVat + " €";

		// création d'une variable qui sera modifiée par l'utilisateur
		let newPrice = parseFloat(document.getElementById("priceInput").value);

		// On recalcule le prix avec la TVA à chaque input de l'utilisateur
		document.getElementById("priceInput").addEventListener("keyup", () => {
			// conversion de l'input de string à number
			newPrice = parseFloat(document.getElementById("priceInput").value);

			// si le user input est vide on remplace le NaN par 0
			if (isNaN(newPrice)) {
				newPrice = 0;
			}

			// ajout du nouveau prix recalculé dynamiquement dand la balise appropriée
			let newVatPrice = newPrice + (newPrice / 100) * 20;
			document.getElementById("priceVat").textContent =
				"Price (including VAT) : " + newVatPrice.toFixed(2) + " €";
		});

		document.getElementById("uploadBtn").addEventListener("click", () => {
			// ici on vérifie que le prix à bien été modifié par le user, qu'il est différent du prix de base et de 0 et si son Datatype = number .
			if (!isNaN(newPrice) && newPrice != price && newPrice != 0) {
				// Envoi de la modification du prix si celui si a été modifié (les modifications ne sont pas réelement  enregistrées dans la BDD )
				fetch("https://fakestoreapi.com/products/1", {
					method: "PUT",
					body: JSON.stringify({
						price: newPrice
					})
				})
					.then((res) => res.json())
					.then((json) => console.log(json));
				alert(" Prix modifié ");
			} else {
				alert("vous devez d'abord modifier le prix");
			}
		});
	}
});
