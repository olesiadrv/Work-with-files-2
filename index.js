const fs = require('fs');
const file = 'list.csv';

// adding products to the list
 function addProducts(product){
    fs.appendFileSync(file, `${product.id},${product.name},${product.price},${product.shop}\n`);
    console.log('the product has been added to the list');
 }
 addProducts({id:'1', name: ' product1', price: ' 100', shop: ' shop1'});
 addProducts({id:'2', name: ' product2', price: ' 400', shop: ' shop2'});
 addProducts({id:'3', name: ' product3', price: ' 200', shop: ' shop3'});


// obtaining data about the product by id
 function findProduct(id, file) {
    const fileData = fs.readFileSync(file, 'utf8');
    const products = fileData.split('\n');
    for (const product of products) {
      const [productId, name, price, shop] = product.split(',');
      if (productId === id.toString()) {
        return { id: productId, name, price, shop };
      } 
    }
    return null;
  }
  
  console.log(findProduct(2, file));


// delete of the product by id
  function deleteProduct(id) {
    const fileData = fs.readFileSync(file, 'utf8');
    const products = fileData.split('\n');
    let updatedProducts = '';
    for (const product of products) {
      const [productId] = product.split(',');
      if (productId !== id) {
        updatedProducts += `${product}\n`;
      }
    }
    fs.writeFileSync(file, updatedProducts);
    console.log('the product has been deleted');
  }
  deleteProduct('1');


// change of product by id
function updateProduct(id, updatedProduct) {
  const fileData = fs.readFileSync(file, 'utf8');
  const products = fileData.split('\n');
  let updatedProductData = '';
  let productUpdated = false;
  for (const product of products) {
    const [productId] = product.split(',');
    if (productId === id) {
      updatedProductData += `${updatedProduct.id},${updatedProduct.name},${updatedProduct.price},${updatedProduct.shop}\n`;
      productUpdated = true;
    } else {
      updatedProductData += `${product}\n`;
    }
  }
  if (!productUpdated) {
    console.log(`Product with id ${id} not found`);
    return;
  }
  fs.writeFileSync(file, updatedProductData);
  console.log('Product has been updated');
}
updateProduct('3', {id:'3', name: ' productNew', price: ' 500', shop: ' shop1'});


  