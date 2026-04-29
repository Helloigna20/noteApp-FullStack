package noteapp;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/notas")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT})


public class NotaController {
    private List<Nota> listaNotas = new ArrayList<>();

    @PostMapping
    public Nota guardarNota(@RequestBody Nota nuevaNota){
        nuevaNota.setId((long) (listaNotas.size()+1));
        listaNotas.add(nuevaNota);
        return nuevaNota;
    }

    @GetMapping
    public List<Nota> obtenerNotas(){
        return listaNotas;
    }

    @DeleteMapping("/{id}")
    public void eliminarNota(@PathVariable Long id) {
        listaNotas.removeIf(n -> n.getId().equals(id));
        System.out.println("noteapp.Nota eliminada: " + id);
    }
}
