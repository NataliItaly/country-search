# Design Decisions

## 1. Handling Race Conditions and Request Cancellation

The application uses `AbortController` and `AbortSignal` to cancel outdated requests when the user changes the search input.

Every time an `input` event occurs:

1. The previous active request is cancelled using `activeController?.abort()`.
2. The previous controller reference is reset to `null`.
3. The current input value is trimmed and converted to lowercase.
4. Previous search results are cleared.
5. If the input is empty, the handler returns without starting a new request.
6. A new `AbortController` is created and its signal is passed to the debounced search function.

Cancellation happens immediately on every input event, not when the debounce timer expires. This prevents an outdated request from completing and displaying results while the user is already typing a new query.

A boolean flag that only ignores outdated responses would not actually stop the network request. Using `AbortController` cancels the underlying `fetch` operation, avoiding unnecessary network activity and resource consumption.

The `AbortError` exception is handled separately in `handleSearch.ts` because cancellation is an expected part of the search workflow, not an actual application error.

## 2. Debounce Delay

The application uses a debounce delay of **300 milliseconds**, configured in `main.ts`.

This value provides a balance between responsiveness and reducing unnecessary API requests.

- Without debounce, every keystroke would immediately trigger a network request, potentially generating many unnecessary requests while the user is typing.
- With a significantly longer delay, such as 1000 milliseconds, the application would feel less responsive because users would have to wait longer before seeing search results.
- A 300 ms delay allows the application to wait briefly for the user to pause typing before sending a request.

Request cancellation and debounce work together: cancellation happens immediately when the input changes, while the new request starts only after the debounce delay.

### Debounce Implementation

The `debounce` utility is implemented in `utils/debounce.ts` without external libraries.

It uses a closure to maintain the timer ID between function calls. Each new call clears the previous timer using `clearTimeout()` and starts a new one with `setTimeout()`.

The function uses TypeScript generics (`Args extends unknown[]`) to preserve the argument types of the original callback.

This ensures that only the latest search callback is executed after the user stops typing for the configured delay.

## 3. API Requests and Data Transformation

### API Requests

The API logic is implemented in `api/searchCountries.ts`.

The `searchCountries` function is responsible for building the request URL, sending the HTTP request, validating the response and transforming the returned data.

Key design decisions:

- **URL encoding:** `encodeURIComponent()` is used to safely encode the search query before adding it to the API URL.
- **Request cancellation:** An `AbortSignal` is passed to `fetch()`, allowing the calling code to cancel outdated requests.
- **HTTP 404 handling:** A 404 response is treated as a valid empty search result and returns an empty array. This follows the API's semantics, where 404 means that no countries match the query.
- **HTTP error handling:** Other unsuccessful HTTP responses result in a custom `HttpError`, which preserves the HTTP status code.
- **Response validation:** The JSON response is initially typed as `unknown` and checked with `Array.isArray()` before processing. Invalid response structures result in a `TypeError`.
- **Data transformation:** The `mapCountryResponse` utility converts each raw API object into the application's `Country` model.

The API layer does not manipulate the DOM or display error messages. Error presentation is handled separately by the search handler.

### Country Response Mapping

The `mapCountryResponse` function is implemented in `utils/mapCountryResponse.ts`.

It is a pure function that transforms an API response object into the application's `Country` model.

Key design decisions:

- **Input validation:** The `isRecord()` type guard verifies that the input is a non-null object and not an array.
- **Defensive data handling:** Each country property is checked before being assigned to the resulting object. Invalid or missing values are replaced with safe defaults.
- **Language extraction:** The function filters out invalid language entries and extracts valid language names.
- **Separation of concerns:** API response structures are converted into the application's own data model in one dedicated utility.

**Time complexity:** O(L), where L is the number of language entries in a country's response. The `filter()` and `map()` operations each iterate over the language array. All other operations take constant time.

**Space complexity:** O(L), because a new array containing the valid language names is created. The remaining properties require constant additional space.

When mapping an array of n countries, the overall time complexity is O(n + ΣLᵢ), where Lᵢ represents the number of language entries for each country.

### Search Result Handling

The search handler is implemented in `handlers/handleSearch.ts`.

It coordinates the search operation and updates the UI depending on the result.

Key design decisions:

- **Early returns:** Aborted requests and empty search queries are handled before unnecessary processing takes place.
- **Cancellation checks:** The abort signal is checked both before starting the request and after awaiting the API response. This prevents cancelled requests from updating the UI.
- **Separation of concerns:** The handler delegates card creation, empty-state rendering and error rendering to separate UI modules.
- **Error handling:** `AbortError` is treated as an expected cancellation event and does not produce an error message. Other errors, including timeouts and HTTP errors, are logged and displayed using the error UI component.
- **DOM updates:** `replaceChildren()` is used to clear previous results before displaying new content.

The handler does not implement API communication or country data transformation itself.

### Custom HTTP Error

The `HttpError` class is implemented in `errors/HttpError.ts`.

It extends the native `Error` class and stores the HTTP status code in a readonly property.

This provides a dedicated error type for unsuccessful HTTP responses and makes HTTP errors easier to identify and diagnose.

## 4. Clean Code Principles

The following principles are applied throughout the application:

| Principle              | Implementation                                                                                                                                             |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Single Responsibility  | `searchCountries.ts` handles API communication; `mapCountryResponse.ts` transforms data; `handleSearch.ts` manages search results and UI updates.          |
| Separation of Concerns | API, handlers, utilities, UI components and error classes are organized into separate modules.                                                             |
| Pure Functions         | `mapCountryResponse()` transforms input data without modifying external state or accessing the DOM.                                                        |
| Meaningful Names       | Functions and variables use descriptive names, such as `searchCountries`, `activeController` and `mapCountryResponse`.                                     |
| Early Returns          | `handleSearch()` exits early for aborted requests and empty queries.                                                                                       |
| Defensive Programming  | API responses are validated before being processed, and optional or invalid country properties receive safe defaults.                                      |
| Type Safety            | TypeScript interfaces, generics, type guards and explicit return types help prevent invalid data usage.                                                    |
| Error Handling         | `HttpError` provides a dedicated HTTP error type, while `handleSearch()` distinguishes expected request cancellation from errors that should be displayed. |
| Reusability            | UI elements and utility functions are implemented in separate modules and can be reused independently.                                                     |
