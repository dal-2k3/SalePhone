import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { DOMAIN } from "../../../utils/settings/config";
export default function OrderDetail() {
    const {id} = useParams();
    const [orderDetail,SetOrderDetail] = useState([]);

    useEffect(() => {
     const fetchOrderDetail = async () =>{
      
     }
     fetchOrderDetail();
    },[])
    return (
        <div>OrderDetail</div>
    )
}
