* **URL**

  /register

* **Method:**
  
  `POST`

* **URL Params**
   **Required:**
   None

* **Data Params**
   None

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `{"message" : "user success to register"}`

* **Error Response:**
  
  * **Code:** 400 PASSWORD VALIDATION ERROR <br />
    **Content:** `{"error": "password is required"}`
 

  * **Code:** 400 EMAIL VALIDATION ERROR <br />
    **Content:** `{"error" : "email is required"}`


* **URL**

  /login

* **Method:**
  
  `POST`

* **URL Params**
   **Required:**
   None

* **Data Params**
   None

* **Success Response:**
  
  * **Code:** 200 <br />

* **Error Response:**
  
  * **Code:** 401 WRONG EMAIL OR PASSWORD <br />
    **Content:** `{"error": "wrong email/password"}`
 

  * **Code:** 401 WRONG EMAIL OR PASSWORD <br />
    **Content:** `{"error" : "wrong email/password"}`

* **URL**

  /product

* **Method:**
  
  `POST`

* **URL Params**
   **Required:**
   None

* **Data Params**
   None

* **Success Response:**
  
  * **Code:** 201 <br />

* **Error Response:**
  
  * **Code:** 400 VALIDATION ERROR <br />
    **Content:** `{"error": "Properti is required"}`
 

  * **Code:** 400 AUTHENTICATION FAILED <br />
    **Content:** `{"error" : "Authentication Failed"}`


* **URL**

  /product

* **Method:**
  
  `GET`

* **URL Params**
   **Required:**
   None

* **Data Params**
   None

* **Success Response:**
  
  * **Code:** 200 <br />

* **Error Response:**
  
  * **Code:** 400 AUTHENTICATION FAILED <br />
    **Content:** `{"error" : "Authentication Failed"}`


* **URL**

  /product

* **Method:**
  
  `PUT`

* **URL Params**
   **Required:**
   `id=[integer]`

* **Data Params**
   None

* **Success Response:**
  
  * **Code:** 200 <br />

* **Error Response:**
  
  * **Code:** 400 VALIDATION ERROR <br />
    **Content:** `{"error": "Properti is required"}`
 

  * **Code:** 400 AUTHENTICATION FAILED <br />
    **Content:** `{"error" : "Authentication Failed"}`


* **URL**

  /product

* **Method:**
  
  `DELETE`

* **URL Params**
   **Required:**
   `id=[integer]`

* **Data Params**
   None

* **Success Response:**
  
  * **Code:** 200 <br />

* **Error Response:**
  
  * **Code:** 400 VALIDATION ERROR <br />
    **Content:** `{"error": "Properti is required"}`
 

  * **Code:** 400 AUTHENTICATION FAILED <br />
    **Content:** `{"error" : "Authentication Failed"}`


* **URL**

  /cart

* **Method:**
  
  `GET`

* **URL Params**
   **Required:**
   None

* **Data Params**
   None

* **Success Response:**
  
  * **Code:** 200 <br />

* **Error Response:**
  
  * **Code:** 400 AUTHENTICATION FAILED <br />
    **Content:** `{"error" : "Authentication Failed"}`


* **URL**

  /cart

* **Method:**
  
  `POST`

* **URL Params**
   **Required:**
   None

* **Data Params**
   None

* **Success Response:**
  
  * **Code:** 200 <br />

* **Error Response:**
  
  * **Code:** 400 VALIDATION ERROR <br />
    **Content:** `{"error": "Properti is required"}`

  * **Code:** 400 AUTHENTICATION FAILED <br />
    **Content:** `{"error" : "Authentication Failed"}`


* **URL**

  /cart

* **Method:**
  
  `PATCH`

* **URL Params**
   **Required:**
   `id=[integer]`

* **Data Params**
   None

* **Success Response:**
  
  * **Code:** 200 <br />

* **Error Response:**
  
  * **Code:** 400 VALIDATION ERROR <br />
    **Content:** `{"error": "Properti is required"}`

  * **Code:** 400 AUTHENTICATION FAILED <br />
    **Content:** `{"error" : "Authentication Failed"}`


* **URL**

  /cart

* **Method:**
  
  `DELETE`

* **URL Params**
   **Required:**
   `id=[integer]`

* **Data Params**
   None

* **Success Response:**
  
  * **Code:** 200 <br />

* **Error Response:**

  * **Code:** 400 AUTHENTICATION FAILED <br />
    **Content:** `{"error" : "Authentication Failed"}`
