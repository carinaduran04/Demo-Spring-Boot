package com.apis.drtg.apis_drtg.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.apis.drtg.apis_drtg.models.MedDoctor;

@Repository
public interface MedDoctorRepository extends JpaRepository<MedDoctor, Integer>{
}
