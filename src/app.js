import express from 'express'
import fs from 'fs'

const app = express();
const PORT = 8080;
const filePath = './productos.json'; // 

app.get('/', async (request, response) => {
  console.log('¡Solicitud recibida!');
  try {
    const data = await fs.promises.readFile(filePath, 'utf-8');
    const products = JSON.parse(data);
    response.send({ products });
  } catch (error) {
    console.log('Error al leer el archivo:', error);
    response.send({ error: 'Error al leer el archivo' });
  }
});

app.get('/products', async (request, response) => {
    const limit = request.query.limit;
    try {
      const data = await fs.promises.readFile(filePath, 'utf-8');
      const products = JSON.parse(data);
      if (!limit) {
        response.send({ products });
      } else {
        const productsLimit = products.slice(0, limit);
        response.send({ products: productsLimit });
      }
    } catch (error) {
      console.log('Error al leer el archivo:', error);
      response.send({ error: 'Error al leer el archivo' });
    }
  });
  
  app.get('/products/:id', async (request, response) => {
    const id = request.params.id;
    try {
      const data = await fs.promises.readFile(filePath, 'utf-8');
      const products = JSON.parse(data);
      const product = products.find((product) => product.id == id);
      if (product) {
        response.send(product);
      } else {
        response.send({ error: 'Producto no encontrado' });
      }
    } catch (error) {
      console.log('Error al leer el archivo:', error);
      response.send({ error: 'Error al leer el archivo' });
    }
  });

app.listen(PORT, () => console.log('server up'))
