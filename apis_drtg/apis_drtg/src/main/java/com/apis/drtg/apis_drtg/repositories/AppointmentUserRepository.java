package com.apis.drtg.apis_drtg.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.apis.drtg.apis_drtg.models.user.AppointmentUser;
import java.util.Optional;

@Repository
public interface AppointmentUserRepository extends JpaRepository<AppointmentUser, Integer> {
    Optional<AppointmentUser> findByUserNameAndPassword(String userName, String password);
    Optional<AppointmentUser> findByUserName(String userName); 
    Optional<AppointmentUser> findByEmail(String email);    
}
