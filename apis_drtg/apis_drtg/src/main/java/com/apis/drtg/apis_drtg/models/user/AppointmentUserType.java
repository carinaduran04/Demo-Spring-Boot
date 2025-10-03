package com.apis.drtg.apis_drtg.models.user;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="APP_USER_TYPE_DIM")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentUserType {
    @Id
    @Column(name="USER_TYPE_ID")
    private int userTypeId;

    @Column(name="NAME")
    private String name;
    

}
