import axios from 'axios';
import React, { useEffect, useState } from "react";
export default function Homepage(){

    let [items , setItems] = useState([]);
    let [filterItems, setFilterItems] = useState(items);

    useEffect(() => {
            axios("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false").then(response => {
                setItems(response.data);
                setFilterItems(response.data)
            })
    },[])

    const handleChange = (e) =>{
        let item = e.target.value.toLowerCase();
        let result = [];
        result = items.filter((data) => {
            return data.symbol.search(item) !== -1;
        })
        setFilterItems(result)
    }
    

    return(
        <> 
            <main>
                <div className="search">
                    <input type="text" placeholder="Type symbol (eg. BTC)" onChange={handleChange} />
                </div>
                <table> 
                    <thead className="tableHeader">
                        <td className="rank">Rank</td>
                        <td className="icon">Coin</td>
                        <td className="symbol"></td>
                        <td className="name"></td>
                        <td className="currentPrice">Price</td>
                        <td className="change">Change</td>
                        <td className="high">24H High</td>
                        <td className="low">24H Low</td>
                        <td className="total">Total Volume</td>
                    </thead>
                    {
                        filterItems.map((item, index) => (
                            <tbody key={item.id}>
                                <td className="rank"> {item.market_cap_rank} </td>
                                <td className="icon"> <img src={item.image} alt={item.name} /> </td>
                                <td className="symbol"> {item.symbol} </td>
                                <td className="name"> {item.name} </td>
                                <td className="currentPrice"> ${item.current_price} </td> 
                                {item.price_change_percentage_24h < 0 ? (
                                    <td className="change red"> {(item.price_change_percentage_24h).toFixed(2)}% </td>
                                ) : (<td className="change green"> {(item.price_change_percentage_24h).toFixed(2)}% </td>)}
                                <td className="high"> {item.high_24h} </td>
                                <td className="low"> {item.low_24h} </td>
                                <td className="total"> {item.total_volume} </td>
                            </tbody>
                        ))
                    }
                </table>
            </main>
        </>
    )
}
                