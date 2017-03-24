"use strict"

var express = require('express');
var router = express.Router();
let models = require('../models');
let moment = require('moment');

/* GET admin page. */
router.get('/', function(req, res, next) {
  res.render('admin', { title: 'Admin'});
});

// --Ongkir
router.get('/ongkir/new', function(req, res, next) {
  res.render('admin-ongkir-create', {title: 'Add Ongkir'});
});

router.post('/ongkir/new', function(req, res, next) {
  let ongkir = {
    kota: req.body.kotaNew,
    biaya: req.body.biayaNew
  }
  models.Charge.create(ongkir)
    .then(()=>{
      res.redirect('/admin/ongkir')
    })
    .catch((err)=>{
      res.send(err.message);
    })
});

router.get('/ongkir', function(req, res, next) {
  models.Charge.findAll({order: '"id"'})
    .then((instances)=>{
      let array = [];
      instances.forEach((instance)=>{
        let temp = {
          id: instance.id,
          kota: instance.kota,
          biaya: currencyFormat(instance.biaya)
        };
        array.push(temp);
      })
      res.render('admin-ongkir', {title: 'List Ongkir', ongkirText: array});
    })
    .catch((err)=>{
      res.send(err.message);
    })
});

router.get('/ongkir/edit/:id', function(req, res, next) {
  models.Charge.findById(req.params.id)
    .then((instance)=>{

      res.render('admin-ongkir-edit', {title: 'Edit Ongkir', kotaText: instance.kota,
                                        idText:instance.id, biayaText: instance.biaya});
    })
    .catch((err)=>{
      res.send(err.message);
    })
});

router.post('/ongkir/edit/:id', function(req, res, next) {
  models.Charge.update({
    kota: req.body.kotaNew,
    biaya: req.body.biayaNew
  }, {
    where: {id: req.body.idNew}
  })
    .then(()=>{
      res.redirect('/admin/ongkir');
    })
    .catch((err)=>{
      res.send(err.message);
    })
});

router.get('/ongkir/delete/:id', function(req, res, next) {
  models.Charge.destroy({
    where: {
        id: req.params.id
    }
  }).then(()=>{
    res.redirect('/admin/ongkir');
  })
    .catch((err)=>{
      res.send(err.message);
    })
});

// --Product

router.get('/product/new', function(req, res, next) {
  res.render('admin-product-create', {title: 'Add Product'});
});

router.post('/product/new', function(req, res, next) {
  let product = {
    nama: req.body.namaNew,
    harga: req.body.hargaNew,
      berat: req.body.beratNew,
      img_url: req.body.imgNew
  }
  models.Product.create(product)
    .then(()=>{
      res.redirect('/admin/products')
    })
    .catch((err)=>{
      res.send(err.message);
    })
});

router.get('/products', function(req, res, next) {
  models.Product.findAll({order: '"id"'})
    .then((instances)=>{
      let array = [];
      instances.forEach((instance)=>{
        console.log(instance.img_url);
        let temp = {
          id: instance.id,
          nama: instance.nama,
          harga: currencyFormat(instance.harga),
          berat: currencyFormat(instance.berat),
          img_url: instance.img_url
        };
        array.push(temp);
      })
      res.render('admin-products', {title: 'List Products', productsText: array});
    })
    .catch((err)=>{
      res.send(err.message);
    })
});

router.get('/product/edit/:id', function(req, res, next) {
  models.Product.findById(req.params.id)
    .then((instance)=>{

      res.render('admin-product-edit', {title: 'Edit Product', namaText: instance.nama,
                                        idText:instance.id, hargaText: instance.harga,
                                        beratText: instance.berat, imgText: instance.img_url});
    })
    .catch((err)=>{
      res.send(err.message);
    })
});

router.post('/product/edit/:id', function(req, res, next) {
  models.Product.update({
    nama: req.body.namaNew,
    harga: req.body.hargaNew,
      berat: req.body.beratNew,
      img_url: req.body.imgNew
  }, {
    where: {id: req.body.idNew}
  })
    .then(()=>{
      res.redirect('/admin/products');
    })
    .catch((err)=>{
      res.send(err.message);
    })
});

router.get('/product/delete/:id', function(req, res, next) {
  models.Product.destroy({
    where: {
        id: req.params.id
    }
  }).then(()=>{
    res.redirect('/admin/products');
  })
    .catch((err)=>{
      res.send(err.message);
    })
});

