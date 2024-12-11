# Project Express API

This API is part of my final project, which focuses on tracking allowances abroad for business trips. It provides standardized allowance amounts for various countries in the years 2023 and 2024.

**Note:** This API **does not** automatically map cities to their corresponding countries. It only stores and returns data at the country-level. In a broader application (like my final project), an additional step or a separate database would be needed to link a given city to the correct country before querying this API.

## Background

In creating trip reports, users may eventually need to specify the trip’s location, which includes both the city and country. While this API doesn’t handle city-to-country determination, it can return the relevant allowance ("traktamente" in Swedish) once you know the country.

The allowance data comes from the Swedish Tax Agency’s public dataset ([Skatteverket](https://skatteverket.entryscape.net/rowstore/dataset/70ccea31-b64c-4bf5-84c7-673f04f32505/json)).

## Endpoints & Parameters

The API provides an endpoint that lets you filter allowances by both country and year.

- **Country (String):**  
  Supports partial matches. For example, `?country=tobago` will return data for "Trinidad and Tobago" because "tobago" is a substring of the full country name.
  (OBS! complete the name of USA, UK, UAE, PRC in traktamente-en.json)
  
- **Year (String):**  
  Matches must be exact. For example, `?year=2024` returns data for 2024 allowances only.

You can use these parameters separately or combine them for more specific filtering.

## Technical Details

- **Case-Insensitive Country Matching:**  
  The API converts all country names and the search query to lowercase, ensuring that "South Korea", "south korea", and "SOUTH KOREA" are treated the same.
  
- **Partial Matching with `.includes()`:**  
  For the country parameter, `.includes()` is used. Substring matches will return relevant records.
  
- **Strict Equality for Year:**  
  The year filter uses strict equality (`===`) so that only exact year matches are returned.
  
- **Cumulative Filtering:**  
  If you provide both `country` and `year`, the results will be filtered by both conditions.  
  Example: `?country=tobago&year=2024` returns results matching "tobago" and the year 2024.

## Example Requests

- **All allowances for 2023**:  
  `GET /traktamente?year=2023`

- **Allowances for countries containing "tobago"**:  
  `GET /traktamente?country=tobago`

- **Combine both parameters**:  
  `GET /traktamente?country=tobago&year=2024`

## View it live

https://traktamente-express-api.onrender.com
