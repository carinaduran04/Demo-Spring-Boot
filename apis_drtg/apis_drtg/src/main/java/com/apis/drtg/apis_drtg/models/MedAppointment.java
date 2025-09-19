package com.apis.drtg.apis_drtg.models;

import java.sql.Date;

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
@Table(name="MED_APPOINTMENT_DIM")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MedAppointment {

    @Id
    @Column(name= "Appointment_Id")
    private int Id;

    @Column(name="First_Name")
    private String firstName;

    @Column(name="Last_Name")
    private String lastName;
    
    @Column(name="Email")
    private String email;

    @Column(name="Phone")
    private String phone;

    @Column(name="Comment")
    private String comment;

    @Column(name="Appointment_Date")
    private Date appointmentDate;

    /*@Column(name="Doctor_Id")
    private int doctorId;

    @Column(name="Hospital_Id")
    private int hospitalId;*/

    @Column(name="Create_by")
    private String createdBy;

    @Column(name="Last_Update_Date")
    private Date lastUpdateDate;

    @Column(name="Create_Date")
    private Date createDate;

    @Column(name="Field1")
    private String field1;

    @Column(name="Field2")
    private String field2;

    @Column(name="Field3")
    private String field3;

    @ManyToOne
    @JoinColumn(name="Doctor_Id")
    private MedDoctor doctor;

    @ManyToOne
    @JoinColumn(name="Hospital_Id")
    private MedHospital hospital;
}
