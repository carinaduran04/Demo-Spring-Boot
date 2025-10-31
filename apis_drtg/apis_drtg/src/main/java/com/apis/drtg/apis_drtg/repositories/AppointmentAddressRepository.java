package com.apis.drtg.apis_drtg.repositories;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.apis.drtg.apis_drtg.models.AppointmentAddress;

@Repository
public interface AppointmentAddressRepository extends JpaRepository<AppointmentAddress, Integer> {
    Optional<AppointmentAddress> findByAddress(String address); // Para no duplicar direcciones
}
