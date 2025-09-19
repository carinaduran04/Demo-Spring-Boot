package com.apis.drtg.apis_drtg.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.apis.drtg.apis_drtg.models.MedAppointment;
import com.apis.drtg.apis_drtg.models.MedAppointmentsDTO;

@Repository
public interface MedAppointmentRepository extends JpaRepository<MedAppointment, Integer> {

    @Query("SELECT DISTINCT "+
            "med.firstName  "+
            ",med.lastName  "+
            ",doc.firstName  "+
            ",doc.lastName  "+
            ",doc.fullName  "+
            ",hos.hospitalName "+
            "FROM "+
            "MedAppointment med "+
            "JOIN med.hospital hos "+
            "JOIN med.doctor doc "+
            "where "+
            "doc.Id = :DOCTOR_ID")
    List<MedAppointmentsDTO> listAppointments(@Param("DOCTOR_ID") int DOCTOR_ID);
}
