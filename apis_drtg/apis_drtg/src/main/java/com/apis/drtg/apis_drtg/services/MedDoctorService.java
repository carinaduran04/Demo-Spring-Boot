package com.apis.drtg.apis_drtg.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.apis.drtg.apis_drtg.models.MedDoctor;
import com.apis.drtg.apis_drtg.repositories.MedDoctorRepository;

@Service
public class MedDoctorService {

    @Autowired
    private MedDoctorRepository repository;

    public List<MedDoctor> getAllDoctors(){
        return repository.findAll();
    }

    public Optional<MedDoctor> getDoctorsById(int id){
        return repository.findById(id);
    }
}
