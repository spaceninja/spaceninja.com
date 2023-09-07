---
title: Defensive API Handling
slug: defensive-api-handling
date: 2022-05-31T16:07:22.000Z
date_updated: 2022-05-31T16:07:22.000Z
tags:
  - development
  - safety
  - json
  - fetch
  - errors
  - apis
  - javascript
excerpt: On a recent client project, we built a form that submitted to a third-party registration service. Easy-peasy, right? What followed was a comical series of incidents that served as an excellent lesson in defensive API handling.
canonical: https://cloudfour.com/thinks/defensive-api-handling/
feature_image: feature/cone.png
---

On a recent client project, we had a form that submitted to a third-party registration service. They sent us some documentation for the API, and we built the form. Easy-peasy, right? What followed was a comical series of incidents that served as an excellent lesson in defensive API handling.

I’d like to walk you through a set of safety checks you can add to an API connection to make it more resilient. Some of the scenarios I describe may feel like edge cases, but they’re all based on real-world situations we’ve encountered. Any of them could cause an app like our registration form to fail in a way that looked to the user like the website was broken… or worse, as if their registration succeeded when it really failed.

## A basic API post

Here’s the most basic version of our registration function. It makes a POST request to the registration API using the `fetch()` method and then decodes the API’s JSON response into a JavaScript object that we can return.

```javascript
const registrationV1 = async (userObject) => {
  // use fetch to post the user data to the registration API
  const response = await fetch('https://example.com/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify(userObject),
  });

  // decode the response
  const json = await response.json();

  // return the response object from the API
  return json;
};
```

## Check if the API response is okay

That code works fine if your API server is reliable. But something that always gets me about the `fetch()` method is that it only fails if the server is completely offline. That is, if the server responds with a status code that indicates an error, `fetch()` considers that a successful connection, and will happily pass the error response on.

What kind of errors might you receive from an API server? A few we’ve run into include 403 and 503. A 403 error might mean we didn’t pass the proper credentials, such as an access token. A 503 error might be returned if the API service is unavailable, but the server is online. In both cases, the `fetch()` request succeeded (at returning the error it received).

