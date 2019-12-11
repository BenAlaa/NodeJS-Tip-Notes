// middelware function


// is function that takes a request object and either response to the client
// or passes the control to another middelware function
// like validateGenres and any route handler function (req,res)=>{}
// and also express.json()

//        Request Prossecing Pipline
// request ==> json() ==> rout() ==> respond

// we can say that express is a bunch of middelware functions
