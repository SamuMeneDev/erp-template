package samumene.erp_template.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import samumene.erp_template.entity.Usuario;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    /**
     * Busca um usuário pelo email.
     * @param email Email do usuário.
     * @return Retorna um {@link Optional} do usuário encontrado.
     */
    Optional<Usuario> findByEmail(String email);
    /**
     * Verifica se um usuário existe pelo email cadastrado.
     *
     * @param email Email do usuário.
     * @return Caso o usuário exista no sistema retorna {@code true}, caso contrário {@code false}.
     */
    boolean existsByEmail(String email);
}
