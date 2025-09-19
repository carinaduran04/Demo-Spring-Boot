package com.apis.drtg.apis_drtg.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.apis.drtg.apis_drtg.models.MedAppointment;
import com.apis.drtg.apis_drtg.models.MedAppointmentsDTO;
import com.apis.drtg.apis_drtg.models.MedDoctor;
import com.apis.drtg.apis_drtg.services.MedAppointmentService;
import com.apis.drtg.apis_drtg.services.MedDoctorService;



@RestController
@RequestMapping("/api")
public class PostController {

    @Autowired
    private MedAppointmentService appointmentService;

    @Autowired
    private MedDoctorService doctorService;

    @GetMapping("/appointment/all")
    public List<MedAppointment> AppointmentsAll(){
        
        List<MedAppointment> appointments = appointmentService.getAllApointments();
        return appointments;
    }

    @GetMapping("/appointment/{id}")
    public List<MedAppointmentsDTO> AppointmentsByID(@PathVariable int id){
        
        List<MedAppointmentsDTO> appointments = appointmentService.getAppointmentById(id);
        return appointments;
    }

    @GetMapping("/doctor/all")
    public List<MedDoctor> DoctorsAll(){
        return doctorService.getAllDoctors();
    }

    @GetMapping("/doctor/{id}")
    public Optional<MedDoctor> DoctorsById(@PathVariable int id){
        return doctorService.getDoctorsById(id);
    }
    
    
    
}
