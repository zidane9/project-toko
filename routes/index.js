'use strict'

var express = require('express');
var router = express.Router();
let models = require('../models');
let moment = require('moment');
let cart = [];
let totalHarga = 0;

/* GET home page. */
router.get('/', function(req, res, next) {
    models.Product.findAll({order: '"id"'})
      .then((instances)=>{
        let array = [];
        instances.forEach((instance)=>{
          console.log(instance.img_url);
          let temp = {
            id: instance.id,
            nama: instance.nama,
            harga: currencyFormatRp(instance.harga),
            berat: currencyFormat(instance.berat),
            img_url: instance.img_url
          };
          array.push(temp);
        })
        res.render('index', { title: 'Ridho and Darren Online Shop' , productsText: array,
                              cartText: cart, totalHargaText: currencyFormatRp(totalHarga)});
      })
      .catch((err)=>{
        res.send(err.message);
      })

});

router.post('/', function(req, res, next) {
  if(cart.length > 0){
    res.redirect('/checkout');
  }

});

router.get('/addCart/:id', function(req, res, next) {
  for(let i=0;i<cart.length;i++){
    if(cart[i].id == req.params.id){
      cart[i].quantity += 1;
      totalHarga += cart[i].harga;
      res.redirect('/');
      return;
    }
  }
  models.Product.findById(req.params.id)
    .then((instance)=>{
      let temp = {
        id: instance.id,
        nama: instance.nama,
        harga: instance.harga,
        berat: instance.berat,
        hargaFormat: currencyFormatRp(instance.harga),
        quantity: 1
      }
      totalHarga += temp.harga;
      cart.push(temp);
      res.redirect('/');
      // res.render('index', { title: 'Ridho and Darren Online Shop' , productsText: array,
      //                       cartText: cart});
    })
    .catch((err)=>{
      res.send(err.message);
    })
});

router.get('/removeCart/:id', function(req, res, next) {
  for(let i=0;i<cart.length;i++){
    if(cart[i].id == req.params.id){
      totalHarga -= cart[i].harga * cart[i].quantity;
      cart.splice(i,1);
      res.redirect('/');
      return;
    }
  }
});

router.get('/checkout', function(req, res, next) {
  models.Charge.findAll({order: '"kota"'})
    .then((instances)=>{
      let array = [];
      instances.forEach((instance)=>{
        let temp = {
          id: instance.id,
          kota: instance.kota
        };
        array.push(temp);
      })
      res.render('checkout', { title: 'Ridho and Darren Online Shop' , ongkirText:array,
                            cartText: cart, totalHargaText: currencyFormatRp(totalHarga)});
    })
    .catch((err)=>{
      res.send(err.message);
    })

});

router.post('/checkout', function(req, res, next) {
  let totalBerat = 0;
  for(let i=0;i<cart.length;i++){
    totalBerat += cart[i].berat;
  }

  models.Charge.findById(req.body.kotaNew)
    .then((charge)=>{
      let totalOngkir = Math.ceil(totalBerat/1000) * charge.biaya;

      let t = {
        nama: req.body.namaNew,
        email: req.body.emailNew,
        alamat: req.body.alamatNew,
        kota: charge.kota,
        telepon: req.body.teleponNew,
        note: req.body.noteNew,
        ongkir: charge.biaya,
        total_berat: totalBerat,
        total_harga: totalHarga,
        is_paid: false
      };
      models.Transaction.create(t)
        .then((trans)=>{
          let promises = [];
          for(let i=0;i<cart.length;i++){
            let pt = {
              transactionId: trans.id,
              productId: cart[i].id,
              quantity: cart[i].quantity,
              harga: cart[i].harga
            }
            let promise = models.ProductTransaction.create(pt);
            promises.push(promise);
          }
          Promise.all(promises).then(function(data){
            let totalExOngkir = totalHarga;
            let total = totalOngkir + totalExOngkir;
            totalHarga = 0;
            cart = [];
            res.render('checkout-success', { title: 'Checkout' , namaText: trans.nama,
                                  idText: trans.id, totalHargaText: currencyFormatRp(totalExOngkir),
                                beratText: currencyFormat(totalBerat), ongkirText: currencyFormatRp(charge.biaya),
                              totalText:currencyFormatRp(total)});
          })
        })
    })
});

router.get('/noresi', function(req, res, next) {
  models.Transaction.findAll({order: '"createdAt" DESC'})
    .then((instances)=>{
      let array = [];
      instances.forEach((instance)=>{
        let temp = {
          id: instance.id,
          nama: instance.nama,
          no_resi: instance.no_resi,
          tanggal: formatDate(instance.createdAt)
        };
        array.push(temp);
      })
      res.render('check-resi', { title: 'List No Resi' , transText:array,
                            });
    })
    .catch((err)=>{
      res.send(err.message);
    })

});

function currencyFormat(value){
  return value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
}

function formatDate(value){
  return moment(value).format('DD/MM/YYYY');
}

module.exports = router;
