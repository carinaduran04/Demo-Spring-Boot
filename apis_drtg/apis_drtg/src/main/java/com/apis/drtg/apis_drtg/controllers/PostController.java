package com.apis.drtg.apis_drtg.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.apis.drtg.apis_drtg.models.AppointmentDetail;
import com.apis.drtg.apis_drtg.models.AppointmentDetailPage;
import com.apis.drtg.apis_drtg.models.user.AppointmentUser;
import com.apis.drtg.apis_drtg.repositories.AppointmentUserRepository;
import com.apis.drtg.apis_drtg.services.AppointmentDetailPageService;
import com.apis.drtg.apis_drtg.services.AppointmentDetailService;
import com.apis.drtg.apis_drtg.services.AppointmentUserService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
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

    @DeleteMapping("/appointmentdetail/delete/{id}")
    public String deleteAppointmentDetail(@PathVariable int id){
        appointmentDetailService.softDeleteAppointment(id);
        return "Cita marcada como INACTIVO correctamente";
    }

    @PutMapping("/appointmentdetail/update/{id}")
    public AppointmentDetail updateAppointmentDetail(@PathVariable int id, @RequestBody AppointmentDetail updatedDetail) {
        return appointmentDetailService.updateAppointment(id, updatedDetail);
    }

    @GetMapping("/appointmentdetail/active")
    public List<AppointmentDetail> getActiveAppointments() {
        return appointmentDetailService.getActiveAppointments();
    }
    // End --> Appointment Detail

    // Start --> Appointment User
    @Autowired
    private AppointmentUserService appointmentUserService;

    @Autowired
    private AppointmentUserRepository appointmentUserRepository;

    @GetMapping("/appointmentuser/all")
    public List<AppointmentUser> getAllAppointmentUsers(){
        return appointmentUserService.getAllApointments();
    }

    @GetMapping("/appointmentuser/{id}")
    public Optional<AppointmentUser> getAppointmentUserById(@PathVariable int id){
        return appointmentUserService.getAppointmentById(id);
    }

    // crear (guardar) un usuario
    @PostMapping("/appointmentuser/save")
    public AppointmentUser saveAppointmentUser(@RequestBody AppointmentUser user) {
        if (user.getFirstName() != null && user.getLastName() != null) {
            user.setFullName(user.getFirstName() + " " + user.getLastName());
        }
        user.setCreateDate(java.time.LocalDate.now().toString());
        return appointmentUserService.saveUser(user);
    }

    @PostMapping("/appointmentuser/login")
    public Optional<AppointmentUser> loginUser(@RequestParam String userName, @RequestParam String password) {
        return appointmentUserRepository.findByUserNameAndPassword(userName, password);
    }

    @GetMapping("/appointmentuser/{id}/address")
    public Optional<AppointmentUser> getUserWithAddress(@PathVariable int id) {
        return appointmentUserRepository.findById(id);
    }
    // End --> Appointment User
}
