package com.apis.drtg.apis_drtg.models;

// import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name="APP_APPOINTMENT_DETAIL_DIM")
@AllArgsConstructor
@NoArgsConstructor
public class AppointmentDetailPage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    @Column(name="APPOINTMENT_DTL_ID")
    private int appointmentDtlId;

    @Column(name="USER_ID")
    private int userID;

    @Column(name="ADDRESS_ID")
    private int appointmentAddressID;

    @Column(name="FIRST_NAME")
    private String firstName;

    @Column(name="LAST_NAME")
    private String lastName;

    @Column(name="FULL_NAME")
    private String fullName;

    @Column(name="PHONE")
    private String phone;

    @Column(name="EMAIL")
    private String email;

    @Column(name="CONSULTING_DATE")
    private String consultingDate;

    @Column(name="CONSULTING_TYPE")
    private String consultingType;

    @Column(name="COMMENT")
    private String comment;

    @Column(name="STATUS")
    private String status;

    @Column(name="CREATE_BY")
    private String createdBy;

    @Column(name="CREATED_DATE")
    private String createdDate;

    @Column(name="LAST_UPDATE_DATE")
    private String lastUpdateDate;
}
