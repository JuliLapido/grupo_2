let db = require('../database/models/index')
const {resolve} = require('path')
const {unlinkSync} = require('fs')

let ProductsController = {

create: function (req, res) {
    db.categories.findAll()
        .then(function(categories){
            return res.render("products/create", {categories: categories});
        })
},
save: function(req,res) {
    db.Products.create({
        name:req.body.name,
        price:req.body.price,
        description:req.body.description,
        image:req.files && req.files.length? req.body.image = req.files[0].filename : req.body.image = 'default.png',
        category_id:req.body.category
    })
    res.redirect("/products")
},
show: async function(req,res){


    /* index: (req, res) =>{
        let products = all();
        if(req.query.category){
            products = products.filter(e => e.category == req.query.category);
            return res.render('products/products',{products});
        }
        return res.render('products/products',{products});
    },  
    */

    /* contenido que no puedo comentar del render products.ejs
    contenido que iria dentro del select de la linea 13
     <% for ( let i = 0; i < categories.length; i++ ) { %>
                <option value=" <%=categories[i].id%> ">
                    <%=categories[i].name%> 
                </option>
            <% } %>
    */ //esto esta listo

    /* let pedidoCategoria = db.categories.findAll({
        attributes:['name','description','id']});
    let productos =  */
    
    let productos = await db.Products.findAll()
    let categories = await db.categories.findAll()
    let query = 0

    if(req.query.category){
        productos = productos.filter(e => e.category_id == req.query.category);
        query = req.query.category
    }

    /* Promise.all([productos, pedidoCategoria])
        .then(function(categoria,producto){
            producto.filter(e => e.category == req.query.category)
            return res.render("products/products", { categories: categoria,productos:producto});
        }) */

   /*  Promise.all([productos, pedidoCategoria]) */
   /*  .then(function(producto){ */
        return res.render("products/products" , {productos,categories,query})
  /*   }) */
},
detail: function(req,res){
    db.Products.findByPk(req.params.id,{
        attributes:['name','description','price','image','id']
    })
    .then(function(producto){
        res.render("products/detail",{product:producto})
     })
},
edit:function(req,res){
   let pedidoProducto = db.Products.findByPk(req.params.id,{
        attributes:['id','name','description','price','image','category_id']
    });
    let pedidoCategoria = db.categories.findAll({
        attributes:['name','description','id']});
    
        Promise.all([pedidoProducto, pedidoCategoria])
        .then(function([producto,categories]){
        res.render("products/edit",{product:producto,categories:categories})
    })
},
update:function(req,res){
    db.Products.update({
        name:req.body.name,
        price:req.body.price,
        description:req.body.description,
        image:req.files && req.files.length > 0 ? req.body.image = req.files[0].filename : req.body.oldImage ,
        category_id:req.body.category
    },
    {
        where:{
            id : req.params.id
        }
    })
    res.redirect('/products/detalle/' + req.params.id)
},
remove:function(req,res){
    if(req.body.image != 'default.png'){
        let file = resolve(__dirname,'..','..','public','images','Uploads','products',req.body.image)
        unlinkSync(file)
    }
    db.Products.destroy({
        where: {
            id: req.params.id
        }
    })
    res.redirect('/products')
}
}

module.exports = ProductsController;