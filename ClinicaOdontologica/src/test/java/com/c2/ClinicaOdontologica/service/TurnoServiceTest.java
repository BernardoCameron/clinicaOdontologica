package com.c2.ClinicaOdontologica.service;

import com.c2.ClinicaOdontologica.dto.TurnoDTO;
import com.c2.ClinicaOdontologica.entity.Domicilio;
import com.c2.ClinicaOdontologica.entity.Odontologo;
import com.c2.ClinicaOdontologica.entity.Paciente;
import com.c2.ClinicaOdontologica.entity.Turno;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest
public class TurnoServiceTest {
    @Autowired
    private TurnoService turnoService;
    @Autowired
    private OdontologoService odontologoService;
    @Autowired
    private PacienteService pacienteService;

    @Test
    @Order(1)
    public void registarTurno(){
        Paciente paciente= new Paciente("Jose","Cameron","15963139", LocalDate.of(2023,12,01),new Domicilio("Aristoteles ",1470,"Pte Alto","Santiago"),"jose@gmail.com");
        Odontologo odontologo = new Odontologo("BB-2312", "Bernardo", "Cameron");
        pacienteService.registrarPaciente(paciente);
        odontologoService.registrarOdontologo(odontologo);
        Turno turno = new Turno(paciente, odontologo, LocalDate.of(2023, 10,12));
        turnoService.guardarTurno(turno);
        assertEquals(1L, turno.getId());

    }

    @Test
    @Order(2)
    public void listarTurnos(){
        List<TurnoDTO> turnos = turnoService.buscarTodos();
        assertEquals(1, turnos.size());
        System.out.println(turnos);
    }

    @Test
    @Order(3)
    public  void buscarTurnoPorID(){
        Long idAux= 1L;
        Optional<TurnoDTO> turnoBuscado = turnoService.buscarTurnoPorId(idAux);
        assertNotNull(turnoBuscado);
    }
    @Test
    @Order(4)
    public void actualizarTurno(){
        LocalDate nuevaFecha = LocalDate.of(2024,01,02);
        Paciente paciente= new Paciente(1L,"Jose","Cameron","15963139", LocalDate.of(2023,12,01),new Domicilio("Aristoteles ",1470,"Pte Alto","Santiago"),"jose@gmail.com");
        Odontologo odontologo = new Odontologo(1L,"BB-2312", "Bernardo", "Cameron");
        Turno nuevoTurno = new Turno(1L,paciente, odontologo, nuevaFecha);
        TurnoDTO nuevoTurnoDTO = turnoService.turnoATurnoDTO(nuevoTurno);
        System.out.println(nuevoTurnoDTO);
        turnoService.actualizarTurno(nuevoTurnoDTO);
        Optional<TurnoDTO> turnoBuscado = turnoService.buscarTurnoPorId(1L);
        assertEquals(LocalDate.of(2024,01,02), turnoBuscado.get().getFechaTurno());
    }

    @Test
    @Order(5)
    public void eliminarTurno(){
        Long idAux = 1L;
        turnoService.eliminarTurno(1L);
        Optional<TurnoDTO> turnoEliminado= turnoService.buscarTurnoPorId(idAux);
        assertFalse(turnoEliminado.isPresent());
    }



}
