// sequelize is an object relational mapping library (mysql2 needs to be installed or other sql connecting libraries)

const Sequelize = require('sequelize');



//creating a database and connecting to a database
//database connection
const sequelize = new Sequalize('database name', 'username', 'password', { dialect: 'mysql', host: 'localhost' });

module.exports = sequelize;

//model
const Product = sequelize.define('product', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: true
    },
    price: {
        type: Sequelize.DOUBLE,
        allowNull: true
    }
});

///////////////OR
const Model = Sequelize.Model;
class User extends Model {}

User.init({
    // attributes
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING
            // allowNull defaults to true
    }


}, {
    sequelize,
    modelName: 'user'
        // options
});

class Order extends Model {}
Order.init({
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true
    },
    userId: {}
});


//syncing models to the database
//creates the tables and relations, if it exists it won't create a new
sequelize.sync().then(
    result => {
        console.log(result);
    }
).catch(err => {
    console.log(err);
});

//creating a product 
///html (input = title, input = price)
function createProduct(title, price) {
    //product .create will save we can attach .then .catch
    Product.create({
        title: title,
        price: price
    });


}

function RetrieveProducts() {
    Product.findAll().then(result => {
        console.log(result);
    });

}

function Getproduct(id) {
    return Product.findById(id);
    //or
    // Product.findAll({where:{
    //     id:id
    // }});
}
//for querying see http://docs.sequelizejs.com/manual/querying.html

function updateProduct(id, newtitle, newprice) {

    Getproduct(id).then(
        product => {
            product.title = newtitle;
            product.price = newprice;
            return product.save(); //this returns a promise, instead of nesting then and catch for it
            //we can return it  return product.save();, add the second .then and the .catch will work for the two errors
        }
    ).then(result => console.log("updatedproduct")).catch(err => {
        console.log(err);
    })
}
//deleting
Product.destroy({
        where: {
            id: id
        }
    })
    //or
Product.findById(id).then(
    product => {
        return product.destroy();
    }
).then(
    result => {
        console.log(result);
    }
)

//relations 
//association (one to many relationship)
//we add the relations before syncing 
Product.belongsTo(User, {
    constrains: true,
    onDelete: 'CASCADE'
}); //user has many products

User.hasMany(Product); //this is the same as the above but the repetition won't hurt

//since this is n't the first time we synced and the tables are already created,
//we will have to force it , after forcing it we need to remove it so we don't force everytime
sequelize.sync({ force: true }).then(
    result => {
        console.log(result);
    }
).catch(err => {
    console.log(err);
});

//association 
//since we added a userid field because of the relation
//we need to populate it when creating a new product
createProudct = (req, res, next) => {

    const title = req.body.title;
    const price = req.body.price;
    const id = req.user.id;

    //notice that req.user is the sequalize object not js object
    //it contains all the method of a sequalize instance
    //it can update, destroy or any other method you have on an instance of MODEL

    //product .create will save we can attach .then .catch
    Product.create({
        title: title,
        price: price,

        userId: id
    });
};

//another way of creating a product now is using user.createProduct(), this is a method that
//sequelize generated after we made the relation
createProudct = (req, res, next) => {

    const title = req.body.title;
    const price = req.body.price;


    //notice that req.user is the sequalize object not js object
    //it contains all the method of a sequalize instance
    //it now has createProduct() in it
    req.user.createProduct({
        title: title,
        price: price
    });

    //same way we now have 
    req.user.getProduct(); //this will get only the products created by the user
    //you can add where 
    req.user.getProduct({ where: { id: 5 } }); //,notice it will return an array, try use result[0] in the then method if you're interested in the first element


};


//many to many relations

const Cart = sequelize.define('cart', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
});

const MyOrder = sequelize.define('order', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    quantity: Sequelize.INTEGER
});


//user has one cart
User.hasOne(Cart);
//the line above is enough, but this is to make sure
Cart.belongsTo(User);
//now a cart can hold many products
Cart.belongsToMany(Product, { through: MyOrder });
//a product can belong to many cars
// this relation will happen through an intermediary table, sequalize will create it for us if we didn't give it one
//but since we need to add more fields to that table, we will create it and give it to sequalize in the relation via the object {through : ModelName}
Product.belongsToMany(Cart, { through: MyOrder });
getCart = (req, res, next) => {
    //user has cart,
    //cart has products
    //products has info to show
    //each has to be in a .then()because of the data fetching

    req.user
        .getCart()
        .then(cart => {
            return cart
                .getProducts()
                .then(products => {
                    res.render('shop/cart', {
                        path: '/cart',
                        pageTitle: 'Your Cart',
                        products: products
                    });
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
};
/**
 * consider the case where users have many pictures, 
 * one of which is their profile picture. All pictures have a userId,
 *  but in addition the user model also has a profilePictureId,
 *  to be able to easily load the user's profile picture.
 * 
 User.hasMany(Picture)
User.belongsTo(Picture, { as: 'ProfilePicture', constraints: false })

user.getPictures() // gets you all pictures
user.getProfilePicture() // gets you only the profile picture

 */


//when having many to many relationship and you want to add let's say
//a product to a cart, we create
//carItem is the intermediary class,table
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    let fetchedCart;
    let newQuantity = 1;
    //getting the user's cart
    req.user
        .getCart()
        .then(cart => {
            fetchedCart = cart;
            //checking if the product already exists there
            return cart.getProducts({ where: { id: prodId } });
        })

    .then(products => {
            let product;
            //getProducts return an array
            if (products.length > 0) {
                product = products[0];
            }
            //if the product already exists in the cart, it'll have a value in the intermediary table, so we will just quantity+1
            if (product) {
                const oldQuantity = product.cartItem.quantity;
                newQuantity = oldQuantity + 1;
                return product;
            }
            //else we will return the product
            return Product.findById(prodId);
        })
        .then(product => {
            //adding it to the cart will be through the .addProduct method which takes the instance and the intermediary table
            return fetchedCart.addProduct(product, {
                through: { quantity: newQuantity }
            });
        })
        .then(() => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
};

//deleting related (connected)items, (items in intermediary tables)
postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    req.user
    //getting the cart
    //searching for product
    //product.carItem.destroy()
      .getCart()
      .then(cart => {
        return cart.getProducts({ where: { id: prodId } });
      })
      .then(products => {
        const product = products[0];
        return product.cartItem.destroy();
      })
      .then(result => {
        res.redirect('/cart');
      })
      .catch(err => console.log(err));
  };
  