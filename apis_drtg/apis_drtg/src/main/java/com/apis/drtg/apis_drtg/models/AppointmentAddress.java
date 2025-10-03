package com.apis.drtg.apis_drtg.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="APP_ADDRESS_DIM")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentAddress {
    @Id
    @Column(name="ADDRESS_ID")
    private int addressId;

    @Column(name="ADDRESS")
    private String address;

    @Column(name="CITY")
    private String city;

    @Column(name="CREATE_BY")
    private String createBy;

    @Column(name="CREATE_DATE")
    private String createDate;

    @Column(name="LAST_UPDATE_DATE")
    private String lastUpdateDate;

}