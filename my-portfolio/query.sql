WITH base_prices AS (
  SELECT
    Symbol,
    MIN(Date) AS BaseDate,
    FIRST_VALUE(Price) OVER (PARTITION BY Symbol ORDER BY Date) AS BasePrice
  FROM price_history
  WHERE Date >= '2025-06-01'
  GROUP BY Symbol
),
latest_prices AS (
  SELECT
    Symbol,
    MAX(Date) AS LatestDate,
    LAST_VALUE(Price) OVER (PARTITION BY Symbol ORDER BY Date ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) AS LatestPrice
  FROM price_history
  WHERE Date >= '2025-06-01'
  GROUP BY Symbol
)
SELECT
  b.Symbol,
  b.BaseDate,
  b.BasePrice,
  l.LatestDate,
  l.LatestPrice,
  ROUND(100.0 * (l.LatestPrice - b.BasePrice) / b.BasePrice, 2) AS Percent_Change
FROM base_prices b
JOIN latest_prices l ON b.Symbol = l.Symbol
WHERE ABS((l.LatestPrice - b.BasePrice) / b.BasePrice) * 100 > 5
ORDER BY Percent_Change DESC;
