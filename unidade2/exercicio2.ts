var lista1: number[] = [1, 2, 3];
console.log("array lista1 = " + lista1);
lista1 = ['1', '2', '3'];

var listaAny: any[] = [1, true, 'três'];
console.log("array de any = " + listaAny);
listaAny[1] = 100;
console.log("array de any = " + listaAny);