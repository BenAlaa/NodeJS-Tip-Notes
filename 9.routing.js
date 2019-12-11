//more routing is in setting up with express
//adding an id to the href in a link like this
//<a href="/api/product/<%= product.id %> " this will be different for each product
//we can now have a method that parses that 

app.get('/api/product/:id', function(req, res) {
    let x = req.params.id;
    let y = req.query; //this has the querystring
    res.render();
});

/*
req.params contains route parameters (in the path portion of the URL), 
and req.query contains the URL query parameters (after the ? in the URL).

You can also use req.param(name) to look up a parameter in both places
(as well as req.body), but this method is now deprecated.
*/

createProduct = (req, res, next) => {
    console.log(req.body);
    //we should do validation first but since this is not the subject we will just use it
    //the view has to have a form and it has to be post
    productOps.create(req.body.name, req.body.price, req.body.seller).then(product => {
        console.log(product);
    });
    res.redirect('/');
}

//queryparams
//for instance populating a form for editing 
//edit/12?edit=true