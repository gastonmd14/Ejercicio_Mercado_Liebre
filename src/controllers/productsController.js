const { DH_CHECK_P_NOT_SAFE_PRIME } = require('constants');
const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

console.log(productsFilePath);

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render('products', {productos: products})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let detalle = products.find(function(encontrar) {
			if(encontrar.id == req.params.id) {
				return encontrar
			}
		})
		res.render('detail', {detalle: detalle})
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form')
	},
	
	// Create -  Method to store
	store: (req, res) => {
		console.log(req.body);

		let pathFile = path.join('src/data','newProducts.json')

		let nuevoProduct = fs.readFileSync(pathFile, { encoding: 'utf-8' })

		nuevoProduct = JSON.parse(nuevoProduct)

		nuevoProduct.push({
		...req.body,
		id: nuevoProduct[nuevoProduct.length - 1].id + 1,
		})

		nuevoProduct = JSON.stringify(nuevoProduct)

		fs.writeFileSync(pathFile, nuevoProduct)		

		res.send('Producto Creado')
	},

	// Update - Form to edit
	edit: (req, res) => {
		let editar = products.find(function(buscar) {
			if(buscar.id == req.params.id) {
				return buscar
			}
		})
		res.render('product-edit-form', {editar: editar})
	},
	// Update - Method to update
	update: (req, res) => {



		res.render('products', {productos: products})
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		let borrar = products.find(function(buscar) {
			if(buscar.id == req.params.id) {
				return buscar
			}
		})
		res.render('product', {borrar: borrar})
	}
};

module.exports = controller;