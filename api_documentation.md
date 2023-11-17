/**
 * @documentation {HTTP_METHOD} PATH DESCRIPTION
 * 
 * This comment serves as a general documentation annotation for an API endpoint. 
 * It indicates that you are documenting an API endpoint. The {HTTP_METHOD} is replaced 
 * with the actual HTTP method (e.g., GET, POST, PUT), PATH represents the endpoint URL, 
 * and DESCRIPTION provides a brief explanation of what the endpoint does.
 */

/**
 * @apiName
 * 
 * This annotation specifies the name of the API endpoint. It is often used for linking 
 * related documentation elements.
 */

/**
 * @apiGroup
 * 
 * This annotation is used to categorize the endpoint into a specific group. It helps 
 * organize and classify different endpoints. For example, in your case, the group is 
 * named "BoardGames."
 */

/**
 * @apiParam {TYPE} [PARAM_NAME] DESCRIPTION
 * 
 * This annotation documents the parameters that the API endpoint accepts. It includes 
 * information about the parameter type (TYPE), name (PARAM_NAME), and an optional 
 * description (DESCRIPTION). This information is valuable for users who want to 
 * understand how to structure their requests.
 */


# API Documentation

## Endpoint: /

### Display API documentation or a welcome message

- **HTTP Method:** GET
- **Description:** Displays API documentation or a welcome message.

#### Parameters:

- `showEndpoints` (String, optional, default: "false"): Set to "true" to display API endpoints.

## Endpoint: /games

### Get all board games

- **HTTP Method:** GET
- **Description:** Retrieve a list of board games with optional filters and pagination.

#### Parameters:

- `year` (Number, optional): Filter games by year.
- `gametype` (String, optional): Filter games by type (e.g., strategy, family, party).
- `sortBy` (String, optional): Sort games by rating or other criteria.
- `name` (String, optional): Search games by name.
- `page` (Number, optional, default: 1): Page number for pagination.
- `pageSize` (Number|String, optional, default: 20): Number of games per page, 'all' for all games.

## Endpoint: /games/:rank

### Get a specific board game by rank

- **HTTP Method:** GET
- **Description:** Retrieve a specific board game based on its rank.

#### Parameters:

- `rank` (Number): The rank of the board game.
