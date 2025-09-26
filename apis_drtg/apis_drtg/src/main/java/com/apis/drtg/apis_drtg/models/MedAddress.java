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
@Table(name="MED_ADDRESS_DIM")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MedAddress {

    @Id
    @Column(name="Address_Id")
    private int addressId;

    @Column(name="Address_Type")
    private String addressType;

    @Column(name="Address1")
    private String address1;

    @Column(name="Address2")
    private String address2;

    //City
    @ManyToOne
    @JoinColumn(name="City_Id")
    private MedCity city;

    //State
    @ManyToOne
    @JoinColumn(name="State_Id")
    private MedState state;
    //Country
    @ManyToOne
    @JoinColumn(name="Country_Id")
    private MedCountry country;

    //Zipcode
    @Column(name="Zip_Code")
    private String zipcode;




}
