package com.apis.drtg.apis_drtg.models.user;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "MED_TYPE_USER_DIM")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MedUserType {
    @Id
    @Column(name="Type_User_Id")
    private int typeUserId;

    @Column(name="User_Type")
    private String userType;

}
