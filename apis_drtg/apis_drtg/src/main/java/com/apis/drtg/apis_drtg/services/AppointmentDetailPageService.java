package com.apis.drtg.apis_drtg.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.apis.drtg.apis_drtg.models.AppointmentDetailPage;
import com.apis.drtg.apis_drtg.repositories.AppointmentDetailPageRepository;

@Service
public class AppointmentDetailPageService {
    @Autowired
    private AppointmentDetailPageRepository repository;

    public AppointmentDetailPage AppointmentPage(AppointmentDetailPage appointmentDetailPage){
        return repository.save(appointmentDetailPage);
    }

}
