export interface User {
  userId? : string
  email : string
}

export interface ResponseUser {
  data : User|null;
  message : string;
}
