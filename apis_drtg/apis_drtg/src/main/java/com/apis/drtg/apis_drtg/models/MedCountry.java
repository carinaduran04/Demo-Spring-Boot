package com.apis.drtg.apis_drtg.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="MED_COUNTRY_DIM")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MedCountry {
    @Id
    @Column(name="Country_Id")
    private int countryId;

    @Column(name="Name")
    private String name;
}
