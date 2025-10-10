package com.apis.drtg.apis_drtg.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.apis.drtg.apis_drtg.models.AppointmentDetail;
import com.apis.drtg.apis_drtg.repositories.AppointmentDetailRepository;

@Service
public class AppointmentDetailService {
    @Autowired
    private AppointmentDetailRepository repository;

    public List<AppointmentDetail> getAllApointments(){
        return repository.findAll();
    }
    
    public Optional<AppointmentDetail> getAppointmentById(int id){
        return repository.findById(id);
    }

    public AppointmentDetail saveAppointment( AppointmentDetail  appointmentDetail){
        return repository.save(appointmentDetail);
    }

    public void softDeleteAppointment(int id) {
        AppointmentDetail detail = repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Cita no encontrada"));
        detail.setStatus("INACTIVO");
        repository.save(detail);
    }

    public List<AppointmentDetail> getActiveAppointments() {
        return repository.findByStatus("ACTIVO");
    }

    
}


