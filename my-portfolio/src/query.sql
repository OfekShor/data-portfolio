SELECT
  Date AS date,
  Symbol AS symbol,
  Price AS price,
  LAG(Price) OVER (PARTITION BY Symbol ORDER BY Date) AS prev_price,
  ROUND(
    (Price - LAG(Price) OVER (PARTITION BY Symbol ORDER BY Date)) * 100.0 / LAG(Price) OVER (PARTITION BY Symbol ORDER BY Date),
    2
  ) AS daily_change_pct
FROM price_history
ORDER BY Symbol, Date;
