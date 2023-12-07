package com.c2.ClinicaOdontologica.service;

import com.c2.ClinicaOdontologica.entity.Odontologo;
import com.c2.ClinicaOdontologica.repository.OdontologoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OdontologoService {
    @Autowired
    private OdontologoRepository odontologoRepository;

    public Odontologo registrarOdontologo(Odontologo odontologo){
        return odontologoRepository.save(odontologo);

    }
    public void actualizarOdontologo(Odontologo odontologo){
        odontologoRepository.save(odontologo);
    }
    public  void eliminarOdontologo(Long id){
        odontologoRepository.deleteById(id);
    }
    public List<Odontologo> listarTodos(){
        return odontologoRepository.findAll();
    }
    public Optional<Odontologo> buscarPorId(Long id){
        return odontologoRepository.findById(id);
    }
    public Optional<Odontologo> buscarPorMatricula(String matricula){
        return odontologoRepository.findByMatricula(matricula);
    }

}
