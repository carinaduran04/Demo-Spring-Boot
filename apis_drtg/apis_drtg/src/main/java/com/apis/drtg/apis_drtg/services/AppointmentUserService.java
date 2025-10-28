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
       // Nuevo método para guardar usuarios
    public AppointmentUser saveUser(AppointmentUser user) {
        if (user.getFirstName() != null && user.getLastName() != null) {
            user.setFullName(user.getFirstName() + " " + user.getLastName());
        }
        user.setCreateDate(java.time.LocalDate.now().toString());
        return repository.save(user);
    }

    // Actualizar usuario existente
    public AppointmentUser updateUser(int id, AppointmentUser updatedUser) {
        return repository.findById(id).map(user -> {
          if (updatedUser.getFirstName() != null) user.setFirstName(updatedUser.getFirstName());
        if (updatedUser.getLastName() != null) user.setLastName(updatedUser.getLastName());
        if (updatedUser.getEmail() != null) user.setEmail(updatedUser.getEmail());
        if (updatedUser.getUserName() != null) user.setUserName(updatedUser.getUserName());
        if (updatedUser.getPassword() != null) user.setPassword(updatedUser.getPassword());
        if (updatedUser.getCompany() != null) user.setCompany(updatedUser.getCompany()); // <- agregar
        user.setFullName(user.getFirstName() + " " + user.getLastName());
        return repository.save(user);
        }).orElse(null);
    }

    // Eliminación lógica (soft delete)
    public boolean deleteUser(int id) {
        return repository.findById(id).map(user -> {
            repository.save(user);
            return true;
        }).orElse(false);
    }
}
