package com.apis.drtg.apis_drtg.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.apis.drtg.apis_drtg.models.user.AppointmentUser;
import com.apis.drtg.apis_drtg.repositories.AppointmentUserRepository;

@Service
public class AppointmentUserService {
    @Autowired
    private AppointmentUserRepository repository;

    public List<AppointmentUser> getAllApointments(){
        return repository.findAll();
    }

    public Optional<AppointmentUser> getAppointmentById(int id){
        return repository.findById(id);
    }
}
