package models

type NewUser struct {
	UserID   string `json:"userid"`
	Name     string `json:"name"`
	Password string `json:"password"`
	Sex      string `json:"sex"`
	Age      int    `json:"age"`
}

type ExistUser struct {
	UserID   string `json:"userid"`
	Password string `json:"password"`
}
