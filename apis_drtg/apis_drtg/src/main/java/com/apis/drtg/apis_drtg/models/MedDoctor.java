package com.apis.drtg.apis_drtg.models;


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
@Table(name="MED_DOCTOR_DIM")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MedDoctor {

    @Id
    @Column(name="Doctor_Id")
    private int Doctor_Id;

    @Column(name="First_Name")
    private String firstName;

    @Column(name="Last_Name")
    private String lastName;

    @Column(name="Fullname")
    private String fullName;

    @Column(name="Phone_Number")
    private String phoneNumber;

    //Especialidad Nueva Tabla
    @ManyToOne
    @JoinColumn(name="Speciality_Id")
    private MedSpeciality medSpeciality;

}