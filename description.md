This is a step up from the initial setup in develop. We will be imitating protected routes implementation depending on the availability of a parameter 'userType' in the request body. We will allow the user to perform PATCH and DELETE only when 'userType' is 'admin'.

1. The logic of middlewares can be put in the final route handlers too. But they won't be reusable.