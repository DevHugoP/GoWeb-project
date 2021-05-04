window.onhashchange = localStorage.clear();

fetch("https://fakestoreapi.com/products?limit=7")
	.then((res) => res.json())
	.then((fetchedData) => homepageData(fetchedData));

const homepageData = (fetchedData) => {
	for (let data of fetchedData) {
		//on fait une boucle dans le JSON récupéré pour sortir chacun des éléments

		//recupération de la div qui contiendra le contenu
		let tbody = document.getElementById("tbody");
		//Création des éléments du DOM nécessaires
		let productLine = document.createElement("tr");
		let productName = document.createElement("td");
		productName.className = "productName";
		let productCategoryContainer = document.createElement("td");
		let productCategory = document.createElement("p");
		let productPrice = document.createElement("td");
		let productPriceVat = document.createElement("td");
		productPriceVat.className = "productPriceVat";

		// Ajout des classes et inserer les data
		productLine.className = "rowContainer";
		productLine.setAttribute(
			"data-href",
			"http://127.0.0.1:5500/pages/product.html?id=" + data.id
		);
		productName.textContent = data.title;
		productCategory.textContent = data.category;

		// On ajoute une classe en fonction de la category
		if (productCategory.textContent === "men's clothing") {
			productCategory.className = "orangeTag";
		} else {
			productCategory.className = "greenTag";
		}

		productPrice.textContent = data.price + "€";
		let modifiedPrice = data.price + (data.price / 100) * 20;
		productPriceVat.textContent = modifiedPrice.toFixed(2) + "€";

		//insertion des données dans les balises
		productCategoryContainer.append(productCategory);
		productLine.append(productName, productCategoryContainer, productPrice, productPriceVat);
		tbody.append(productLine);
	}

	const rows = document.querySelectorAll("tr[data-href]");
	console.log(rows);

	rows.forEach((row) => {
		row.addEventListener("click", () => {
			window.location.href = row.dataset.href;
		});
	});
};
