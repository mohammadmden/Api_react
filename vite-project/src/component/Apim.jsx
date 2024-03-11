
import React, { useEffect, useRef, useState } from "react";
// import { coinData } from "..coin-data";
// import { coinData } from "../coin-data";
import { DataGrid,GridToolbar } from "@mui/x-data-grid";
import StarOutlineIcon from '@mui/icons-material/StarOutline';



const Apim = () => {
  const defaultCoins = useRef([]);

  const [coins, setCoins] = useState([]);
  const handleChange = (event) => {
    const newCoins = defaultCoins.current.filter(
      (coin) =>
        coin.id.includes(event.target.value) ||
        coin.symbol.includes(event.target.value)
    );
    setCoins(newCoins);
  };
  
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets/?vs_currency=usd"
      );
      const data = response.ok ? await response.json() : coinData;
      setCoins(data);
      defaultCoins.current = data;
    } catch (error) {
      setCoins(coinData);
      defaultCoins.current = coinData;

      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();

    const interval = setInterval(fetchData, 10000);

    return () => clearInterval(interval);
  }, []);
 
  const columns = [
    { field: "", headerName: "", width: 10,
   renderCell: () => (
    <StarOutlineIcon  style={{fontSize:"15px"}}/>
)} ,
    { field: "market_cap_rank", headerName: "#", width: 10,},
    
  
    {
      field: "image",
      headerName: "",
      width:5,
      renderCell: (params) => {
        const [image, setImage] = useState(null);
    
        useEffect(() => {
          const img = new Image();
          img.src = params.value;
          img.onload = () => setImage(img);
        }, [params.value]);
    
        return image ? <img src={image.src} width={20} /> : null;
      },
    },
    
    { field: "name", headerName: "Name", width: 150 },
    { field: "current_price", headerName: "Price", width: 100 },
    { field: "high_24h", headerName: "24h %", width: 100 },
    { field: "low_24h", headerName: "Low_24h", width: 100 },
    { field: "price_change_24h", headerName: "7d", width: 100 },
    { field: "market_cap", headerName: "market_cap", width: 200 },
    { field: "price_change_percentage_24h", headerName: "Percentage-24", width: 100 },
   
   
  ];


  
 

  return (
    <div >
      
     
      <h1>Coin Market Cap...</h1>
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
        
         rows={coins}
          
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10]}  
          
          // checkboxSelection    
        />      
      </div>      
    </div>
  );
};
export default Apim;