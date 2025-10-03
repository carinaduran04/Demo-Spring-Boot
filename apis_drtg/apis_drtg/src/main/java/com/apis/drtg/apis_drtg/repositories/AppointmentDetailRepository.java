package com.apis.drtg.apis_drtg.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.apis.drtg.apis_drtg.models.AppointmentDetail;

@Repository
public interface AppointmentDetailRepository extends JpaRepository<AppointmentDetail, Integer>{
}
