package com.apis.drtg.apis_drtg.models;

import java.time.LocalDateTime;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="APP_COMPANY_DIM")
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
    private LocalDateTime createDate;

    @Column(name="LAST_UPDATE_DATE")
    private LocalDateTime lastUpdateDate;
}
