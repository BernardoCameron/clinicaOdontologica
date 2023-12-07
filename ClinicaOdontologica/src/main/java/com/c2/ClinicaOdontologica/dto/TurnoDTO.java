package com.c2.ClinicaOdontologica.dto;

import lombok.Data;
import lombok.Setter;

import java.time.LocalDate;

@Data
//POJO
public class TurnoDTO {
    private Long id;
    private LocalDate fechaTurno;
    private Long pacienteId;
    private Long odontologoId;
}
