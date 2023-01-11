export interface signupData{
    name:string,
    password:string,
    email:string,
}

export interface loginData{
    email:string,
    password:string,
}

export interface product{
    productName :string,
    productPrice:string,
    productId:string,
    productType:string,
    productColor:string,
    productDes:string,
    productImage:string,
    id:number,
    productQuantity:undefined | number,
}