package com.apis.drtg.apis_drtg.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.apis.drtg.apis_drtg.models.user.AppointmentUser;

@Repository
public interface AppointmentUserRepository extends JpaRepository<AppointmentUser, Integer>{

}
