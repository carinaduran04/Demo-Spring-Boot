package com.apis.drtg.apis_drtg.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.apis.drtg.apis_drtg.models.AppointmentDetail;
import com.apis.drtg.apis_drtg.models.AppointmentDetailPage;
import com.apis.drtg.apis_drtg.models.user.AppointmentUser;
import com.apis.drtg.apis_drtg.services.AppointmentDetailPageService;
import com.apis.drtg.apis_drtg.services.AppointmentDetailService;
import com.apis.drtg.apis_drtg.services.AppointmentUserService;




@RestController
@RequestMapping("/api")
public class PostController {

    // Start --> Appointment Detail Page
    @Autowired
    private AppointmentDetailPageService appointmentDetailPageService;

    @PostMapping("/appointmentdetailpage/save")
    public AppointmentDetailPage postAppointmentDetailPage(@RequestBody AppointmentDetailPage appointmentDetailPage){
        return appointmentDetailPageService.AppointmentPage(appointmentDetailPage);
    }
    
    

    // End --> Appointment Detail Page

    /////////////////////////////////////////////////

    // Start --> Appointment Detail
    @Autowired
    private AppointmentDetailService appointmentDetailService;

    @GetMapping("/appointmentdetail/all")
    public List<AppointmentDetail> getAllAppointmentDetails(){
        return appointmentDetailService.getAllApointments();
    }

    @GetMapping("/appointmentdetail/{id}")
    public Optional<AppointmentDetail> getAppointmentDetailById(@PathVariable int id){
        return appointmentDetailService.getAppointmentById(id);
    }

   @PostMapping("/appointmentdetail/save")
    public AppointmentDetail saveAppointmentDetail(@RequestBody AppointmentDetail appointmentDetail){
        return appointmentDetailService.saveAppointment(appointmentDetail);
    }
   
      // End --> Appointment Detail
    @DeleteMapping("/appointmentdetail/delete/{id}")
    public String deleteAppointmentDetail(@PathVariable int id){
        appointmentDetailService.softDeleteAppointment(id);
        return "Cita marcada como INACTIVO correctamente";
    }

   
    @GetMapping("/appointmentdetail/active")
    public List<AppointmentDetail> getActiveAppointments() {
        return appointmentDetailService.getActiveAppointments();
    }
    
    // Start --> Appointment User
    @Autowired
    private AppointmentUserService appointmentUserService;

    @GetMapping("/appointmentuser/all")
    public List<AppointmentUser> getAllAppointmentUsers(){
        return appointmentUserService.getAllApointments();
    }

    @GetMapping("/appointmentuser/{id}")
    public Optional<AppointmentUser> getAppointmentUserById(@PathVariable int id){
        return appointmentUserService.getAppointmentById(id);
    }
    // End --> Appointment User
    
    
    
    
}
