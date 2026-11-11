package samumene.erp_template.controller;

import jakarta.validation.Valid;
import samumene.erp_template.dto.request.chamado.CategoriaChamadoCreateRequest;
import samumene.erp_template.dto.request.chamado.CategoriaChamadoEditRequest;
import samumene.erp_template.dto.response.CategoriaChamadoResponse;
import samumene.erp_template.service.CategoriaChamadoService;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/chamado/categoria")
public class CategoriaChamadoController {

    // Dependência
    private final CategoriaChamadoService categoriaChamadoService;

    // Injeção de dependência
    public CategoriaChamadoController(CategoriaChamadoService categoriaChamadoService) {
        this.categoriaChamadoService = categoriaChamadoService;
    }

    @PostMapping("/create")
    public ResponseEntity<Void> create(@RequestBody @Valid CategoriaChamadoCreateRequest request) {
        this.categoriaChamadoService.create(request);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PatchMapping("/edit/{id}")
    public ResponseEntity<Void> edit(@PathVariable Long id, @RequestBody @Valid CategoriaChamadoEditRequest request) {
        this.categoriaChamadoService.edit(id, request);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/findAll")
    public ResponseEntity<List<CategoriaChamadoResponse>> findAll() {
        List<CategoriaChamadoResponse> response = this.categoriaChamadoService.findAll();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        this.categoriaChamadoService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT); 
    }
}
