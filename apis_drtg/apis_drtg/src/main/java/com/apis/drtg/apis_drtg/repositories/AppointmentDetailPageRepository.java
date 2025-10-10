package com.apis.drtg.apis_drtg.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.apis.drtg.apis_drtg.models.AppointmentDetailPage;

@Repository
public interface AppointmentDetailPageRepository extends JpaRepository<AppointmentDetailPage, Integer> {

}
