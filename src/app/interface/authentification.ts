export interface I_authentification {
  token : string;
  use : I_user
}

export interface I_user {
  created_at : string
  email : string
  email_verified_at: string
  firstname: string
  id: number
  lastname : string
  name: string
  role_id : number
  updated_at : Date
}
