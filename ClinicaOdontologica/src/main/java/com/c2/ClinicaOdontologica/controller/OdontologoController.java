package com.c2.ClinicaOdontologica.controller;


import com.c2.ClinicaOdontologica.entity.Odontologo;
import com.c2.ClinicaOdontologica.entity.Paciente;
import com.c2.ClinicaOdontologica.exception.BadRequestException;
import com.c2.ClinicaOdontologica.exception.ResourceNotFoundException;
import com.c2.ClinicaOdontologica.service.OdontologoService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/odontologo")


public class OdontologoController {
    private static final Logger logger =Logger.getLogger(OdontologoController.class);
    @Autowired
    private OdontologoService odontologoService;


    @PostMapping
    public ResponseEntity<Odontologo> registrarOdontologo(@RequestBody Odontologo odontologo) throws BadRequestException {
        if (odontologo == null || odontologo.getApellido() == "" || odontologo.getNombre() == "" || odontologo.getMatricula() == ""){
            throw new BadRequestException("No se ha podido registrar al odontologo.");

        }else{
            logger.info("Odontologo registrado");
            return ResponseEntity.ok(odontologoService.registrarOdontologo(odontologo));
        }
    }
    @GetMapping("/todos")
    public ResponseEntity<List<Odontologo>> buscarTodos(){
        return ResponseEntity.ok(odontologoService.listarTodos());
    }
    @PutMapping
    public ResponseEntity<String> actualizarOdontologo(@RequestBody Odontologo odontologo)throws ResourceNotFoundException{
        Optional<Odontologo> odontologoBuscado= odontologoService.buscarPorId(odontologo.getId());
        if(odontologoBuscado.isPresent()){
                         odontologoService.actualizarOdontologo(odontologo);
        return ResponseEntity.ok("Odontologo actualizado");
        }
      else{
          throw new ResourceNotFoundException("El Odontologo no existe");
        }
    }
    @GetMapping("/{id}")
    public ResponseEntity<Optional<Odontologo>> buscarPorID(@PathVariable Long id) throws ResourceNotFoundException{
        Optional<Odontologo> odontologoBuscado = odontologoService.buscarPorId(id);
        if (odontologoBuscado.isPresent()){
            return ResponseEntity.ok(odontologoService.buscarPorId(id));
        }else{
            throw new ResourceNotFoundException("El Odontologo no existe.");
        }

    }
    @GetMapping("/busqueda/{matricula}")
    public ResponseEntity<Optional<Odontologo>> buscarPorMatricula(@PathVariable String matricula) throws ResourceNotFoundException{
        Optional<Odontologo> odontologoBuscado = odontologoService.buscarPorMatricula(matricula);
        if (odontologoBuscado.isPresent()){
            return ResponseEntity.ok(odontologoService.buscarPorMatricula(matricula));
        }else{
            throw new ResourceNotFoundException("El Odontologo no existe.");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> elimninarOdontologo(@PathVariable Long id) throws ResourceNotFoundException {
        Optional<Odontologo> odontologoBuscado= odontologoService.buscarPorId(id);
        if(odontologoBuscado.isPresent()){
            odontologoService.eliminarOdontologo(id);
            return ResponseEntity.ok("Eliminado con exito");
        }else{
            throw new ResourceNotFoundException("No se pudo eliminar al Odontologo, recurso no existe.");
        }

    }
}
