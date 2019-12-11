//templating services 
//npm install ejs --save because it's part of the code
//ejs helps you create html files on the fly
//using ejs with express https://github.com/mde/ejs/wiki/Using-EJS-with-Express

//we set it up as a global variable using express app.set() see settingupwithexpress line 13

// server.js
// load the things we need
var express = require('express');
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');
//where it can find my views , i give it the folder views name
app.set('views', 'views');

//both view engine and views are global variables of node

router.get('/', async(req, res, next) => {
    const result = await Product.getAll();
    //in result we have a list of products from our database
    //the render method takes this as a key value, the key will be mapped for similar on in the page
    //and the value will replace that key
    //this could have multiple keys and values
    res.render('shop', { product: result }); //this is a express function that uses the default engine
    //and since we said that all the views exist in views folder, and the type of the engine
    //we only need to specify the name without the directory or the extension

    //static 
    res.sendFile(path.join(rootDir, 'views', 'shop.html'));
});



//ejs
// we use res.render('pagename',{key:value})
//to output something use 
// <%= nameOfTheVariable %>


//writing normal javascript between <%normal javascript%>

/*
<body>
    <main>
       
        <!--if statement-->
        <% if(products.length > 0){ %>
            <div class="grid">
            //making a for loop
                <% for (const item of products) { %>


                    <article class="card product-item">
                        <header class="card__header">
                            <h1 class="product__title">
                                <%= item.name %>
                            </h1>
                        </header>
                        <div class="card__image">
                            <img src="https://cdn.pixabay.com/photo/2016/03/31/20/51/book-1296045_960_720.png" alt="A Book">
                        </div>
                        <div class="card__content">
                            <h2 class="product__price">
                                <%= item.price %>
                            </h2>
                            <p class="product__description">
                                <%= item.seller %>
                            </p>
                        </div>
                        <div class="card__actions">
                            <button class="btn">Add to Cart</button>
                        </div>
                    </article>
                <%  }%>
            </div>
        <% } %> //closing if statement
    </main>
</body>

</html>
*/


///////////////
////////////////////////////////adding a layout with ejs using partials
//
//we take the part that we want to share add it to a separate file bla.ejs
//we go to where we want to render it and add <%- include('path to the file') %>  note use "<%-"" not "<%="" and the closing is without minus sign
// = sign means rendered as a text, - sign rendered as html


//you can write an if statement to add a class within the html tags
/* <a class="<%=  javascript code%>*/
// <li class="main-header__item"><a class="<%= path === '/' ? 'active' : '' %>" href="/">Shop</a></li>
// <li class="main-header__item"><a class="<%= path === '/admin/add-product' ? 'active' : '' %>" href="/admin/add-product">Add Product</a></li>








///////////////
////////////////////////////////adding a layout with pug
//

//if this is our layout, we can add blocks in it, places where we can extend
//for instance we can add styles block for when we add more styles to the page
//we can add content block to add more to the page
/*
layouts/main-layout.pub
<!DOCTYPE html>
html(lang="en")
    head
        meta(charset="UTF-8")
        meta(name="viewport", content="width=device-width, initial-scale=1.0")
        meta(http-equiv="X-UA-Compatible", content="ie=edge")
        title #{pageTitle}
        link(rel="stylesheet", href="/css/main.css")
        block styles
    body   
        header.main-header
            nav.main-header__nav
                ul.main-header__item-list
                    li.main-header__item
                        a(href="/", class=(path === '/' ? 'active' : '')) Shop
                    li.main-header__item
                        a(href="/admin/add-product", class=(path === '/admin/add-product' ? 'active' : '')) Add Product
        block content
*/

/*
extends layouts/main-layout.pub
block styles 
    add what you want
block content
    add what you want 
*/