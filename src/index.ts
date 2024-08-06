// interface User {
//     name: string;
//     age: number;
// }

// function sumAge(user1: User, user2: User){
//     return user1.age + user2.age
// }

// const age = sumAge({
//     name: 'John',
//     age: 30
// }, 
// {
//     name: 'Jane',
//     age: 25
// })

// console.log(age);

// interface User {
//     id: string;
//     name: string;
//     age: number;
//     email: string;
//     password: string;
// }

// type UpdateProps = Pick<User, 'name' | 'age' | 'email'>;

// type UpdatePropsOptional = Partial<UpdateProps>;

// function updateUser(updatedProps: UpdatePropsOptional, user: User) {
//     return { ...user, ...updatedProps };
// }


// type User = {
//     id: string;
//     username: string;
// }

// type Users = Record<string, User>;

// const users : Users = {
//     "sadf": {
//         id: 'sadf',
//         username: 'asdf'
//     },
//     "asdf": {
//         id: 'asdf',
//         username: 'asdlf'
//     }
// }

// type Users = Record<string, {age: number , name: string}>;

// const users: Users = {
//     "sadf": {
//         age: 12,
//         name: 'asdf'
//     },
//     "asdf": {
//         age: 23,
//         name: 'asdlf'
//     }
// }

// type User = {
//     name: string ,
//     age: number,
//     email: string
// }


// const users = new Map<string, User>()
// users.set('sadf', {
//     age: 12,
//     name: 'asdf',
//     email: 'asdf'
// })
// users.set('asdf', {
//     age: 23,
//     name: 'asdlf',
//     email: 'asdf'
// })

// const user = users.get('asdf')
// console.log(user);

// type EventType = 'click' | 'scroll' | 'mousemove';
// type ExcludeEvent = Exclude<EventType, 'scroll'>; // 'click' | 'mousemove'

// const handleEvent = (event: ExcludeEvent) => {
//   console.log(`Handling event: ${event}`);
// };

// handleEvent('click'); // OK

import { z } from 'zod';
import express from "express";

const app = express();

// Define the schema for profile update
const userProfileSchema = z.object({
  name: z.string().min(1, { message: "Name cannot be empty" }),
  email: z.string().email({ message: "Invalid email format" }),
  age: z.number().min(18, { message: "You must be at least 18 years old" }).optional(),
});

app.put("/user", (req, res) => {
  const { success } = userProfileSchema.safeParse(req.body);
  const updateBody: z.infer<typeof userProfileSchema> = req.body; // how to assign a type to updateBody?

  if (!success) {
    res.status(411).json({});
    return
  }
  // update database here
  res.json({
    message: "User updated"
  })
});

app.listen(3000);