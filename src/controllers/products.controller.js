//EL CONTROLADOR va a tomar datos, y los va a devolver a la petición
//Son los que gestionan las solicitudes HTTP y responden la petición 

//0000 En el CONTROLADOR tengo que llamar al SERVICIO para que me dé los datos  0000
import * as service from '../services/products.service.js';

export const getAllProducts = (req, res) => {
    res.json(service.getAllProductos());//Se usa service. porque la funcion en este módulo se llama...
    //...igual a la función en el servicio
};

export const searchProduct = async (req,res) =>{
   /*  console.log(req.query);
    res.json(products); */
    const {name} = req.query;

    const products =service.getAllProductos();

    const filtrados = products.filter((item) => 
        item.name.toLowerCase().includes(name.toLowerCase())
);
res.json(filtrados);
};

export const searchByCategoria = async (req, res) =>{
    const {id, category} = req.params;//capturo el id y la categoria ingresados en la URL x el usuario
    const products =service.getAllProductos();
    const product = products.find((item) => item.id == id && item.category == category);
    if (!product){
        res.status(404).json({error: "No existe el producto"});
        };
    res.status(201).json(product);
};

export const searchById = async (req, res) =>{
    const {id} = req.params;//capturo el id y la categoria ingresados en la URL x el usuario
    const products =service.getAllProductos();
    const product = products.find((item) => item.id == id);
    if (!product){
        res.status(404).json({error: "No existe el producto"});
        };
    res.status(201).json(product);
};

export const crearNuevoProduct = (req, res) =>{
  const {name, price} = req.body;//lo sacamos del request / voy a recibir un cuerpo en la petición, siempre que tenga un Middleware
  //con esa información voy a hacer, en este caso, uh objeto nuevo
  const products =service.getAllProductos();
  const newProduct = {//estoy creando un nuevo objeto a partir de los datos que recibo
    id: products.length + 1,//esto es algo ficticio, se apaga el servidor y se borra
    name,
    price,
  };
  products.push(newProduct);

  res.status(201).json(newProduct);
};

export const reemplazaProduct = (req, res) =>{
  const productId = parseInt(req.params.id, 10);//base 10, puede ser octal o binario, etc
  const products =service.getAllProductos();
  const productIndex = products.findIndex((item) => item.id === productId);

  if (productIndex === -1){
    return res.status(404).json({error:"Producto no encontrado"});
  };
  const {name, price} = req.body; //obtengo a través del req.body el name y price para crear el objeto a guardar

  products[productIndex] = {id: productId, name, price};//en el array id voy a pisar ese objeto de ese id con los nuevos valores que le puse  
  res.json(products[productIndex]);//respondo con ese nuevo producto para que se vea
  
};

export const deleteProduct = (req, res) =>{
  const productId = parseInt(req.params.id, 10);
  const products =service.getAllProductos();
  const productIndex = products.findIndex((item) => item.id === productId);

  if (productIndex === -1){
    return res.status(404).json({error: "El producto no existe en esta BD'"});
  };

  products.splice(productIndex, 1);//splice quita 1 elemento del array a partir del índice item
  res.status(204).send();
};