import express from 'express';
import cors from "cors";
//Comillas dobles en la clave es un JSON (es un archivo de texto)
//Sin comillas dobles en la clave es un objeto de JS
//El MODELO es el que maneja los DATOS
const app = express();

const products = [
    {id:1, name: "Uno 1", price: 10.0, cantidad: 100, category: "libreria"},
    {id:2, name: "Dos 2", price: 15.0, cantidad: 200, category: "comestible"},
    {id:3, name: "Tres 3", price: 20.0, cantidad: 300, category: "herramientas"},
];

//Uso de next
/* app.use((req, res, next) =>{
  res.json({message: "En mantenimiento"});
}); */

app.use(cors());
app.use(express.json());//siempre antes de todas las rutas, necesario para hacer un POST
 
app.get("/", (req, res) =>{
    res.send("API Rest en Node.js");
    res.json({message: "API Rest en Node.js"});//el json sale con el mensaje formateado 
});

app.get("/products", (req, res) =>{
    res.json(products);
});

//Los QUERY no están definidos en la RUTA, se pasan extra
app.get("/products/search", (req,res) =>{
   /*  console.log(req.query);
    res.json(products); */
    const {name} = req.query;

    const filtrados = products.filter((item) => 
        item.name.toLowerCase().includes(name.toLowerCase())
);
res.json(filtrados);
});

//Los PARAMS están definidos en la RUTA
app.get("/products/:id/:category", (req, res) =>{
    const {id, category} = req.params;//capturo el id y la categoria ingresados en la URL x el usuario
    const product = products.find((item) => item.id == id && item.category == category);
    if (!product){
        res.status(404).json({error: "No existe el producto"});
        };
    res.json(product);
});
app.get("/products/:id", (req, res) =>{
    const {id} = req.params;//capturo el id y la categoria ingresados en la URL x el usuario
    const product = products.find((item) => item.id == id);
    if (!product){
        res.status(404).json({error: "No existe el producto"});
        };
    res.json(product);
});

/* Rutina para probar el post en POSTMAN
app.post("/products", (req,res) => {
  console.log(req.body);//recibo parámetros a través del cuerpo de la petición, NO de params ni de querys
  res.send("POST");//No se trabaja en la URL... Hay que ir a Postman al body(cuerpo de la petición)
}); */
//Rutina para crear un objeto JSON en POSTMAN
app.post("/products",(req, res) =>{
  const {name, price} = req.body;//lo sacamos del request / voy a recibir un cuerpo en la petición, siempre que tenga un Middleware
  //con esa información voy a hacer, en este caso, uh objeto nuevo
  const newProduct = {//estoy creando un nuevo objeto a partir de los datos que recibo
    id: products.length + 1,//esto es algo ficticio, se apaga el servidor y se borra
    name,
    price,
  };
  products.push(newProduct);

  res.status(201).json(newProduct);
});

app.put("/products/:id", (req, res) =>{
  const productId = parseInt(req.params.id, 10);//base 10, puede ser octal o binario, etc
  const productIndex = products.findIndex((item) => item.id === productId);

  if (productIndex === -1){
    return res.status(404).json({error:"Producto no encontrado"});
  };
  const {name, price} = req.body; //obtengo a través del req.body el name y price para crear el objeto a guardar

  products[productIndex] = {id: productId, name, price};//en el array id voy a pisar ese objeto de ese id con los nuevos valores que le puse  
  res.json(products[productIndex]);//respondo con ese nuevo producto para que se vea
  
});

app.delete("/products/:id", (req, res) =>{
  const productId = parseInt(req.params.id, 10);
  const productIndex = products.findIndex((item) => item.id === productId);

  if (productIndex === -1){
    return res.status(404).json({error: "El producto no existe en esta BD'"});
  };

  products.splice(productIndex, 1);//splice quita 1 elemento del array a partir del índice item
  res.status(204).send();
});

//ERROR HANDLE (404)
//Para mandar un error desde el Middleware, lo anterior fueron errores lanzados por mi HTML controlados x Express
app.use((req, res, next) =>{
  res.status(404).json({error: "Not Found"});
});

//Defino el puerto que recibirá las peticiones
const PORT = 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));


//000000000000000000000000000000000000000000000000000000000000000000000000000000
/* app.get('/users/:id', (req, res) => {
      const userId = req.params.id; // Get the ID from the URL parameters
      // In a real application, you would query a database here
      const users = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' }
      ];
      const foundUser = users.find(item => item.id == userId); // Find the user with the matching ID
      if (foundUser) {
        res.json(foundUser);
      } else {
        res.status(404).send('User not found');
      }
    }); */
//0000000000000000000000000000000000000000000000000000000000000000000000000000000
