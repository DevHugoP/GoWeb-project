fetch("https://fakestoreapi.com/products")
	.then((res) => res.json())
	.then((fetchedData) => homepageData(fetchedData));

const homepageData = (fetchedData) => {
	for (let data of fetchedData) {
		//on fait une boucle dans le JSON récupéré pour sortir chacun des éléments
		console.log(data);

		//recupération de la div qui contiendra le contenu
		const tableContainer = document.getElementById("tablecontainer");

		//Création des éléments du DOM nécessaires
	}
};
