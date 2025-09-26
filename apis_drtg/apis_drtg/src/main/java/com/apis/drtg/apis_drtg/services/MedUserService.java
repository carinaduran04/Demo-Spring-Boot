package com.apis.drtg.apis_drtg.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.apis.drtg.apis_drtg.models.user.MedUser;
import com.apis.drtg.apis_drtg.repositories.MedUserRepository;

@Service
public class MedUserService {
    @Autowired
    private MedUserRepository repository;

    public List<MedUser> getAllUsers(){
        return repository.findAll();
    }
}
