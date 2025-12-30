package com.apis.drtg.apis_drtg.services;

import java.time.LocalDateTime;
import java.util.Date;  
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.apis.drtg.apis_drtg.models.AppointmentAddress;
import com.apis.drtg.apis_drtg.models.AppointmentCompany;
import com.apis.drtg.apis_drtg.models.user.AppointmentUser;
import com.apis.drtg.apis_drtg.models.user.AppointmentUserType;
import com.apis.drtg.apis_drtg.repositories.AppointmentUserRepository;
import com.apis.drtg.apis_drtg.repositories.AppointmentUserTypeRepository;
import com.apis.drtg.apis_drtg.repositories.AppointmentCompanyRepository;
import com.apis.drtg.apis_drtg.repositories.AppointmentAddressRepository;

@Service
public class AppointmentUserService {

    @Autowired
    private AppointmentUserRepository repository;

    @Autowired
    private AppointmentCompanyRepository companyRepository;

    @Autowired
    private AppointmentAddressRepository addressRepository; 

    @Autowired
    private AppointmentUserTypeRepository appointmentUserTypeRepository;

    public List<AppointmentUser> getAllAppointments() {
       return repository.findAll();
    }

    public Optional<AppointmentUser> getAppointmentById(int id){
        return repository.findById(id);
    }

    // Guardar usuarios
    public AppointmentUser saveUser(AppointmentUser user) {
        System.out.println("Datos recibidos en saveUser: " + user);

        // === Tipo de usuario ===
        if (user.getAppointmentUserType() != null) {
            int typeId = user.getAppointmentUserType().getUserTypeId();
            AppointmentUserType userType = appointmentUserTypeRepository.findById(typeId)
                    .orElseThrow(() -> new RuntimeException("Tipo de usuario no encontrado"));
            user.setAppointmentUserType(userType);
        }

        // Compañía
        AppointmentCompany company = user.getCompany();
        if (company != null) {
            if (company.getCompanyId() != 0) {
                company = companyRepository.findById(company.getCompanyId())
                        .orElseThrow(() -> new RuntimeException("Compañía no encontrada"));
            } else {
                company.setCreateDate(LocalDateTime.now());
                company.setLastUpdateDate(LocalDateTime.now());
                company = companyRepository.save(company);
                System.out.println("Compañía guardada: " + company);
            }
            user.setCompany(company);
        }
  
        // Dirección
        AppointmentAddress address = user.getAddress();
        if (address != null) {
            if (address.getAddressId() != 0) {
                address = addressRepository.findById(address.getAddressId())
                        .orElseThrow(() -> new RuntimeException("Dirección no encontrada"));
            } else {
                if (address.getCreateBy() == null) address.setCreateBy("admin");
                address.setCreateDate(new Date());  // Usar Date para AppointmentAddress
                address.setLastUpdateDate(new Date());
                address = addressRepository.save(address);
                System.out.println("Dirección guardada: " + address);
            }
            user.setAddress(address);
        }

        // Nombre completo
        if (user.getFirstName() != null && user.getLastName() != null) {
            user.setFullName(user.getFirstName() + " " + user.getLastName());
        }

        user.setCreateDate(new Date().toString());  // Mantener como String
        user.setStatus("ACTIVE");

        AppointmentUser savedUser = repository.save(user);
        System.out.println("Usuario guardado: " + savedUser);
        return savedUser;
    }

    // Actualizar usuario existente
    public AppointmentUser updateUser(int id, AppointmentUser updatedUser) {
        System.out.println("Datos recibidos en updateUser: " + updatedUser);

        return repository.findById(id).map(user -> {
            if (updatedUser.getFirstName() != null) user.setFirstName(updatedUser.getFirstName());
            if (updatedUser.getLastName() != null) user.setLastName(updatedUser.getLastName());
            if (updatedUser.getEmail() != null) user.setEmail(updatedUser.getEmail());
            if (updatedUser.getUserName() != null) user.setUserName(updatedUser.getUserName());
            if (updatedUser.getPassword() != null) user.setPassword(updatedUser.getPassword());
            if (updatedUser.getTitle() != null) user.setTitle(updatedUser.getTitle());
            if (updatedUser.getStatus() != null) user.setStatus(updatedUser.getStatus());

            // Tipo de usuario
            if (updatedUser.getAppointmentUserType() != null) {
                int typeId = updatedUser.getAppointmentUserType().getUserTypeId();
                AppointmentUserType userType = appointmentUserTypeRepository.findById(typeId)
                        .orElseThrow(() -> new RuntimeException("Tipo de usuario no encontrado"));
                user.setAppointmentUserType(userType);
            }

            // Manejar compañía en update
            if (updatedUser.getCompany() != null) {
                AppointmentCompany company = updatedUser.getCompany();
                if (company.getCompanyId() != 0) {
                    AppointmentCompany existingCompany = companyRepository.findById(company.getCompanyId())
                            .orElseThrow(() -> new RuntimeException("Compañía no encontrada"));
                    existingCompany.setName(company.getName());
                    existingCompany.setLastUpdateDate(LocalDateTime.now());
                    company = companyRepository.save(existingCompany);
                } else {
                    company.setCreateDate(LocalDateTime.now());
                    company.setLastUpdateDate(LocalDateTime.now());
                    company = companyRepository.save(company);
                }
                user.setCompany(company);
                System.out.println("Compañía actualizada/guardada: " + company);
            }

            // Dirección - Usar datos nuevos
            if (updatedUser.getAddress() != null) {
                AppointmentAddress address = updatedUser.getAddress();
                if (address.getAddressId() != 0) {
                    AppointmentAddress existingAddress = addressRepository.findById(address.getAddressId())
                            .orElseThrow(() -> new RuntimeException("Dirección no encontrada"));
                    existingAddress.setAddress(address.getAddress());
                    existingAddress.setCity(address.getCity());
                    existingAddress.setLastUpdateDate(new Date());
                    address = addressRepository.save(existingAddress);
                } else {
                    address.setCreateDate(new Date());
                    address.setLastUpdateDate(new Date());
                    address = addressRepository.save(address);
                }
                user.setAddress(address);
                System.out.println("Dirección actualizada/guardada: " + address);
            }

            // Recalcular nombre completo
            if (user.getFirstName() != null && user.getLastName() != null) {
                user.setFullName(user.getFirstName() + " " + user.getLastName());
            }

            user.setLastUpdateDate(new Date().toString());

            AppointmentUser updated = repository.save(user);
            System.out.println("Usuario actualizado: " + updated);
            return updated;
        }).orElse(null);
    }

    // Eliminación lógica
    public boolean deleteUser(int id) {
        return repository.findById(id).map(user -> {
            user.setStatus("INACTIVE");
            user.setLastUpdateDate(new Date().toString());
            repository.save(user);
            return true;
        }).orElse(false);
    }
}