import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { DOMAIN } from "../../../utils/settings/config";
import { getOrderDetail } from '../../../services/order';
export default function OrderDetail() {
    const { id } = useParams();
    const [orderDetail, SetOrderDetail] = useState([]);

    useEffect(() => {
        const fetchOrderDetail = async () => {
            const data = await getOrderDetail(id);
            SetOrderDetail(data);

        }
        fetchOrderDetail();
    }, []);
    console.log(orderDetail);
    return (
        <div>OrderDetail</div>
    )
}
