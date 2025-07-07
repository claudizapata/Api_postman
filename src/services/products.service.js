//SERVICIOS está de intermediario entre el controlador y el modelo
const products = [
    {id:1, name: "Uno 1", price: 10.0, cantidad: 100, category: "libreria"},
    {id:2, name: "Dos 2", price: 15.0, cantidad: 200, category: "comestible"},
    {id:3, name: "Tres 3", price: 20.0, cantidad: 300, category: "herramientas"},
];
export const getAllProductos= () =>{
    return products;
};

export const getProductById = (id) =>{
    return products.find((item) => item.id == id);
};