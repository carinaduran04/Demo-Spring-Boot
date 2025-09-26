package com.apis.drtg.apis_drtg.models.user;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "MED_USER_DIM")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MedUser {

    @Id
    @Column(name="User_Id")
    private int userId;

    @Column(name="Username")
    private String userName;

    @Column(name="Password")
    private String password;

    //Type User ID
    @ManyToOne
    @JoinColumn(name="Type_User_Id")
    private MedUserType userType;

}