//--Transaction
router.get('/transaction', function(req, res, next) {
  models.Transaction.findAll({order: '"id" DESC'})
    .then((instances)=>{
      let array = [];
      instances.forEach((instance)=>{
        let temp = {
          id: instance.id,
            nama: instance.nama,
              email: instance.email,
        kota: instance.kota,
                telepon: instance.telepon,
                ongkir: currencyFormat(instance.ongkir),
                total_berat: instance.total_berat,
                total_harga: instance.total_harga,
                no_resi: instance.no_resi,
          totalBeratFormat: currencyFormat(instance.total_berat),
          totalHargaFormat: currencyFormat(instance.total_harga),
          createdAt: formatDate(instance.createdAt)
        };
        array.push(temp);
      })
      res.render('admin-transactions', {title: 'List Transactions', transText: array});
    })
    .catch((err)=>{
      res.send(err.message);
    })
});

router.get('/transaction/resi/:id', function(req, res, next) {
  models.Transaction.findById(req.params.id)
    .then((instance)=>{
      let t = {
        id: instance.id,
          nama: instance.nama,
            email: instance.email,
            alamat: instance.alamat,
      kota: instance.kota,
              telepon: instance.telepon,
              note: instance.note,
              ongkir: currencyFormat(instance.ongkir),
              total_berat: instance.total_berat,
              total_harga: instance.total_harga,
              no_resi: instance.no_resi,
        totalBeratFormat: currencyFormat(instance.total_berat),
        totalHargaFormat: currencyFormat(instance.total_harga)
      }
      res.render('admin-transaction-resi', {title: 'No Resi Input', transText: t});
    })
    .catch((err)=>{
      res.send(err.message);
    })
});

router.post('/transaction/resi/:id', function(req, res, next) {
  models.Transaction.update({
    no_resi: req.body.resiNew,
    is_paid: true
  }, {
    where: {id: req.params.id}
  })
  .then(()=>{
    res.redirect('/admin/transaction');
  })
  .catch((err)=>{
    res.send(err.message);
  })
});

router.get('/transaction/edit/:id', function(req, res, next) {
  models.Transaction.findById(req.params.id)
    .then((instance)=>{
      let t = {
        id: instance.id,
          nama: instance.nama,
            email: instance.email,
            alamat: instance.alamat,
      kota: instance.kota,
              telepon: instance.telepon,
              note: instance.note,
              ongkir: currencyFormat(instance.ongkir),
              total_berat: instance.total_berat,
              total_harga: instance.total_harga,
              no_resi: instance.no_resi,
        totalBeratFormat: currencyFormat(instance.total_berat),
        totalHargaFormat: currencyFormat(instance.total_harga)
      }
      res.render('admin-transaction-edit', {title: 'No Resi Input', transText: t});
    })
    .catch((err)=>{
      res.send(err.message);
    })
});

router.post('/transaction/edit/:id', function(req, res, next) {
  models.Transaction.update({
    no_resi: req.body.resiNew,
    note: req.body.noteNew
  }, {
    where: {id: req.params.id}
  })
  .then(()=>{
    res.redirect('/admin/transaction');
  })
  .catch((err)=>{
    res.send(err.message);
  })
});

router.get('/transaction/view/:id', function(req, res, next) {
  models.Transaction.findById(req.params.id)
  .then((trans)=>{
    trans.getProductTransactions({
      include: [{
        model: models.Product
    }]
    })
      .then((pt)=>{
      let cart = [];
      let totalBerat = 0;
        pt.forEach((x)=>{
          let temp = {
            quantity: x.quantity,
            nama: x.Product.nama,
            id: x.ProductId,
            berat: currencyFormat(x.Product.berat),
            harga: currencyFormat(x.harga)
          };
          totalBerat += x.Product.berat;
          cart.push(temp);
        });
        let totalOngkir = Math.ceil(totalBerat/1000) * trans.ongkir;
        let totalAll = trans.total_harga + totalOngkir;
        res.render('admin-transaction-view', {title: 'View Transaction', transText: trans,
                    cartText: cart, totalHargaText:currencyFormat(trans.total_harga),
                  totalOngkirText: currencyFormat(totalOngkir),
                totalAllText: currencyFormat(totalAll), totalBeratText: currencyFormat(totalBerat) });
      })
      .catch((err)=>{
        res.send(err.message);
      })
  })
});

function currencyFormat(value){
  return value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
}

function formatDate(value){
  return moment(value).format('DD/MM/YYYY');
}

module.exports = router;
