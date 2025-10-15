package com.apis.drtg.apis_drtg.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.apis.drtg.apis_drtg.models.AppointmentDetail;

@Repository
public interface AppointmentDetailRepository extends JpaRepository<AppointmentDetail, Integer>{
    
    List<AppointmentDetail> findByStatus(String status);
   

}

