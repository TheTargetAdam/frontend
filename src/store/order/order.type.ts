export interface IOrderResponse{
    orders:IOrder[],
    totalCountItems:string,
    itemsPerPage:string,
}
export interface IOrder{
    id:number,
    title:string,
    description:string,
    cost:number,
    period:string,
    topic:string,
    creatorId:number,
}

export interface IUpdateOrder{
    title:string,
    description:string,
    cost:string,
    topic:string
}
export enum orderType{
    Completed,
    InProgress,
    Created,
}