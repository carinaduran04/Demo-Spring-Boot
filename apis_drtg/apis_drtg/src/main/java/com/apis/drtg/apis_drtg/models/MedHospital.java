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
@Table(name="MED_HOSPITAL_DIM")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MedHospital {
    @Id
    @Column(name="Hospital_Id")
    private int Hospital_Id;

    @Column(name="Hospital_Name")
    private String hospitalName;

    //Direccion Nueva Tabla
    @ManyToOne
    @JoinColumn(name="Address_Id")
    private MedAddress medAddress;

    @Column(name="Phone_Number")
    private String phoneNumber;
    
}
