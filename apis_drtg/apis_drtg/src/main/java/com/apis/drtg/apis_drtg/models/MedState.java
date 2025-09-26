package com.apis.drtg.apis_drtg.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="MED_STATE_DIM")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MedState {
    @Id
    @Column(name="State_Id")
    private int stateId;

    @Column(name="Name")
    private String name;
}
