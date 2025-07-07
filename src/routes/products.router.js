import { Router } from "express";

const router = Router(); //es una instancia de ese router
                        //Ahora todo se maneja con el Router,por lo tanto hay que reemplazar todos los app.

//importo la función del controlador
import { getAllProducts, searchProduct, searchByCategoria, searchById, crearNuevoProduct, reemplazaProduct, deleteProduct } from "../controllers/products.controller.js";

router.get("/products", getAllProducts);//Y a esa función la importo acá
//Los QUERY no están definidos en la RUTA, se pasan extra
router.get("/products/search", searchProduct );
//Los PARAMS están definidos en la RUTA
router.get("/products/:id/:category", searchByCategoria);
router.get("/products/:id", searchById);

/* Rutina para probar el post en POSTMAN
router.post("/products", (req,res) => {
  console.log(req.body);//recibo parámetros a través del cuerpo de la petición, NO de params ni de querys
  res.send("POST");//No se trabaja en la URL... Hay que ir a Postman al body(cuerpo de la petición)
}); */
//Rutina para crear un objeto JSON en POSTMAN
router.post("/products",crearNuevoProduct);

router.put("/products/:id", reemplazaProduct);

router.delete("/products/:id", deleteProduct);

export default router; //por si afuera lo quiero llamar de otra forma

export const Hola = () => {//es una importación nombrada, si la importo desde afuer, siempre se va a llamar Hola

}