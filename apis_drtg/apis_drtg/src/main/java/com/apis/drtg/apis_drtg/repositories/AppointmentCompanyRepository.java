package com.apis.drtg.apis_drtg.repositories;

import java.util.Optional; 
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.apis.drtg.apis_drtg.models.AppointmentCompany;

@Repository
public interface AppointmentCompanyRepository extends JpaRepository<AppointmentCompany, Integer> {
    // Opcional: buscar por nombre para no duplicar compañías
    Optional<AppointmentCompany> findByName(String name);
}
