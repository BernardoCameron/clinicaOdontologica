package com.c2.ClinicaOdontologica.security;

import com.c2.ClinicaOdontologica.entity.Usuario;
import com.c2.ClinicaOdontologica.entity.UsuarioRole;
import com.c2.ClinicaOdontologica.repository.UsuarioRepository;
import com.c2.ClinicaOdontologica.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DatosInicialesSecurity implements ApplicationRunner {
    @Autowired
    UsuarioRepository usuarioRepository;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        BCryptPasswordEncoder cifrador= new BCryptPasswordEncoder();
        String passSinCifrar= "digital";
        String passCifrado= cifrador.encode(passSinCifrar);
        System.out.println("password: "+passCifrado);
        Usuario usuarioInsert= new Usuario("Bernardo Cameron", "Bernardo", "bernardo@gmail.com", passCifrado, UsuarioRole.ROLE_USER);
        usuarioRepository.save(usuarioInsert);

        Usuario adminInsert = new Usuario("Jose Cameron", "Jose", "jose@gmail.com", passCifrado, UsuarioRole.ROLE_ADMIN);
        usuarioRepository.save(adminInsert);


    }
}
