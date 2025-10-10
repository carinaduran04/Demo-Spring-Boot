package com.apis.drtg.apis_drtg.models;

import java.util.Date;

import com.apis.drtg.apis_drtg.models.user.AppointmentUser;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="APP_APPOINTMENT_DETAIL_DIM")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    @Column(name="APPOINTMENT_DTL_ID")
    private int appointmentDtlId;

    @ManyToOne
    @JoinColumn(name="USER_ID")
    private AppointmentUser userId;

    @ManyToOne(cascade = jakarta.persistence.CascadeType.ALL) // 👈 permite guardar la dirección nueva junto con la cita
    @JoinColumn(name="ADDRESS_ID")
    private AppointmentAddress appointmentAddress;

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
    private Date consultingDate;

    @Column(name="CONSULTING_TYPE")
    private String consultingType;

    @Column(name="COMMENT")
    private String comment;

    @Column(name="STATUS")
    private String status;

    @Column(name="CREATE_BY")
    private String createBy;

    @Column(name="CREATED_DATE")
    private Date createdDate;

    @Column(name="LAST_UPDATE_DATE")
    private Date lastUpdateDate;

}
