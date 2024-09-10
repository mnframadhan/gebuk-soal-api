"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toOrderResonse = toOrderResonse;
exports.toOrderResponsePagination = toOrderResponsePagination;
function toOrderResonse(order) {
    return {
        id: order.id,
        student_id: order.student_id,
        qty: order.qty,
        price: order.price,
        sub_total: order.sub_total,
        order_date: order.order_date,
        payment_date: order.payment_date,
        status: order.status
    };
}
function toOrderResponsePagination(data, pagination) {
    return {
        data: data,
        pagination: pagination
    };
}
