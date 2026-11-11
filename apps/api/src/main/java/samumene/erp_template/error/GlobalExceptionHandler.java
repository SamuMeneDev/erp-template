package samumene.erp_template.error;

import java.util.NoSuchElementException;

import javax.naming.AuthenticationNotSupportedException;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import jakarta.persistence.EntityNotFoundException;
import samumene.erp_template.configuration.DateTimeConfig;
import samumene.erp_template.dto.response.ExceptionResponse;
import samumene.erp_template.error.exceptions.BusinessException;

/**
 * Classe que intercepta as exceções e retorna em respostas HTTP
 */
@RestControllerAdvice
public class GlobalExceptionHandler {
    /**
     * Método que abstrai a instância de um {@link ExceptionResponse}.
     * 
     * @param message Mensagem da Exceção.
     * @param statusCode {@link HttpStatus} que será retornada na requisição.
     * @return Um response da exceção gerada.
     */
    private ExceptionResponse responseError(String message, HttpStatus statusCode) {
        return new ExceptionResponse(
                DateTimeConfig.getDateTime(),
                statusCode.toString(),
                statusCode.value(),
                message
        );
    }
    /**
     * Devolve uma resposta HTTP para o quando um recurso não é encontrado.
     * @param e Exceção
     */
    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<ExceptionResponse> noSuchElement(NoSuchElementException e) {
        ExceptionResponse erro = this.responseError(e.getMessage(), HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(erro, HttpStatus.NOT_FOUND);
    }
    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ExceptionResponse> entityNotFound(EntityNotFoundException e) {
        ExceptionResponse erro = this.responseError(e.getMessage(), HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(erro, HttpStatus.NOT_FOUND);
    }


    /**
     * Devolve uma resposta HTTP para o quando a requisição é inválida.
     * @param e Exceção
     */
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ExceptionResponse> illegalArgument(IllegalArgumentException e) {
        ExceptionResponse erro = this.responseError(e.getMessage(), HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(erro, HttpStatus.BAD_REQUEST);
    }
    /**
     * Devolve uma resposta HTTP para o quando um parametro de DTO de requisição é invalidado.
     * @param e Exceção
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ExceptionResponse> methodArgumentNotValid(MethodArgumentNotValidException e) {
        return new ResponseEntity<>(
                this.responseError(e.getBindingResult().getFieldError().getDefaultMessage(), HttpStatus.BAD_REQUEST),
                HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ExceptionResponse> httpMessageNotReadable(HttpMessageNotReadableException e) {
        return new ResponseEntity<>(
            this.responseError("Requisição inválida", HttpStatus.BAD_REQUEST),
            HttpStatus.BAD_REQUEST
        );
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ExceptionResponse> dataIntegrityViolation(DataIntegrityViolationException e) {
        return new ResponseEntity<>(
                this.responseError("Registro duplicado: o valor informado já existe no sistema.", HttpStatus.CONFLICT),
                HttpStatus.CONFLICT
        );
    }

    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ExceptionResponse> business(BusinessException e) {
        return new ResponseEntity<>(
                this.responseError(e.getMessage(), HttpStatus.UNPROCESSABLE_CONTENT),
                HttpStatus.UNPROCESSABLE_CONTENT
        );
    }


    // Security

    /**
     * Devolve uma resposta HTTP para o quando o token de acesso do usuário não é encontrado no
     * cabeçalho da requisição.
     */
    @ExceptionHandler(AuthenticationCredentialsNotFoundException.class)
    public ResponseEntity<ExceptionResponse> authNotFound() {
        return new ResponseEntity<>(this.responseError("Não autenticado", HttpStatus.FORBIDDEN), HttpStatus.FORBIDDEN);
    }
    /**
     * Devolve uma resposta HTTP para o quando o token do usuário não é mais válido (expirado).
     */
    @ExceptionHandler(InsufficientAuthenticationException.class)
    public ResponseEntity<ExceptionResponse> InsufficientAuth() {
        return new ResponseEntity<>(this.responseError("Autenticação insuficiente", HttpStatus.FORBIDDEN), HttpStatus.FORBIDDEN);
    }
    /**
     * Devolve uma resposta HTTP para o quando um token é encontrado, mas é inválido.
     */
    @ExceptionHandler(AuthenticationNotSupportedException.class)
    public ResponseEntity<ExceptionResponse> authNotSupported() {
        return new ResponseEntity<>(this.responseError("Autenticação inválida", HttpStatus.UNAUTHORIZED), HttpStatus.UNAUTHORIZED);
    }
    /**
     * Devolve uma resposta HTTP para o quando ocorre um erro genérico de autenticação.
     */
    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ExceptionResponse> auth() {
        return new ResponseEntity<>(this.responseError("email e/ou senha inválidos", HttpStatus.UNAUTHORIZED), HttpStatus.UNAUTHORIZED);
    }
    /**
     * Devolve uma resposta HTTP para o usuário não é autorizado à alguma ação no sistema.
     */
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ExceptionResponse> accessDenied() {
        return new ResponseEntity<>(this.responseError("Acesso negado", HttpStatus.UNAUTHORIZED), HttpStatus.UNAUTHORIZED);
    }
}
