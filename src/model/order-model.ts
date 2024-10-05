import { Order } from "@prisma/client"; 
import { Paging } from "./pages";

export type OrderRequest = {

    qty: number;
        
}

export type OrderResponse = {

    id: string;
    student_id: string | null;
    qty: number;
    price: number;
    sub_total: number;
    order_date: string;
    payment_date: string | null;
    status: string;

}

export function toOrderResonse(order: Order) : OrderResponse {

    return {

        id: order.id,
        student_id: order.student_id,
        qty: order.qty,
        price: order.price,
        sub_total: order.sub_total,
        order_date: order.order_date,
        payment_date: order.payment_date,
        status: order.status
    }
}

export type OrderListPagination = {

    data: OrderResponse[];
    pagination: Paging

}

export function toOrderResponsePagination(data: OrderResponse[], pagination: Paging) : OrderListPagination {

    return {
        data: data as Array<OrderResponse>,
        pagination: pagination
    }
}