import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableHead, TableRow, Typography, Box } from "@mui/material";

const CryptoTable = ({ searchQuery }) => {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              order: "market_cap_desc",
              per_page: 50,
              page: 1,
              sparkline: false,
            },
          }
        );
        setCryptoData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching crypto data:", error);
        setLoading(false);
      }
    };

    fetchCryptoData();
  }, []);

  const filteredData = cryptoData.filter((coin) =>
    coin.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box mt={3}>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell>Coin</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Market Cap</TableCell>
              <TableCell>24h Change</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((coin) => (
              <TableRow key={coin.id}>
                <TableCell>{coin.market_cap_rank}</TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <img
                      src={coin.image}
                      alt={coin.name}
                      width={30}
                      height={30}
                      style={{ marginRight: 10 }}
                    />
                    {coin.name}
                  </Box>
                </TableCell>
                <TableCell>${coin.current_price.toLocaleString()}</TableCell>
                <TableCell>${coin.market_cap.toLocaleString()}</TableCell>
                <TableCell
                  style={{
                    color: coin.price_change_percentage_24h > 0 ? "green" : "red",
                  }}
                >
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Box>
  );
};

export default CryptoTable;
