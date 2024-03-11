package com.example.demo.model;

public class LoginResponseDTO {
    private ApplicationUser username;
    private String jwt;

    public LoginResponseDTO(){
        super();
    }

    public LoginResponseDTO(ApplicationUser username, String jwt){
        this.username = username;
        this.jwt = jwt;
    }

    public ApplicationUser getUsername(){
        return this.username;
    }

    public void setUsername(ApplicationUser username){
        this.username = username;
    }

    public String getJwt(){
        return this.jwt;
    }

    public void setJwt(String jwt){
        this.jwt = jwt;
    }

}