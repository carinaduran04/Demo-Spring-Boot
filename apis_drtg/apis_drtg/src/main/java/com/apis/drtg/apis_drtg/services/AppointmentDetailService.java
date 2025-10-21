package com.apis.drtg.apis_drtg.services;

import java.util.List;
import java.util.Optional;
import java.util.Date;
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

   public AppointmentDetail updateAppointment(int id, AppointmentDetail updatedDetail) {
        Optional<AppointmentDetail> existingOpt = repository.findById(id);
        if (!existingOpt.isPresent()) {
            throw new RuntimeException("Registro no encontrado con ID: " + id);
        }
        
        // Actualiza
        AppointmentDetail existing = existingOpt.get();

        if (updatedDetail.getFirstName() != null) {
            existing.setFirstName(updatedDetail.getFirstName().toUpperCase());
            existing.setFullName(
                updatedDetail.getFullName() != null
                    ? updatedDetail.getFullName().toUpperCase()
                    : (updatedDetail.getFirstName() + " " + updatedDetail.getLastName()).toUpperCase()
            );
        }
        if (updatedDetail.getLastName() != null) {
            existing.setLastName(updatedDetail.getLastName().toUpperCase());
        }
        if (updatedDetail.getPhone() != null) {
            existing.setPhone(updatedDetail.getPhone().toUpperCase());
        }
        if (updatedDetail.getEmail() != null) {
            existing.setEmail(updatedDetail.getEmail()); // Email se mantiene tal cual
        }
        if (updatedDetail.getConsultingType() != null) {
            existing.setConsultingType(updatedDetail.getConsultingType().toUpperCase());
        }
        if (updatedDetail.getComment() != null) {
            existing.setComment(updatedDetail.getComment().toUpperCase());
        }
        if (updatedDetail.getConsultingDate() != null) {
            existing.setConsultingDate(updatedDetail.getConsultingDate());
        }
        if (updatedDetail.getStatus() != null) {
            existing.setStatus(updatedDetail.getStatus());
        }

        if (updatedDetail.getAppointmentAddress() != null) {
            if (existing.getAppointmentAddress() == null) {
                existing.setAppointmentAddress(updatedDetail.getAppointmentAddress());
            } else {
                if (updatedDetail.getAppointmentAddress().getAddress() != null) {
                    existing.getAppointmentAddress().setAddress(
                        updatedDetail.getAppointmentAddress().getAddress().toUpperCase()
                    );
                }
                if (updatedDetail.getAppointmentAddress().getCity() != null) {
                    existing.getAppointmentAddress().setCity(
                        updatedDetail.getAppointmentAddress().getCity().toUpperCase()
                    );
                }
                existing.getAppointmentAddress().setLastUpdateDate(new Date());
            }
        }

        // --- Fecha de última actualización ---
        existing.setLastUpdateDate(new Date());

        // Guardar cambios
        return repository.save(existing);
    }
}