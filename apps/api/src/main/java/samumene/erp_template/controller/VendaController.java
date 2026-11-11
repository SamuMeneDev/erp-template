package samumene.erp_template.controller;

import jakarta.validation.Valid;
import samumene.erp_template.dto.request.venda.VendaCreateRequest;
import samumene.erp_template.dto.response.venda.VendaDashboardResponse;
import samumene.erp_template.dto.response.venda.VendaResponse;
import samumene.erp_template.filter.VendaDashboardQueryFilter;
import samumene.erp_template.service.VendaService;

import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/venda")
public class VendaController {

    // Dependências
    private final VendaService vendaService;

    // Injeção de dependências
    public VendaController(VendaService vendaService) {
        this.vendaService = vendaService;
    }

    @PostMapping
    public ResponseEntity<Void> venda(@RequestBody @Valid VendaCreateRequest request) {
        this.vendaService.venda(request);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PatchMapping("/{id}/cancelar")
    public ResponseEntity<Void> cancelarVenda(@PathVariable Long id) {
        this.vendaService.cancelarVenda(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/{id}/delete")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        this.vendaService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/findAll")
    public ResponseEntity<Page<VendaResponse>> findAll(@ParameterObject @PageableDefault(sort = "dataCriacao", direction = Direction.DESC) Pageable pageable) {
        var lista = this.vendaService.findAll(pageable);
        return new ResponseEntity<>(lista, HttpStatus.OK);
    }

    @GetMapping("/dashboard")
    public ResponseEntity<VendaDashboardResponse> buscarDashboard(@ParameterObject VendaDashboardQueryFilter filter) {
        VendaDashboardResponse data = this.vendaService.processarDashboardVenda(filter);
        return new ResponseEntity<>(data, HttpStatus.OK);
    }


}
