package models

type NewUser struct {
	UserID   string `json:"userid"`
	Name     string `json:"Name"`
	Password string `json:"Password"`
	Sex      string `json:"sex"`
	Age      int    `json:"age"`
}

type ExistUser struct {
	UserId   string `json:"userid"`
	Password string `json:"password"`
}
