package com.apis.drtg.apis_drtg.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

    
    // APPOINTMENT DETAIL PAGE 
    @Autowired
    private AppointmentDetailPageService appointmentDetailPageService;

    @PostMapping("/appointmentdetailpage/save")
    public AppointmentDetailPage postAppointmentDetailPage(@RequestBody AppointmentDetailPage appointmentDetailPage) {
        return appointmentDetailPageService.AppointmentPage(appointmentDetailPage);
    }

    //APPOINTMENT DETAIL
    @Autowired
    private AppointmentDetailService appointmentDetailService;

    @GetMapping("/appointmentdetail/all")
    public List<AppointmentDetail> getAllAppointmentDetails() {
        return appointmentDetailService.getAllApointments();
    }

    @GetMapping("/appointmentdetail/{id}")
    public Optional<AppointmentDetail> getAppointmentDetailById(@PathVariable int id) {
        return appointmentDetailService.getAppointmentById(id);
    }

    @PostMapping("/appointmentdetail/save")
    public AppointmentDetail saveAppointmentDetail(@RequestBody AppointmentDetail appointmentDetail) {
        return appointmentDetailService.saveAppointment(appointmentDetail);
    }

    @DeleteMapping("/appointmentdetail/delete/{id}")
    public String deleteAppointmentDetail(@PathVariable int id) {
        appointmentDetailService.softDeleteAppointment(id);
        return "Cita marcada como INACTIVA correctamente";
    }

    @PutMapping("/appointmentdetail/update/{id}")
    public AppointmentDetail updateAppointmentDetail(@PathVariable int id, @RequestBody AppointmentDetail updatedDetail) {
        return appointmentDetailService.updateAppointment(id, updatedDetail);
    }

    @GetMapping("/appointmentdetail/active")
    public List<AppointmentDetail> getActiveAppointments() {
        return appointmentDetailService.getActiveAppointments();
    }

    //  APPOINTMENT USER 
    @Autowired
    private AppointmentUserService appointmentUserService;

    @Autowired
    private AppointmentUserRepository appointmentUserRepository;

   @GetMapping("/appointmentuser/all")
    public List<AppointmentUser> getAllAppointmentUsers() {
    return appointmentUserService.getAllAppointments();
    }

    @GetMapping("/appointmentuser/{id}")
    public Optional<AppointmentUser> getAppointmentUserById(@PathVariable int id) {
        return appointmentUserService.getAppointmentById(id);
    }

    // Crear (guardar) un usuario 
    @PostMapping("/appointmentuser/save")
    public ResponseEntity<?> saveAppointmentUser(@RequestBody AppointmentUser user) {
        try {
            // Validar datos básicos
            if (user.getFirstName() != null && user.getLastName() != null) {
                user.setFullName(user.getFirstName() + " " + user.getLastName());
            }

            if (user.getEmail() != null) {
                user.setEmail(user.getEmail().trim().toLowerCase());
            }

            // Validar duplicados
            if (user.getEmail() != null && appointmentUserRepository.findByEmail(user.getEmail()).isPresent()) {
                return ResponseEntity.status(409).body("El correo electrónico ya está registrado");
            }

            if (user.getUserName() != null && appointmentUserRepository.findByUserName(user.getUserName()).isPresent()) {
                return ResponseEntity.status(409).body("El nombre de usuario ya está en uso");
            }

            // Guardar con compañía y dirección
            AppointmentUser savedUser = appointmentUserService.saveUser(user);
            return ResponseEntity.ok(savedUser);

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al guardar usuario: " + e.getMessage());
        }
    }

    // Actualizar usuario 
    @PutMapping("/appointmentuser/update/{id}")
    public ResponseEntity<?> updateAppointmentUser(@PathVariable int id, @RequestBody AppointmentUser updatedUser) {
        try {
            AppointmentUser updated = appointmentUserService.updateUser(id, updatedUser);
            if (updated == null) {
                return ResponseEntity.status(404).body("Usuario no encontrado");
            }
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al actualizar usuario: " + e.getMessage());
        }
    }

    // Eliminación lógica 
    @DeleteMapping("/appointmentuser/delete/{id}")
    public ResponseEntity<?> deleteAppointmentUser(@PathVariable int id) {
        boolean deleted = appointmentUserService.deleteUser(id);
        if (deleted) {
            return ResponseEntity.ok("Usuario marcado como INACTIVO correctamente");
        } else {
            return ResponseEntity.status(404).body("Usuario no encontrado");
        }
    }

    //  Login simple 
   @PostMapping("/appointmentuser/login")
    public ResponseEntity<?> loginUser(
        @RequestParam String userName,
        @RequestParam String password) {
    try {
        Optional<AppointmentUser> user = appointmentUserRepository.findActiveByCredentials(userName, password);

        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.status(401)
                    .body("Usuario inactivo o credenciales inválidas");
        }

    } catch (Exception e) {
        return ResponseEntity.status(500)
                .body("Error al intentar iniciar sesión: " + e.getMessage());
    }
}


    // Usuario con dirección 
    @GetMapping("/appointmentuser/{id}/address")
    public ResponseEntity<?> getUserWithAddress(@PathVariable int id) {
        Optional<AppointmentUser> user = appointmentUserRepository.findById(id);
        return user.isPresent() ? ResponseEntity.ok(user.get()) : ResponseEntity.status(404).body("Usuario no encontrado");
    }
}