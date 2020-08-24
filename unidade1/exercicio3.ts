function calculaDesconto(preco:number,taxa:number = 0.50) { 
    var desconto = preco * taxa; 
    console.log("Valor do Desconto: ",desconto); 
 } 
 calculaDesconto(1000) 
 calculaDesconto(1000,0.30)