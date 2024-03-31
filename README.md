# MERN Technical Task

### Setting up Frontend
Initailly clone the code by using the following command:
      
      https://github.com/NwabKhan/technical-task-01.git

After that go to client directory by:

      cd frontend

Now Install all the dependencies by:

      npm i

And simply type:

    npm run dev

Congratulation! The frontend is on!

### Setting up Backend
To set up backend go to backend directory by typing folowing command in the terminal:

      cd backend

Now Install all the dependencies by:

      npm i

And simply type:

    npm run dev

Congratulation! The Backend is ready!

## NOTE
Do not forget to add __environment__ veriables:
### For Backend
* Create a .env file in the root of /backend directory
* Create a variable __MONGO_CONN_STRING__ and write your MongoDB key

### For Fronend
* First run the backend and copy the address (where the backend is running like http://localhost:5000)
* Create a .env file in the root of /frontend directory
* Create a variable __VITE_BASE_BACKEND_URL__ and write your backend url
* DO NOT write __'/'__ after the address i.e In this case, it should be http://localhost:5000 (http://localhost:5000/)

