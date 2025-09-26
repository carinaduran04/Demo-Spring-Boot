package com.apis.drtg.apis_drtg.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.apis.drtg.apis_drtg.models.user.MedUser;

@Repository
public interface MedUserRepository extends JpaRepository<MedUser, Integer> {

}
