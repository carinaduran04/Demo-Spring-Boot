package com.apis.drtg.apis_drtg.models.user;

import com.apis.drtg.apis_drtg.models.AppointmentAddress;

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
@Table(name="APP_USER_DIM")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentUser {

    @Id
    @Column(name="USER_ID")
    private int userId;
    
    @ManyToOne
    @JoinColumn(name = "ADDRESS_ID", referencedColumnName = "ADDRESS_ID")
    private AppointmentAddress address;

    @ManyToOne
    @JoinColumn(name="USER_TYPE_ID")
    private AppointmentUserType appointmentUserType;

    @Column(name="USER_NAME")
    private String userName;

    @Column(name="PASSWORD")
    private String password;

    @Column(name="FIRST_NAME")
    private String firstName;

    @Column(name="LAST_NAME")
    private String lastName;

    @Column(name="FULL_NAME")
    private String fullName;

    @Column(name="ROLE")
    private String role;

    @Column(name="EMAIL")
    private String email;

    @Column(name="TITLE")
    private String title;

    @Column(name="LAST_SESSION_DATE")
    private String lastSessionDate;

    @Column(name="CREATE_BY")
    private String createBy;

    @Column(name="CREATE_DATE")
    private String createDate;

    @Column(name="LAST_UPDATE_DATE")
    private String lastUpdateDate;

    
}
