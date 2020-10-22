const { DH_CHECK_P_NOT_SAFE_PRIME } = require('constants');
const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

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
		

		res.render('products', {productos: products})
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
		// Do the magic
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