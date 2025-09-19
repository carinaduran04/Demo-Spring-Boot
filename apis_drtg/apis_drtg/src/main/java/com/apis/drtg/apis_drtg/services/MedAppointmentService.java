package com.apis.drtg.apis_drtg.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.apis.drtg.apis_drtg.models.MedAppointment;
import com.apis.drtg.apis_drtg.models.MedAppointmentsDTO;
import com.apis.drtg.apis_drtg.repositories.MedAppointmentRepository;

@Service
public class MedAppointmentService {

    @Autowired
    private MedAppointmentRepository repository;

    public List<MedAppointment> getAllApointments() {
        return repository.findAll();
    }

    public List<MedAppointmentsDTO> getAppointmentById(int id) {
        return repository.listAppointments(id);
    }
}
