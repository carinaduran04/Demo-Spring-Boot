package com.apis.drtg.apis_drtg.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.Column;
import jakarta.persistence.Id;



@Entity
@Table(name="MED_SPECIALITY_DIM")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MedSpeciality {

    @Id
    @Column(name="Speciality_Id")
    private int medSpecialityId;

    @Column(name="Speciality_Name")
    private String medSpecialityName;

    @Column(name="Description")
    private String description;

}
