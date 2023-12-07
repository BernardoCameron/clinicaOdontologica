package com.c2.ClinicaOdontologica.service;

import com.c2.ClinicaOdontologica.entity.Odontologo;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest
public class OdontologoServiceTest {
    @Autowired
    private OdontologoService odontologoService;


    @Test
    @Order(1)
    public void registrarOdontologo(){
        Odontologo odontologo = new Odontologo("BB-2312", "Bernardo", "Cameron");
        odontologoService.registrarOdontologo(odontologo);
        assertEquals(1L, odontologo.getId());
    }
    @Test
    @Order(2)
    public void buscarPorID(){
        Long idRegistrado = 1L;
        Optional<Odontologo> odontologoBuscado = odontologoService.buscarPorId(idRegistrado);
        assertNotNull(odontologoBuscado);
    }

    @Test
    @Order(3)
    public void listarOdontologos(){
        List<Odontologo> odontologos = odontologoService.listarTodos();
        assertEquals(1,odontologos.size());
    }

    @Test
    @Order(4)
    public void updateOdontologo(){
        Odontologo newOdontologo = new Odontologo("CC-3212", "Jose", "Cameron");
        odontologoService.actualizarOdontologo(newOdontologo);
        Optional<Odontologo> odontologoBuscado = odontologoService.buscarPorMatricula("CC-3212");
        assertEquals("CC-3212", odontologoBuscado.get().getMatricula());
    }

    @Test
    @Order(5)
    public void eliminarOdontologo(){
        Long idAux = 1L;
        odontologoService.eliminarOdontologo(idAux);
        Optional<Odontologo> odontologoEliminado = odontologoService.buscarPorId(1L);
        assertFalse(odontologoEliminado.isPresent());
    }


}