If that happened, our code would return the API response containing the server error, and our application wouldn’t know what to do with it. Luckily, we can address it pretty easily by checking if the response includes the `ok` property. That’s a [shorthand code for “successful response,”](https://developer.mozilla.org/en-US/docs/Web/API/Response/ok) and it’s `true` if the status code from the server was in the 200 range.

```javascript
const registrationV2 = async (userObject) => {
  // use fetch to post the user data to the registration API
  const response = await fetch(url, options);

  // check if the response is successful before proceeding
  if (!response.ok) return;

  // decode the response
  const json = await response.json();

  // return the response object from the API
  return json;
};
```

## Handle errors

At this point, there are two places in our code where JavaScript might throw an error — if the initial `fetch()` request fails, or if the `json()` decoding step fails. As we discussed, the `fetch()` request will only fail if the API is completely unavailable. Why would the JSON decoding step fail?

Well, imagine a misconfigured API experiencing a server error, but rather than returning a 500 status code, it returns a 200 status code, and the body of the response is the HTML contents of the server’s error page. Our code sees a 200, and passes the response on to `json()` to be decoded, but it fails because the response is not JSON!

If that happens, our script will stop executing and the page will likely break. Another bad experience for our users. But since we know this might happen, we can use a `try...catch` statement. Then if anything in our code throws an error, it will be passed to our `catch` block, where we can handle it in a way that doesn’t break our app.

```javascript
const registrationV3 = async (userObject) => {
  // use a try...catch to handle any errors that might occur
  try {
    // use fetch to post the user data to the registration API
    // (will throw an error if the url does not respond)
    const response = await fetch(url, options);

    // check if the response is successful before proceeding
    if (!response.ok) throw new Error(`Response: ${response.status}`);

    // try to decode the response
    // (will throw an error if JSON can't be parsed)
    const json = await response.json();

    // return the response object from the API
    return json;
  } catch (err) {
    // trigger some code to display an error to the user
    console.error(err.message);
  }
};
```

Note that we’ve also gone back and changed our `response.ok` check to throw an error instead of returning. So we now have three possible error states covered!

## Check if the response is okay, but contains an error

Now, if something has gone wrong with the API, it _should_ return an appropriate response status. A response in the 200s _should_ mean everything is good. However, it’s distressingly common for poorly-written APIs to return a 200 status code, even if the JSON itself contains an error.

This might happen if there’s no server error, but something with the request went wrong. Maybe the server couldn’t save our registration. Or maybe that user has already registered! There are status codes to cover these scenarios, but many APIs will return a 200 and a JSON response with an `error` or `errors` property.

We can handle this situation by adding another safety check to our code. If we find either of these properties in the response, we can throw an error.

```javascript
const registrationV4 = async (userObject) => {
  // use a try...catch to handle any errors that might occur
  try {
    // use fetch to post the user data to the registration API
    // (will throw an error if the url does not respond)
    const response = await fetch(url, options);

    // check if the response is successful before proceeding
    if (!response.ok) throw new Error(`Response: ${response.status}`);

    // try to decode the response
    // (will throw an error if JSON can't be parsed)
    const json = await response.json();

    // check if the response contains an `error` or `errors` property
    if (json.error) throw new Error(json.error);
    if (json.errors) throw new Error(JSON.stringify(json.errors));

    // return the response object from the API
    return json;
  } catch (err) {
    // trigger some code to display an error to the user
    console.error(err.message);
  }
};
```

_Note: Don’t assume your API sends the same properties. Check what it sends when there’s an error, and update this check to match!_

In this case, our API documentation told us that it will either return an `error` property, which contains a string, or it will return an `errors` array. I don’t know the structure of the `errors` array, so I’m JSON encoding it since `Error()` expects to be passed a string.

## Check if the response is what we’re expecting

Now, there’s just one final situation that we’re going to check for. Sometimes we get a successful response, and it doesn’t contain an error, but it also doesn’t contain what we’re expecting. For example, an endpoint meant to update a single record could easily be misconfigured to return multiple records, which would be terrible for security and performance.

As a result, it makes sense to check if the response contains the properties we were expecting.

```javascript
const registrationV5 = async (userObject) => {
  // use a try...catch to handle any errors that might occur
  try {
    // use fetch to post the user data to the registration API
    // (will throw an error if the url does not respond)
    const response = await fetch(url, options);

    // check if the response is successful before proceeding
    if (!response.ok) throw new Error(`Response: ${response.status}`);

    // try to decode the response
    // (will throw an error if JSON can't be parsed)
    const json = await response.json();

    // check if the response contains an `error` or `errors` property
    if (json.error) throw new Error(json.error);
    if (json.errors) throw new Error(JSON.stringify(json.errors));

    // validate the shape of the response
    if (!(json.count && json.results))
      throw new Error('The API returned an unexpected response.');

    // return the response object from the API
    return json;
  } catch (err) {
    // trigger some code to display an error to the user
    console.error(err.message);
  }
};
```

_Note: The `json.count` and `json.results` properties are just examples. You should replace them with properties that your API returns._

## Conclusion

To be clear, we’ve run into all of the following problems in real-world situations:

- The API does not respond.
- The API responds with a 400 or 500 range status code.
- The API responds with a 200 but the response is not JSON.
- The API responds with a 200 but the response has an `error` or `errors` property.
- The API responds with a 200 but the response contains unexpected content.

When a user tries to register and one of these happens, we don’t want the app to crash or (worse) look like things succeeded when they really failed. This code lets us catch those scenarios and display a helpful message to the user.

In a perfect world, we wouldn’t need all these safety checks. Ideally, all APIs would respect the standards and respond with an appropriate status code. But we don’t live in a perfect world, and unfortunately, when an API behaves unexpectedly, it’s your users who pay the price.

So even if it feels like a bit much, it’s wise to add safety checks to validate we’re receiving what we expect from an API while handling any errors we might encounter along the way.
