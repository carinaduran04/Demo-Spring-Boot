package com.apis.drtg.apis_drtg.models;

import java.util.Date;
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
@Table(name="COMPANY")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentCompany {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="COMPANY_ID")
    private int companyId;

    @Column(name="NAME")
    private String name;

    @Column(name="LOGO_URL")
    private String logoUrl;

    @Column(name="CREATE_BY")
    private String createBy;

    @Column(name="CREATE_DATE")
    private Date createDate;

    @Column(name="LAST_UPDATE_DATE")
    private Date lastUpdateDate;
}
