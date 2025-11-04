package com.apis.drtg.apis_drtg.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.apis.drtg.apis_drtg.models.user.AppointmentUser;
import java.util.Optional;
import java.util.List;

@Repository
public interface AppointmentUserRepository extends JpaRepository<AppointmentUser, Integer> {

    // Usuarios activos (status = 'Activo')
    @Query("SELECT u FROM AppointmentUser u WHERE u.status = 'ACTIVE'")
    List<AppointmentUser> findActiveUsers();

    // Usuarios inactivos (status = 'Inactivo')
    @Query("SELECT u FROM AppointmentUser u WHERE u.status = 'INACTIVE'")
    List<AppointmentUser> findInactiveUsers();

    @Query("SELECT u FROM AppointmentUser u WHERE (u.userName = :userName OR u.email = :userName) AND u.password = :password AND u.status = 'ACTIVE'")
    Optional<AppointmentUser> findActiveByCredentials(String userName, String password);

    // Buscar usuario por nombre y contraseña
    Optional<AppointmentUser> findByUserNameAndPassword(String userName, String password);

    // Buscar usuario por nombre
    Optional<AppointmentUser> findByUserName(String userName);

    // Buscar usuario por email
    Optional<AppointmentUser> findByEmail(String email);

    // Buscar usuarios por estado 
    List<AppointmentUser> findByStatus(String status);     
}

