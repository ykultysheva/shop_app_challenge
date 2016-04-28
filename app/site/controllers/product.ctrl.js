(function(){

  angular
  .module('shopApp')
  .controller('ProductCtrl',ProductCtrl);

  function ProductCtrl($stateParams, $uibModal,$state,api,productSrv,toastr,product){
    var productVm = this;

    productVm.categories = productSrv.categories;

    productVm.quantity = 1;
    if(product)
    {
      productVm.product = product;
    }
    
    productVm.category;
    productVm.curCate = productVm.categories[0];
    console.log(productVm.product);
    console.log(productVm.category);

    productVm.product_add_btn = 'Add Product'
    productVm.product_update_btn = 'Update Product';
    productVm.product_delete_btn = 'Remove Product';

    if($stateParams.productId != undefined){
      productSrv.getProduct($stateParams.productId)
      .then(function(res){
        console.log(res);
        productVm.product = res.data.product;
        //TODO #2 set category based on edit form based on
        //product category
     //   for(var index in productVm.categories){
     //     if(productVm.product.category == productVm.categories[index].value){
     //       productVm.set_category = productVm.categories[index].value;
     //     }
     //   }
        for (var i=0; i < productVm.categories.length; i++){
        if (productVm.product.category == productVm.categories[i].category){
        productVm.curCate = productVm.categories[i]
      }
      }
      })
    }

    //public functions
    productVm.addProduct = addProduct;
    productVm.updateProduct = updateProduct;
    productVm.deleteProduct = deleteProduct;
    productVm.addtoCart = addtoCart;
    productVm.openCart_v2 = openCart_v2;
    productVm.goBack = goBack;

    function openCart_v2(){

      $uibModal.open({
        animation: true,
            templateUrl: 'site/partials/cart.html',
            controller: "CartCtrl as ctrl"
      });
    }

    function addProduct(){
      //TODO #2
      //create product object, pass to product service
      //Update text in button
      console.log('add')
      console.log(productVm.curCate.category)
      var newProduct = {
        name:productVm.name,
        image:productVm.image,
        description:productVm.description,
        category:productVm.curCate.category,
        price:productVm.price,
        quantity:productVm.quantity,
        status:1
      }
      console.log(newProduct)
      productSrv.addProduct(newProduct);
      productVm.product_add_btn = 'Product Added';
    }

    function updateProduct(){
      //TODO #2
      //create product object, pass to product service
      //Update text in button
      console.log(productVm.product)
      console.log(productVm.curCate)
      var updProduct = {
        name:productVm.product.name,
        image:productVm.product.image,
        description:productVm.product.description,
        category:productVm.curCate.category,
        price:productVm.product.price,
        quantity:productVm.product.quantity,
        status:1
      }
      console.log(updProduct)
      productSrv.updateProduct(updProduct,$stateParams.productId)

    }

    function deleteProduct(){
      //TODO #2
      //remove product, pass to product service
      //update text in button
      productSrv.deleteProduct($stateParams.productId)
      alert('Product Deleted')
    }

    function addtoCart(isValid){
    	if(!isValid){
    		alert('There are too many items!')
    	}else{
      		productSrv.addtoCart(productVm.product,productVm.quantity);
          if(productVm.quantity > 1){
      		  toastr.success(productVm.quantity+ ' ' + productVm.product.name +'s was added to your cart!')
          } else{
            toastr.success('1 ' +productVm.product.name +' was added to your cart!')
          }
    	}
    }

    function goBack(){
    	$state.go('categories',{'categoryName':productVm.product.category})
    }
  }


})();
