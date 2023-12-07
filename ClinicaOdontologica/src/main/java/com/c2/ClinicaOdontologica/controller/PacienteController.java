package com.c2.ClinicaOdontologica.controller;

import com.c2.ClinicaOdontologica.entity.Odontologo;
import com.c2.ClinicaOdontologica.entity.Paciente;
import com.c2.ClinicaOdontologica.exception.BadRequestException;
import com.c2.ClinicaOdontologica.exception.ResourceNotFoundException;
import com.c2.ClinicaOdontologica.service.PacienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/paciente")
public class PacienteController {
    @Autowired
    private PacienteService pacienteService;

    @GetMapping("/todos")
    public ResponseEntity<List<Paciente>> listarTodos(){
        return ResponseEntity.ok(pacienteService.listarTodos());
    }
    @GetMapping("/{id}")
    public ResponseEntity<Optional<Paciente>>  buscarPacientePorID(@PathVariable Long id)throws ResourceNotFoundException{
        Optional<Paciente> pacienteBuscado = pacienteService.buscarPacientePorID(id);
        if (pacienteBuscado.isPresent()){
            return ResponseEntity.ok(pacienteService.buscarPacientePorID(id));
        }else{
            throw new ResourceNotFoundException("El paciente no existe.");
        }
    }
    @PostMapping
    public  ResponseEntity<Paciente> registrarPaciente(@RequestBody Paciente paciente) throws BadRequestException{
        if (paciente == null || paciente.getApellido() == "" || paciente.getNombre() == "" || paciente.getCedula() == "" || paciente.getDomicilio() == null || paciente.getEmail() == "" || paciente.getFechaIngreso() == null){
            throw new BadRequestException("No se ha podido registrar al paciente.");
        }else{
            return ResponseEntity.ok(pacienteService.registrarPaciente(paciente));
        }
    }
    @PutMapping
    public ResponseEntity<String> actualizarPaciente(@RequestBody Paciente paciente) throws ResourceNotFoundException{
        Optional<Paciente> pacienteBuscado= pacienteService.buscarPacientePorID(paciente.getId());
        if(pacienteBuscado.isPresent()) {
            pacienteService.actualizarPaciente(paciente);
            return ResponseEntity.ok("paciente actualizado");
        }else{
            throw new ResourceNotFoundException("El paciente no existe");
        }
    }
    @GetMapping("/buscar/{email}")
    public ResponseEntity<Paciente> buscarPacientePorCorreo(@PathVariable String correo) throws ResourceNotFoundException{
        Optional<Paciente> pacienteBuscado= pacienteService.buscarPorCorreo(correo);
        if(pacienteBuscado.isPresent()) {

            return ResponseEntity.ok(pacienteBuscado.get());
        }else{
            throw new ResourceNotFoundException("Paciente no encontrado");
        }
    }
    @DeleteMapping("{id}")
    public ResponseEntity<String> elimninarPaciente(@PathVariable Long id) throws ResourceNotFoundException{
        Optional<Paciente> pacienteBuscado= pacienteService.buscarPacientePorID(id);
        if(pacienteBuscado.isPresent()){
            pacienteService.eliminarPaciente(id);
            return ResponseEntity.ok("Eliminado con exito");
        }else{
            throw new ResourceNotFoundException("Paciente no encontrado. No se pudo borrar");
        }

    }
}
